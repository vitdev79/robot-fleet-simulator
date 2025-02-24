import { Robot } from "./robot.js";

export class WorkerBot extends Robot {
  constructor(name, power) {
    super(name, power);
  }

  performTask() {
    const success = super.performTask();
    if (!success || this.status === "damaged") return false;
    console.log(`${this.name}: Building structure...`);
    return true;
  }
}

export class ScoutBot extends Robot {
  constructor(name, power) {
    super(name, power);
  }

  performTask() {
    const success = super.performTask();
    if (!success || this.status === "damaged") return false;
    console.log(`${this.name}: Exploring terrain...`);
    return true;
  }
}
