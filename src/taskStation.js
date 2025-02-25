export class TaskStation {
  static #nextId = 1;
  constructor() {
    this.tasks = [];
    this.taskInterval = null;
  }

  startGeneratingTasks(max) {
    this.taskInterval = setInterval(() => {
      if (this.tasks.length <= max) {
        console.log(this.tasks.length);
        const taskTypes = [
          { name: "Maintenance", category: "General", powerCost: 20 },
          { name: "Build a wall", category: "Construction", powerCost: 30 },
          {
            name: "Scout the perimeter",
            category: "Exploration",
            powerCost: 15,
          },
        ];
        const task = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        this.generateTask(
          TaskStation.#nextId++,
          task.name,
          task.category,
          task.powerCost
        );
        console.log(`TaskStation generated: ${task.name}`);
      }
    }, 2000);
  }

  stopGenerationTasks() {
    clearInterval(this.taskInterval);
  }

  generateTask(id, name, category, powerCost) {
    this.tasks.push({ id, name, category, powerCost });
  }

  getTaskForRobot(robotType, remove = false) {
    const categoryMap = {
      Robot: "General",
      BuilderBot: "Construction",
      ScoutBot: "Exploration",
    };
    const category = categoryMap[robotType];
    const task = this.tasks.find((t) => t.category == category) || null;
    if (task && remove) {
      this.tasks = this.tasks.filter((t) => t !== task); // remove if requested
    }
    return task;
  }
}
