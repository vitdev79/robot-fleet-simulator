import { Robot } from "./robot.js";
import { WorkerBot, ScoutBot } from "./robotTypes.js";

export class RobotFactory {
  static create(type, name, power) {
    let bot;
    switch (type) {
      case "robot":
        bot = new Robot(name, power);
        break;
      case "worker":
        bot = new WorkerBot(name, power);
        break;
      case "scout":
        bot = new ScoutBot(name, power);
        break;
      default:
        throw new Error(`Unknown robot type ${type}`);
    }
    return bot;
  }
}
