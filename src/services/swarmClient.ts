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
}

export default new SwarmClient();