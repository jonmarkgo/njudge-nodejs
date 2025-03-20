# Diplomacy Game Engine Node.js Bindings

Node.js bindings for the Diplomacy game engine, providing a modern TypeScript interface for game management, order processing, and player communication.

## Features

- Full TypeScript support with type definitions
- Player registration and management
- Order processing and validation
- Game state queries
- Email-based command interface simulation
- Game settings configuration (variants, press rules, deadlines, etc.)

## Prerequisites

- Node.js 14.x or later
- npm 6.x or later
- Python (for node-gyp)
- C++ build tools (gcc/clang)

## Installation

1. Clone the repository and navigate to the nodejs-binding directory:
```bash
cd nodejs-binding
```

2. Install dependencies:
```bash
npm install
```

3. Build the native addon and TypeScript code:
```bash
npm run build
```

## Usage

Here's a basic example of using the bindings:

```typescript
import {
  initGame,
  registerPlayer,
  processTextInput,
  getTextOutput
} from 'diplomacy-engine';

// Initialize a new game
initGame();

// Register a player
const player = {
  name: 'John Doe',
  email: 'john@example.com',
  level: 'Novice',
  address: '123 Main St',
  country: 'USA'
};

registerPlayer(player);

// Process orders
processTextInput('A PAR-BUR\nF BRE-MAO', 'john@example.com');

// Get output
const output = getTextOutput(1);
console.log(output);
```

## API Reference

### Game Management
- `initGame()`: Initialize a new game
- `setGameVariant(variant: 'standard' | 'machiavelli', gameId: string)`: Set game variant
- `setPressRules(type: 'none' | 'white' | 'grey', gameId: string)`: Set press rules
- `setDeadlines(deadline: number, grace: number, gameId: string)`: Set deadlines

### Player Management
- `registerPlayer(player: PlayerRegistration)`: Register a new player
- `linkPlayerEmail(newEmail: string, existingEmail: string)`: Link additional email to player

### Order Processing
- `processOrders(orders: string, playerId: number)`: Process orders for a player
- `validateOrder(order: string, playerId: number)`: Validate an order
- `getGameState()`: Get current game state

### Text I/O
- `processTextInput(text: string, fromEmail: string)`: Process text commands
- `getTextOutput(playerId: number)`: Get output for a player
- `simulateInboundEmail(subject: string, body: string, fromEmail: string)`: Simulate email input
- `getOutboundEmails()`: Get all pending outbound emails

## Command Syntax

The binding supports the standard Diplomacy order syntax as used by njudge:

### Movement Orders
- Hold: `F LON H`, `A PAR HOLD`
- Move: `F LON-NTH`, `A PAR-BUR`
- Support Hold: `F LON S A WAL`, `F LON SUP A WAL`
- Support Move: `F LON S A WAL-YOR`, `F LON SUP A WAL-YOR`
- Convoy: `F NTH C A LON-NWY`, `F NTH CON A LON-NWY`

### Retreat Orders
- Retreat: `A PAR R BUR`, `A PAR RET BUR`
- Disband: `A PAR D`, `A PAR DISBAND`

### Build Orders
- Build: `B F LON`, `BUILD A PAR`
- Remove: `R F LON`, `REMOVE A PAR`
- Waive: `W`, `WAIVE`

## Testing

The project includes a comprehensive test suite to validate the functionality of the Node.js bindings. Run the tests with:

```bash
# Run all tests
npm run test-all

# Run individual test suites
npm test                # Basic functionality
npm run test-orders     # Order syntax
npm run test-game       # Game management
npm run test-njudge     # NJudge commands
```

See the `test/README.md` file for more information about the test suite and how to extend it with your own tests.

## Development

- `npm run build`: Rebuild the native addon and TypeScript code
- `npm run clean`: Clean build artifacts
- `npm test`: Run tests
- `npm run prepare`: Prepare for publishing

## License

Same as the original Diplomacy game engine 