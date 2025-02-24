import { RobotFactory } from "./robotFactory.js";
import { withLaser, withShield } from "./decorators.js";
import { FleetCommand } from "./fleetCommand.js";

const fleet = FleetCommand.getInstance();
fleet.subscribe(repairLogger);
fleet.subscribe(statusLogger);

function repairLogger(update) {
  if (update.action === "repairing") {
    console.log(`${update.name} is getting repaired.`);
  }
}
function statusLogger(update) {
  console.log(`Status update: ${update.name} is ${update.status}`);
}

const bot = RobotFactory.create("robot", "Worker-01", 100);
const workerBot = RobotFactory.create("worker", "Builder-01", 100);
const laserAndShieldScout = withShield(
  withLaser(RobotFactory.create("scout", "Scout-01", 100))
);

bot.performTask();
workerBot.performTask();
laserAndShieldScout.performTask();
laserAndShieldScout.performTask();
laserAndShieldScout.performTask();
laserAndShieldScout.performTask();
laserAndShieldScout.performTask();

fleet.fleetStatus();

setTimeout(() => {
  laserAndShieldScout.repair();
  setTimeout(() => fleet.fleetStatus(), 4000); // Wait for repair
}, 1000);
