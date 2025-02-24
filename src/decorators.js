export function withLaser(robot) {
  const originalPerformTask = robot.performTask;

  robot.performTask = function () {
    const success = originalPerformTask.call(this);
    if (!success) return false; // Stop if base task fails
    console.log(`${this.name}: Firing laser!`);
    return true;
  };
  return robot;
}

export function withShield(robot) {
  const originalPerformTask = robot.performTask;

  robot.performTask = function () {
    if (this.status === "damaged") {
      console.log(`${this.name}: Damaged - cannot perform task.`);
      return false;
    }
    this.power += 10; // Reduce drain
    const success = originalPerformTask.call(this);
    if (!success) return false;
    console.log(`${this.name}: Shield protection.`);
    if (this.status !== "damaged" && Math.random() < 0.1) {
      this.status = "damaged";
      return false;
    }
    return true;
  };
  return robot;
}
