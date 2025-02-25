export function withLaser(robot) {
  console.log(`${robot.name} is armed with laser`);
  return robot;
}

export function withShield(robot) {
  console.log(`${robot.name} is protected by shield`);
  return robot;
}

export function withEfficiencyUpgrade(robot) {
  const originalPerformTask = robot.performTask;
  robot.performTask = function (task) {
    const reducedTask = {
      ...task,
      powerCost: Math.floor(task.powerCost * 0.7),
    }; // 30% less power
    console.log(
      `${this.name}: Efficiency upgrade applied, reduced power cost to ${reducedTask.powerCost}`
    );
    return originalPerformTask.call(this, reducedTask);
  };
  return robot;
}
