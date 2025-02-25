import { Robot } from "./robot.js";
import { ScoutBot, BuilderBot } from "./robotTypes.js";

export class RobotFactory {
  static create(type, { name, maxPower }) {
    let bot;
    switch (type) {
      case "robot":
        bot = new Robot({ name, maxPower });
        break;
      case "builder":
        bot = new BuilderBot({ name, maxPower });
        break;
      case "scout":
        bot = new ScoutBot({ name, maxPower });
        break;
      default:
        throw new Error(`Unknown robot type ${type}`);
    }
    return bot;
  }
}
