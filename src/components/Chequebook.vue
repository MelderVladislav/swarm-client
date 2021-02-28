<script lang="ts">
import beeClient from "../services/beeClient";
import { Vue } from "vue-class-component";
//import notificationService from '../services/notificationService'
import { LastCheque } from "../services/swarmClient"; // eslint-disable-line

const { SwarmClient } = beeClient;

export default class Chequebook extends Vue {
  peers: {
    peerId: string;
    uncashedPayout: number | null;
  }[] = [];

  loading: { [key: string]: boolean } = {
    list: true,
  };

  loadedCount = 0;
  
  get percentage() {
    return Math.round(this.loadedCount / this.peers.length * 100);
  }

  get totalUncashedPayout() {
    let total = 0;
    this.peers.forEach(x => total += x.uncashedPayout ?? 0);
    return total;
  }

  async mounted() {
    await Promise.all([this.listAllUncashed()]);

    this.loading["list"] = false;
  }

  async listAllUncashed() {
    this.loadedCount = 0;

    const peers = await SwarmClient.getLastCheques();
    this.peers = peers.map((x) => ({ peerId: x.peer, uncashedPayout: null }));

    const process = async (peer: LastCheque) => {
      const cumulativePayout = peer.lastreceived?.payout ?? 0;
      const cashedPayout = await SwarmClient.getLastCashoutByPeer(peer.peer)
        .then((x) => x?.cumulativePayout ?? 0)
        .catch(() => 0);
      const uncashedPayout = cumulativePayout - cashedPayout;

      this.peers.find((x) => x.peerId === peer.peer)!.uncashedPayout = uncashedPayout;

      this.loadedCount++;
    };

    await Promise.all(peers.map((peer) => process(peer)));

    console.log("done");
  }

  async handleCashout(peer: { peerId: string; uncashedPayout: number }) {
    this.loading[peer.peerId] = true;
    await SwarmClient.cashoutCheque(peer.peerId);
    await new Promise(async (res) => { // eslint-disable-line
      while (true) { // eslint-disable-line        
        try {
          await new Promise((res) => setTimeout(res, 5000));
          const cashout = await SwarmClient.getLastCashoutByPeer(peer.peerId);
          if (cashout.result) {
            res(cashout);
            break;
          }
        } catch (_) {} // eslint-disable-line
      }
    });

    this.loading[peer.peerId] = false;
  }

  async handleCashoutAll() {
    this.loading['cashoutAll'] = true;

    const promises = this.peers.filter(x => x.uncashedPayout ?? 0 > 0)
      .map(x => this.handleCashout({
        peerId: x.peerId,
        uncashedPayout: x.uncashedPayout ?? 0
      }));

    await Promise.all(promises);

    this.loading['cashoutAll'] = false;
  }
}
</script>

<template>
  <div>
    <div>
      Total: {{totalUncashedPayout / 10000000000000000 }} BZZ
      <el-button
        size="mini"
        :disabled="totalUncashedPayout === 0 || loading['cashoutAll']"
        :loading="loading['cashoutAll']"
        @click="handleCashoutAll()"
        >Cashout All</el-button>
    </div>
    <el-progress :percentage="percentage"></el-progress>
    <el-table :data="peers" style="width: 100%">
      <el-table-column prop="peerId" label="Peer"> </el-table-column>
      <el-table-column prop="uncashedPayout" sortable sort-by="uncashedPayout" label="Uncashed Payout (BZZ)">
        <template #default="scope">
          {{ scope.row.uncashedPayout / 10000000000000000 }}
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="mini"
            :disabled="
              scope.row.uncashedPayout === 0 ||
              scope.row.uncashedPayout === null ||
              loading[scope.row.peerId]
            "
            :loading="loading[scope.row.peerId]"
            @click="handleCashout(scope.row)"
            >Cashout</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>