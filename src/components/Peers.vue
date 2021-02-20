<script lang="ts">
import beeClient from "../services/beeClient";
import { Vue } from "vue-class-component";
import notificationService from '../services/notificationService'
import { Peer, NodeAddresses } from "../services/swarmClient"; // eslint-disable-line

const { SwarmClient } = beeClient;

export default class Peers extends Vue {
  peers: Peer[] = [];
  nodeAddresses: NodeAddresses;
  blocklist: any[] = [];
  welcomeMessage: string = "";

  loading = true;
  newPeerAddress = "";

  async mounted() {
    await Promise.all([
      SwarmClient.getAllPeers().then((x) => (this.peers = x)),
      SwarmClient.getNodeAddresses().then((x) => (this.nodeAddresses = x)),
      SwarmClient.getBlocklist().then((x) => (this.blocklist = x)),
      SwarmClient.getWelcomeMessage().then((x) => (this.welcomeMessage = x)),
    ]);

    this.loading = false;
  }

  async handleDisconnect(peer: Peer) {
    // 0dc56ee18f28e620dc7e1b8bc21c347457f559e7b68e53a4984a4b66584ee8ca
    // 1ed543a81ed25efd00a34c6fe8a3559e1f2cc6bb3d97096e2c9223cb0edbf033
    try {
      this.loading = true;
      await SwarmClient.removePeer(peer.address);
      this.peers = await SwarmClient.getAllPeers();
    } catch (err) {
      notificationService.displayErrorMessage(err.message);
    } finally {
      this.loading = false;
    }
  }

  async handleAdd() {
    try {
      this.loading = true;
      await SwarmClient.connectToPeer(this.newPeerAddress);
      this.peers = await SwarmClient.getAllPeers();
      this.loading = false;
    } catch (err) {
      notificationService.displayErrorMessage(err.message);
    } finally {
      this.loading = false;
    }
  }

  async handleSetWelcomeMessage() {
    try {
      this.loading = true;
      await SwarmClient.setWelcomeMessage(this.welcomeMessage);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<template>
  <div>
    <div></div>

    <div>
      <el-input
        placeholder="New peer address"
        v-model="newPeerAddress"
        :disabled="loading"
      >
        <template #append>
          <el-button
            type="primary"
            @click="handleAdd"
            :disabled="loading"
            :loading="loading"
            >Add</el-button
          >
        </template>
      </el-input>

      <el-input
        placeholder="Welcome message"
        v-model="welcomeMessage"
        :disabled="loading"
      >
        <template #append>
          <el-button
            type="primary"
            @click="handleSetWelcomeMessage"
            :disabled="loading"
            :loading="loading"
            >Set</el-button
          >
        </template>
      </el-input>
    </div>

    <el-table v-loading="loading" :data="peers" style="width: 100%">
      <el-table-column prop="address" label="Peer Address"> </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleDisconnect(scope.row)"
            >Disconnect</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>