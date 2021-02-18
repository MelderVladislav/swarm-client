import axios from 'axios'

class PeersClient {
  public async GetAllPeers() : Promise<any> {
    let result = await axios.get("http://localhost:1635/peers");

    return result
  }
}

export default new PeersClient();