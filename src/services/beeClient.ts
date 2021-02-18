import { Bee, BeeDebug } from "@ethersphere/bee-js";
import constants from "../constants"
import swarmClient from '../services/swarmClient'

class BeeClient {
  public Bee: Bee;

  public BeeDebug: BeeDebug;

  public SwarmClient = swarmClient;

  public InitEndpoints(beeAddress: string, beeDebugAddress: string) {
    this.Bee = new Bee(beeAddress);
    this.BeeDebug = new BeeDebug(beeDebugAddress);
  }
}
let beeClient = new BeeClient();
beeClient.InitEndpoints(constants.BeeAddress, constants.BeeDebugAddress);

export default beeClient;