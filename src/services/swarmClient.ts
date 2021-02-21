import axios from 'axios'
import constants from '../constants'

export type Peer = {
  address: string;
};

export type NodeAddresses = {
  overlay: string;
  underlay: string[];
  ethereum: string;
  public_key: string;
  pss_public_key: string;
};

export interface Bin {
  population: number;
  connected: number;
  disconnectedPeers: string[];
  connectedPeers: string[];
}

export interface Topology {
  baseAddr: string;
  population: number;
  connected: number;
  timestamp: string;
  nnLowWatermark: number;
  depth: number;
  bins: {
    [key: string]: Bin;
  };
}

export type Last = {
  beneficiary: string;
  chequebook: string;
  payout: any;
}

export type LastCheque = {
  peer: string;
  lastreceived: Last | null;
  lastsent: Last | null;
}

export type LastCashout = {
  peer: string;
  chequebook: string;
  cumulativePayout: number;
  beneficiary: string;
  transactionHash: string;
  result: CashoutResult | null;
}

export type CashoutResult = {
  recipient: string;
  lastPayout: number;
  bounced: boolean;
}

export type CashoutChequeResult = {
  transactionHash: string;
}

class SwarmClient {
  // connectivity

  async getAllPeers(): Promise<Peer[]> {
    return axios.get(constants.BeeDebugAddress + "/peers").then(x => x.data.peers);
  }

  async getNodeAddresses(): Promise<NodeAddresses> {
    return axios.get(constants.BeeDebugAddress + "/addresses").then(x => x.data);
  }

  async getBlocklist(): Promise<any[]> {
    return axios.get(constants.BeeDebugAddress + "/blocklist").then(x => x.data.peers);
  }

  async pingNode(peerId: string): Promise<string> {
    return axios.get(constants.BeeDebugAddress + "/pingpong/" + peerId).then(x => x.data.rtt);
  }

  async getTopology(): Promise<Topology> {
    return axios.get(constants.BeeDebugAddress + "/topology").then(x => x.data);
  }

  async removePeer(address: string) {
    return axios.delete(constants.BeeDebugAddress + "/peers/" + address);
  }

  async connectToPeer(multiAddress: string) {
    return axios.post(constants.BeeDebugAddress + "/connect/" + multiAddress).then(x => x.data);
  }

  async getWelcomeMessage(): Promise<string> {
    return axios.get(constants.BeeDebugAddress + "/welcome-message").then(x => x.data.welcome_message);
  }

  async setWelcomeMessage(welcome_message: string): Promise<void> {
    return axios.post(constants.BeeDebugAddress + "/welcome-message", { welcome_message }).then(x => x.data);
  }

  // chequebook

  async getLastCheques(): Promise<LastCheque[]> {
    return axios.get(constants.BeeDebugAddress + "/chequebook/cheque").then(x => x.data.lastcheques);
  }

  async getLastChequeByPeer(peerId: string): Promise<LastCheque> {
    return axios.get(constants.BeeDebugAddress + "/chequebook/cheque/" + peerId).then(x => x.data);
  }

  async getLastCashoutByPeer(peerId: string): Promise<LastCashout> {
    return axios.get(constants.BeeDebugAddress + "/chequebook/cashout/" + peerId).then(x => x.data);
  }

  async cashoutCheque(peerId: string): Promise<CashoutChequeResult> {
    return axios.post(constants.BeeDebugAddress + "/chequebook/cashout/" + peerId).then(x => x.data);
  }
}

export default new SwarmClient();