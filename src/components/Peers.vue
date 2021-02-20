<script lang="ts">
import beeClient from "../services/beeClient";
import { Vue } from "vue-class-component";
import notificationService from '../services/notificationService'

type Peer = {
  address: string;
};

export default class Peers extends Vue {
  peers: Peer[] = [];
  loading = true;
  newPeerAddress = "";

  async mounted() {
    this.peers = await beeClient.SwarmClient.getAllPeers();
    this.loading = false;
  }

  async handleRemove(peer: Peer) {
    // 0dc56ee18f28e620dc7e1b8bc21c347457f559e7b68e53a4984a4b66584ee8ca
    // 1ed543a81ed25efd00a34c6fe8a3559e1f2cc6bb3d97096e2c9223cb0edbf033
    try {
      this.loading = true;
      await beeClient.SwarmClient.removePeer(peer.address);
      this.peers = await beeClient.SwarmClient.getAllPeers();
    } catch (err) {
      notificationService.displayErrorMessage(err.message);
    } finally {
      this.loading = false;
    }
  }

  async handleAdd() {
    try {
      this.loading = true;
      await beeClient.SwarmClient.connectToPeer(this.newPeerAddress);
      this.peers = await beeClient.SwarmClient.getAllPeers();
      this.loading = false;
    } catch (err) {
      notificationService.displayErrorMessage(err.message);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<template>
  <div>
    <div>
      <el-input
        placeholder="New peer address"
        v-model="newPeerAddress"
      ></el-input>
      <el-button type="primary" @click="handleAdd">Add</el-button>
    </div>
    <el-table v-loading="loading" :data="peers" style="width: 100%">
      <el-table-column prop="address" label="Peer Address"> </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleRemove(scope.row)"
            >Remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>