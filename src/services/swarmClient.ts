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
}

export default new SwarmClient();