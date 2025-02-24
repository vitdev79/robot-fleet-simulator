export class FleetCommand {
  static #instance = null;
  #robots = [];
  #observers = [];

  constructor() {
    if (FleetCommand.#instance)
      throw new Error(
        `Use FleetCommand.getInstance() instead new FleetCommand().`
      );
    FleetCommand.#instance = this;
  }

  static getInstance() {
    if (!FleetCommand.#instance) {
      FleetCommand.#instance = new FleetCommand();
    }
    return FleetCommand.#instance;
  }

  addRobot(robot) {
    this.#robots.push(robot);
    console.log(
      `${robot.name} added to fleet. Total robots: ${this.#robots.length}`
    );
  }

  listRobots() {
    return this.#robots.map((robot) => robot.name);
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  notify(update) {
    this.#observers.forEach((observer) => observer(update));
  }

  fleetStatus() {
    const statusReport = this.#robots.map((robot) => {
      return {
        name: robot.name,
        status: robot.status,
      };
    });
    console.log(`Fleet Status Report:`, statusReport);
    return statusReport;
  }
}
