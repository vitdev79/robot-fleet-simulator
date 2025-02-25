import { RobotFactory } from "./robotFactory.js";
import { withLaser, withShield, withEfficiencyUpgrade } from "./decorators.js";
import { FleetCommand } from "./fleetCommand.js";

const fleet = FleetCommand.getInstance();
fleet.subscribe(statusLogger);
fleet.subscribe(repairLogger);

function repairLogger(update) {
  if (update.action === "repairing") {
    console.log(`${update.name} is getting repaired.`);
  }
}
function statusLogger(update) {
  console.log(`Status update: ${update.name} is ${update.status}`);
}

const bots = {
  robot: { name: "Worker", maxPower: 100 },
  builder: { name: "Builder", maxPower: 100 },
  scout: { name: "Scout", maxPower: 100 },
};

console.log(bots.scout.maxPower);

RobotFactory.create("robot", bots.robot);
RobotFactory.create("robot", bots.robot);
withEfficiencyUpgrade(RobotFactory.create("builder", bots.builder));
withShield(withLaser(RobotFactory.create("scout", bots.scout)));

fleet.startSimulation();
