import { RobotFactory } from "./robotFactory.js";
import { withLaser, withShield, withEfficiencyUpgrade } from "./decorators.js";
import { FleetCommand } from "./fleetCommand.js";
import { TaskStation } from "./taskStation.js";

const taskStationFactory = {
  create: () => new TaskStation(),
};
const robotFactory = RobotFactory;

const fleet = FleetCommand.getInstance(robotFactory, taskStationFactory);
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

fleet.addRobot("robot", { name: "Worker", maxPower: 100 });
fleet.addRobot("robot", bots.robot);
fleet.addRobot("builder", bots.builder, [withEfficiencyUpgrade]);
fleet.addRobot("scout", bots.scout, [withShield, withLaser]);

fleet.startSimulation();
