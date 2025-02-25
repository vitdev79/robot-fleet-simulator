import { FleetCommand } from "./fleetCommand.js";

export class Robot {
  static #nextId = 1;
  #id;
  #status = "active";
  #fleetCommand = FleetCommand.getInstance(); // Singleton ref

  constructor({ name, maxPower }) {
    if (!name || maxPower === undefined)
      throw new Error(`Name and power are required.`);
    this.#id = Robot.#nextId++;
    this.name = `${name}-${String(this.#id).padStart(2, "0")}`;
    this.maxPower = maxPower;
    this.power = maxPower;
    this.#fleetCommand.addRobot(this); // Auto-add to fleet
  }

  get id() {
    return this.#id;
  }

  get status() {
    return this.#status;
  }

  set status(newStatus) {
    const statuses = ["active", "broken", "busy"];
    if (newStatus !== this.#status && statuses.includes(newStatus)) {
      this.#status = newStatus;
      this.#fleetCommand.notify({ name: this.name, status: this.#status });
    } else {
      console.log(`Status unchanged or unrecognized: ${newStatus}`);
    }
  }

  async repair() {
    if (this.#status !== "broken") {
      console.log(`${this.name} does not need repair.`);
      return;
    }

    this.#fleetCommand.notify({
      name: this.name,
      status: this.#status,
      action: "repairing",
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        this.status = "active";
        const powerThreshold = this.maxPower * 0.75;
        if (this.power < powerThreshold) {
          this.recharge();
        }
        console.log(`${this.name} has been repaired.`);
        resolve();
      }, 7000);
    });
  }

  async performTask(task) {
    this.status = "busy";
    this.power -= task.powerCost;
    console.log(`${this.name}: Performing ${task.name} (Power: ${this.power})`);

    if (Math.random() < 0.1) {
      this.status = "broken";
      this.#fleetCommand.requeueTask(task);
      return {
        completed: false,
        message: `${this.name} broke during ${task.name}`,
      };
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        this.status = "active";
        resolve();
      }, 5000);
    });

    return { completed: true, message: `${this.name} completed ${task.name}` };
  }

  async recharge() {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.power = this.maxPower;
        console.log(`${this.name} recharged to ${this.power}`);
        this.#fleetCommand.notify({ name: this.name, status: this.#status });
        resolve();
      }, 5000);
    });
  }

  async performDiagnostics() {
    if (this.#status !== "active") return;
    const task = this.#fleetCommand.getTaskForRobot(this, false); // Peek only
    if (!task) return;

    if (this.power < task.powerCost) {
      await this.recharge();
      return;
    }

    const confirmedTask = this.#fleetCommand.getTaskForRobot(this, true);
    if (confirmedTask) {
      const result = await this.performTask(confirmedTask);
      console.log(result);
      if (!result.completed && this.status === "broken") {
        await this.repair();
      }
    }
  }
}
