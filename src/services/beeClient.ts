import { Bee, BeeDebug } from "@ethersphere/bee-js";
import constants from "../constants"

class BeeClient {
  public Bee: Bee;

  public BeeDebug: BeeDebug;

  public InitEndpoints(beeAddress: string, beeDebugAddress: string) {
    this.Bee = new Bee(beeAddress);
    this.BeeDebug = new BeeDebug(beeDebugAddress);
  }
}
let beeClient = new BeeClient();
beeClient.InitEndpoints(constants.BeeAddress, constants.BeeDebugAddress);

export default beeClient;