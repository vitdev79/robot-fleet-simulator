import { FleetCommand } from "./fleetCommand.js";

export class Robot {
  #status = "active";
  #fleetCommand = FleetCommand.getInstance(); // Singleton ref

  constructor(name, power) {
    if (!name || power === undefined)
      throw new Error(`Name and power are required.`);
    this.name = name;
    this.power = power;
    this.#fleetCommand.addRobot(this); // Auto-add to fleet
  }

  get status() {
    return this.#status;
  }

  set status(newStatus) {
    const statuses = ["active", "damaged"];
    if (newStatus !== this.#status && statuses.includes(newStatus)) {
      this.#status = newStatus;
      this.#fleetCommand.notify({ name: this.name, status: this.#status });
    } else {
      console.log(`Status unchanged or unrecognized: ${newStatus}`);
    }
  }

  repair() {
    if (this.#status !== "damaged") {
      console.log(`${this.name} does not need repair.`);
    } else {
      this.#fleetCommand.notify({
        name: this.name,
        status: this.#status,
        action: "repairing",
      });
      setTimeout(() => {
        this.status = "active";
        console.log(`${this.name} has been repaired.`);
      }, 3000);
    }
  }

  performTask() {
    if (this.#status === "damaged") {
      console.log(`${this.name}: Damaged - cannot perform task.`);
      return false;
    }
    this.power -= 20;
    console.log(`${this.name}: Task in progress...(Power: ${this.power})`);
    if (this.power <= 0 || Math.random() < 0.3) {
      this.status = "damaged";
      return false;
    }
    return true;
  }
}
