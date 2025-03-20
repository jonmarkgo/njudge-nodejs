# Diplomacy Engine Node.js Binding Test Suite

This directory contains the test suite for the Diplomacy Engine Node.js binding. The tests are written using Jest and TypeScript.

## Test Coverage

The tests are organized into the following categories:

### Order Syntax and Validation
- `order-tests.jest.ts` - Basic order syntax validation
- `order-resolution.jest.ts` - Order resolution and conflict testing
- `conditional-orders.jest.ts` - Conditional orders and order precedence

### Game Management
- `game-management.jest.ts` - Game creation and basic management
- `game-admin.jest.ts` - Administrative functions
- `game-state.jest.ts` - Game state tracking and validation
- `game-phases.jest.ts` - Game phase transitions
- `game-config-commands.jest.ts` - Game configuration commands

### NJudge Commands
- `njudge-commands.jest.ts` - Basic NJudge command validation
- `deadline-management.jest.ts` - Deadline and absence management
- `game-conclusion.jest.ts` - Draw voting and game conclusion
- `master-controls.jest.ts` - Master-only game controls

### Player Interaction
- `player-interactions.jest.ts` - Player registration and management
- `player-communications.jest.ts` - Basic player communications
- `player-registration.jest.ts` - Player registration and preferences
- `extended-press.jest.ts` - Advanced press communication features

## Implementation Status

Many of the tests are currently skipped (using Jest's `test.skip` notation) because the underlying functionality is not yet fully implemented in the C++ binding. These skipped tests serve as documentation for expected behavior and as a roadmap for future implementation.

The current implementation status is as follows:

### Fully Implemented
- Basic order syntax validation
- Game state tracking
- Game initialization
- Basic game configuration

### Partially Implemented
- Order resolution
- Player registration
- Game management functions
- Text input/output processing

### Not Yet Implemented
- Full NJudge command processing
- Email simulation
- Advanced press features
- Draw/concession voting
- Conditional orders processing
- Master-only administrative functions

## Running Tests

You can run all tests with:

```bash
npm run test:jest
```

Or run specific test categories with:

```bash
npm run test:orders        # Run order syntax tests
npm run test:resolution    # Run order resolution tests
npm run test:state         # Run game state tests
npm run test:management    # Run game management tests
npm run test:admin         # Run administrative function tests
npm run test:njudge-commands # Run NJudge command tests
npm run test:player        # Run player interaction tests
npm run test:communications # Run player communication tests
npm run test:phases        # Run game phase tests
npm run test:config        # Run game configuration tests
npm run test:deadlines     # Run deadline management tests
npm run test:conclusion    # Run game conclusion tests
npm run test:master        # Run master controls tests
npm run test:registration  # Run player registration tests
npm run test:press         # Run extended press tests
npm run test:conditional   # Run conditional orders tests
```

## Adding New Tests

When adding new tests:

1. Create a new file with the `.jest.ts` extension
2. Import the necessary functions from the binding
3. Use `describe` and `test` to organize your tests
4. Add any new test commands to the `package.json` scripts section
5. Document the test in this README

## Future Work

Priority areas for implementation include:

1. Completing the NJudge command processing functionality
2. Implementing conditional order processing
3. Adding full email simulation for player communications
4. Implementing draw and concession voting mechanics
5. Adding master-only administrative functions

Please refer to the [NJudge documentation](https://diplom.org/~njudge/docs/manual-all.htm) for details on expected behavior.