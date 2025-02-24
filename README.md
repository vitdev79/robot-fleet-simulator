# Robot Fleet Simulator

A Node.js application demonstrating core object-oriented programming (OOP) principles in JavaScript. This project simulates a fleet of robots with specialized roles, dynamic upgrades, and real-time status updates, built with encapsulation, inheritance, polymorphism, and advanced design patterns like factory, singleton, decorator, and observer.

## Features

- **Encapsulation**: Private fields (e.g., `#status`, `#robots`) with getters and setters for controlled access.
- **Inheritance**: `WorkerBot` and `ScoutBot` extend the base `Robot` class.
- **Polymorphism**: Overridden `performTask()` methods for role-specific behaviors.
- **Factory Method**: `RobotFactory.create()` instantiates robots based on type.
- **Singleton**: `FleetCommand` ensures a single fleet manager with `getInstance()`.
- **Decorator**: `withLaser` and `withShield` dynamically enhance robot capabilities.
- **Observer**: `FleetCommand` notifies subscribers of status changes (e.g., damage, repairs).

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (comes with Node.js)
- A terminal (e.g., VS Code integrated terminal)

## Setup

1. **Clone the Repository**:

   git clone https://github.com/vitdev79/robot-fleet-simulator.git

2. **Navigate to the Project**:

cd robot-fleet-simulator

3. **Install Dependencies**:

npm install

4. **Run the Simulator**:

npm start

## Usage

The simulator runs in the console, creating a fleet with three robots:

- `Worker-01`: A standard robot.
- `Builder-01`: A worker bot that builds structures.
- `Scout-01`: A scout bot with laser and shield upgrades.

Watch them perform tasks, lose power, get damaged, and get repaired, with real-time updates from `FleetCommand`.

### Example Output

Worker-01 added to fleet. Total robots: 1
Builder-01 added to fleet. Total robots: 2
Scout-01 added to fleet. Total robots: 3
Worker-01: Task in progress...(Power: 80)
Status update: Worker-01 is damaged
Builder-01: Task in progress...(Power: 80)
Builder-01: Building structure...
Scout-01: Task in progress...(Power: 90)
Scout-01: Exploring terrain...
Scout-01: Firing laser!
Scout-01: Shield protection.
Scout-01: Task in progress...(Power: 80)
Scout-01: Exploring terrain...
Scout-01: Firing laser!
Scout-01: Shield protection.
Scout-01: Task in progress...(Power: 70)
Status update: Scout-01 is damaged
Scout-01: Damaged - cannot perform task.
Fleet Status Report: [
{ name: 'Worker-01', status: 'damaged' },
{ name: 'Builder-01', status: 'active' },
{ name: 'Scout-01', status: 'damaged' }
]
Scout-01 is getting repaired.
Status update: Scout-01 is damaged
Scout-01 has been repaired.
Status update: Scout-01 is active
Fleet Status Report: [
{ name: 'Worker-01', status: 'damaged' },
{ name: 'Builder-01', status: 'active' },
{ name: 'Scout-01', status: 'active' }
]

## Project Structure

robot-fleet-simulator/
├── src/
│ ├── robot.js # Base Robot class with power and status
│ ├── robotTypes.js # WorkerBot and ScoutBot subclasses
│ ├── robotFactory.js # Factory for creating robots
│ ├── decorators.js # Laser and shield decorators
│ ├── fleetCommand.js # Singleton fleet manager with observer
│ └── simulator.js # Main script to run the simulation
├── package.json # Node.js configuration and scripts
├── .gitignore # Ignores node_modules/
└── README.md # Project documentation

## How It Works

- **Robot Creation**: `RobotFactory` instantiates robots with specific roles.
- **Task Execution**: Robots perform tasks, losing power and risking damage (30% chance or power <= 0).
- **Upgrades**:
  - `withLaser`: Adds a laser action after tasks.
  - `withShield`: Reduces power drain (from 20 to 10) and lowers damage chance (to 10%).
- **Fleet Management**: `FleetCommand` tracks all robots and broadcasts status changes.
- **Repairs**: Damaged robots are fixed after a 3-second delay, updating the fleet.

## Learning Outcomes

This project demonstrates:

- Modular JavaScript with ES6 imports/exports.
- Practical OOP design for real-world simulation.
- Robust error handling and state management.

## Future Enhancements

- Add a `recharge()` method to restore robot power.
- Implement a CLI interface for interactive fleet control using `readline`.
- Visualize the fleet with a simple HTML UI.

## License

[MIT License](LICENSE)  
This project is open-source under the MIT License—feel free to use, modify, and distribute it.

## Author

Created by [vitdev79](https://github.com/vitdev79) as a portfolio project to showcase OOP mastery in JavaScript.

---

Happy coding, and enjoy exploring the robot fleet!
