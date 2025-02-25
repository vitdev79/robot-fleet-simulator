# Robot Fleet Simulator

A Node.js application demonstrating advanced object-oriented programming (OOP) principles in JavaScript. This project simulates a fleet of robots with specialized roles, dynamic upgrades, and real-time task management, built with encapsulation, inheritance, polymorphism, and design patterns like factory, singleton, decorator, and observer.

## Features

- **Encapsulation**: Private fields (e.g., `#status`, `#robots`) with getters and setters for controlled access.
- **Inheritance**: `BuilderBot` and `ScoutBot` extend the base `Robot` class.
- **Polymorphism**: Overridden `performTask()` methods for role-specific behaviors.
- **Factory Method**: `RobotFactory.create()` instantiates robots based on type.
- **Singleton**: `FleetCommand` ensures a single fleet manager with `getInstance()`.
- **Decorator**: `withLaser`, `withShield`, and `withEfficiencyUpgrade` enhance robots (e.g., reducing power cost).
- **Observer**: `FleetCommand` notifies subscribers of status changes (e.g., damage, repairs).
- **Task Management**: `TaskStation` generates tasks periodically, with robots auto-assigning based on availability and capability.
- **Power System**: Robots manage power levels, recharging if below threshold after repairs.
- **Task Persistence**: Incomplete tasks (due to breakage) are requeued for other robots.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (comes with Node.js)
- A terminal (e.g., VS Code integrated terminal)

## Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vitdev79/robot-fleet-simulator.git
   ```

2. **Navigate to the Project**:

   ```bash
   cd robot-fleet-simulator
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Simulator**:

   ```bash
   npm start
   ```

## Usage

The simulator runs in the console, creating a fleet with four robots:

- **Worker-01** and **Worker-02**: Standard robots for general tasks.
- **Builder-01**: A builder bot with efficiency upgrade for construction.
- **Scout-01**: A scout bot with laser and shield for exploration.

Tasks are generated every 2 seconds, capped by robot count. Robots perform diagnostics, execute tasks, recharge power, and repair if broken (7s repair, 5s recharge delays), with status updates logged in real-time.

### Example Output

```
Worker-01 added to fleet. Total robots: 1
Worker-02 added to fleet. Total robots: 2
Builder-03 added to fleet. Total robots: 3
Builder-03: Efficiency upgrade applied
Scout-04 added to fleet. Total robots: 4
Scout-04 is armed with laser
Scout-04 is protected by shield
TaskStation generated: Build a wall
Builder-03: Efficiency upgrade applied, reduced power cost to 21
Builder-03: Performing Build a wall (Power: 79)
Status update: Builder-03 is busy
Fleet Status Report: [ { id: 1, name: 'Worker-01', status: 'active', power: 100 }, ... ]
TaskStation generated: Scout the perimeter
Scout-04: Performing Scout the perimeter (Power: 85)
Scout-04: Exploring terrain...
```

## Project Structure

```
robot-fleet-simulator/
├── src/
│   ├── robot.js          # Base Robot class with power and status
│   ├── robotTypes.js     # BuilderBot and ScoutBot subclasses
│   ├── robotFactory.js   # Factory for creating robots
│   ├── decorators.js     # Laser, shield, and efficiency decorators
│   ├── fleetCommand.js   # Singleton fleet manager with observer
│   ├── taskStation.js    # Task generation and queue management
│   └── simulator.js      # Main script to run the simulation
├── package.json          # Node.js configuration and scripts
├── .gitignore            # Ignores node_modules/
└── README.md             # Project documentation
```

## How It Works

1. **Robot Creation**: `RobotFactory` instantiates robots with unique IDs and optional decorators.
2. **Task Execution**: Robots perform diagnostics every 2 seconds, picking tasks they can handle (power-sufficient, not broken).
3. **Power & Breakage**: Tasks cost power; 10% chance of breaking requeues the task.
4. **Fleet Management**: `FleetCommand` tracks robots, generates tasks via `TaskStation`, and broadcasts status changes.
5. **Async Operations**: Repairs (7s) and recharges (5s) use Promises for accurate timing.

## Learning Outcomes

- Modular JavaScript with ES6 imports/exports.
- Advanced OOP design with real-time simulation.
- Asynchronous programming with Promises and timeouts.
- State and queue management.

## Future Enhancements

- Add task priorities or deadlines.
- Implement a CLI for manual task assignment.
- Visualize fleet status with a web UI.

## License

MIT License ([LICENSE](LICENSE))\
This project is open-source under the MIT License—feel free to use, modify, and distribute it.

## Author

Created by **vitdev79** as a portfolio project to showcase OOP mastery in JavaScript.
