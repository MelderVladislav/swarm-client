import { Bee, BeeDebug } from "@ethersphere/bee-js";

class BeeClient {
  private bee: Bee;

  private beeDebug: BeeDebug;

  public InitEndpoints(beeAddress: string, beeDebugAddress: string) {
    this.bee = new Bee(beeAddress);
    this.beeDebug = new BeeDebug(beeDebugAddress);
  }
  public async GetAllPeers() : Promise<any> {
    
    
  }
}

export default new BeeClient();