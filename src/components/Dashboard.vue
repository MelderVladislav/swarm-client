<script lang="ts">
import beeClient from "../services/beeClient";
import { Vue } from "vue-class-component";
//import notificationService from '../services/notificationService'
import { ChequebookBalance, NodeAddresses } from "../services/swarmClient"; // eslint-disable-line

const { SwarmClient } = beeClient;

export default class Dashboard extends Vue {
  nodeAddresses: NodeAddresses | null = null;
  chequebookAddress: string | null = null;
  balances: ChequebookBalance | null = null;
  loading: { [key: string]: boolean } = {
    list: true,
  };

  async mounted() {
    await Promise.all([
      this.loadBalances(),
      this.loadChequebookAddress(),
      this.loadNodeAddresses(),
    ]);
    this.loading["list"] = false;
  }

  async loadChequebookAddress() {
    this.chequebookAddress = await SwarmClient.getChequebookAddress();
  }

  async loadBalances() {
    this.balances = await SwarmClient.getChequebookBalance();
  }

  async loadNodeAddresses() {
    this.nodeAddresses = await SwarmClient.getNodeAddresses();
  }
}
</script>

<template>
  <div v-if="!this.loading['list']">
    <div>
      <h3>Overlay Ethereum Address</h3>
      <p><a :href="'https://goerli.etherscan.io/address/' + nodeAddresses.ethereum" target="_blank">{{ nodeAddresses.ethereum }}</a></p>
    </div>
    <div>
      <h3>Chequebook Ethereum Address</h3>
      <p><a :href="'https://goerli.etherscan.io/address/' + chequebookAddress" target="_blank">{{ chequebookAddress }}</a></p>
    </div>
    <div>
      <h3>Total Balance</h3>
      <p>{{ balances.totalBalance / 10000000000000000 }} BZZ</p>
    </div>
    <div>
      <h3>Available Balance</h3>
      <p>{{ balances.availableBalance / 10000000000000000 }} BZZ</p>
    </div>
  </div>
</template>