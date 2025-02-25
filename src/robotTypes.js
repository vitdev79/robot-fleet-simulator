import { Robot } from "./robot.js";

export class BuilderBot extends Robot {
  constructor({ name, maxPower }) {
    super({ name, maxPower });
  }

  performTask(task) {
    if (task.category !== "Construction") {
      return {
        completed: false,
        message: `${this.name} can only perform Construction tasks`,
      };
    }
    const result = super.performTask(task);
    if (result.completed) {
      console.log(`${this.name}: Building structure...`);
    }
    return result;
  }
}

export class ScoutBot extends Robot {
  constructor(name, maxPower) {
    super(name, maxPower);
  }

  performTask(task) {
    if (task.category !== "Exploration") {
      return {
        completed: false,
        message: `${this.name} can only perform Exploration tasks`,
      };
    }
    const result = super.performTask(task);

    if (result.completed) {
      console.log(`${this.name}: Exploring terrain...`);
    }
    return result;
  }
}
