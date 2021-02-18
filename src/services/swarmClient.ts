import axios from 'axios'
import constants from '../constants'

class SwarmClient {
  async getAllPeers(): Promise<Peer[]> {
    let response = await axios.get(constants.BeeDebugAddress + "/peers")
    let peers = response.data.peers as Peer[]
    return peers;
  }

  async removePeer(address: string) {
    await axios.delete(constants.BeeDebugAddress + "/peers/" + address);
  }

  async connectToPeer(address: string) {
    const response = await axios.post(constants.BeeDebugAddress + "/connect/" + address);
    return response.data;
  }
}

export default new SwarmClient();