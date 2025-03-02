import { TaskStation } from "./taskStation.js";

export class FleetCommand {
  static #instance = null;
  #robotFactory;
  #robots = [];
  #observers = [];
  #taskStation;

  static getInstance(robotFactory, taskStation) {
    if (!FleetCommand.#instance) {
      FleetCommand.#instance = new FleetCommand(robotFactory, taskStation);
    } else if (robotFactory) {
      throw new Error("FleetCommand already initialized—use without factory.");
    }
    return FleetCommand.#instance;
  }

  constructor(robotFactory, taskStationFactory) {
    if (FleetCommand.#instance)
      throw new Error(
        `Use FleetCommand.getInstance() instead new FleetCommand().`
      );
    this.#robotFactory = robotFactory;
    this.#taskStation = taskStationFactory.create();
    FleetCommand.#instance = this;
  }

  addRobot(type, config, decorators) {
    const robot = this.#robotFactory.create(type, config, decorators);
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
        id: robot.id,
        name: robot.name,
        status: robot.status,
        power: robot.power,
      };
    });
    console.log(`Fleet Status Report:`, statusReport);
    return statusReport;
  }

  addTask(name, category, powerCost) {
    this.#taskStation.generateTask(name, category, powerCost);
  }

  getTaskForRobot(robot, remove = false) {
    return this.#taskStation.getTaskForRobot(robot.constructor.name, remove);
  }

  requeueTask(task) {
    console.log(`Requeuing incomplete task: ${task.name}`);
    this.#taskStation.generateTask(
      task.id,
      task.name,
      task.category,
      task.powerCost
    );
  }

  startSimulation() {
    this.#taskStation.startGeneratingTasks(this.#robots.length);
    setInterval(() => {
      this.#robots.forEach((robot) => robot.performDiagnostics());
      this.fleetStatus();
      console.log(this.#taskStation.tasks);
    }, 2000);
  }
}
