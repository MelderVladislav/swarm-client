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

  percentage = 0;

  async mounted() {
    await Promise.all([this.listAllUncashed()]);

    this.loading["list"] = false;
  }

  async listAllUncashed() {
    const peers = await SwarmClient.getLastCheques(); // get "$DEBUG_API/chequebook/cheque" | jq -r '.lastcheques | .[].peer'
    this.peers = peers.map((x) => ({ peerId: x.peer, uncashedPayout: null }));
    const step = 100 / peers.length;

    const process = async (peer: LastCheque) => {
      const cumulativePayout = peer.lastreceived?.payout ?? 0;
      const cashedPayout = await SwarmClient.getLastCashoutByPeer(peer.peer)
        .then((x) => x?.cumulativePayout ?? 0)
        .catch(() => 0);
      const uncashedPayout = cumulativePayout - cashedPayout;

      //console.log(peer, uncashedPayout);

      this.peers.find(
        (x) => x.peerId === peer.peer
      )!.uncashedPayout = uncashedPayout;

      if (uncashedPayout > 10000) {
        //console.log(peer)
        // post "$DEBUG_API/chequebook/cashout/$peer" | jq -r .transactionHash
        // wait not null: get $DEBUG_API/chequebook/cashout/$peer | jq .result)"
      }

      this.percentage = Math.round(this.percentage + step);
    };

    // for (const peer of peers) {
    //   await process(peer);
    // }

    await Promise.all(peers.map((peer) => process(peer)));

    this.percentage = 100;

    console.log("done");
  }

  async handleCashout(peer: { peerId: string; uncashedPayout: number }) {
    this.loading[peer.peerId] = true;
    await SwarmClient.cashoutCheque(peer.peerId);
    await new Promise(async (res) => {
      // eslint-disable-line
      while (true) {
        // eslint-disable-line
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
}
</script>

<template>
  <div>
    <el-progress :percentage="percentage"></el-progress>
    <el-table :data="peers" style="width: 100%">
      <el-table-column prop="peerId" label="Peer"> </el-table-column>
      <el-table-column prop="uncashedPayout" sortable label="Uncashed Payout">
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="mini"
            :disabled="
              scope.row.uncashedPayout === 0 ||
              scope.row.uncashedPayout === null
            "
            :loading="loading[scope.row.peerId]"
            @click="handleCashout(scope.row)"
            >Cashout</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>