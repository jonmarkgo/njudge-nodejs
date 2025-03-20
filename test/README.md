# Diplomacy Engine Node.js Binding Test Suite

This directory contains a comprehensive test suite for the Node.js bindings to the Diplomacy adjudicator engine. The test suite verifies various aspects of the binding functionality including:

1. Game initialization
2. Order validation and processing
3. Player registration and management
4. Game state tracking
5. Text/email input/output processing

## Test Files

- `example.ts` - Basic functionality test
- `order-tests.ts` - Tests for order validation with various syntax formats
- `game-management-tests.ts` - Tests for game setup, configuration, and player management
- `test-suite.ts` - Comprehensive test of all binding functionality
- `run-tests.ts` - Test runner that can execute multiple test suites

## Running Tests

You can run individual test suites or all tests at once using the following npm commands:

```bash
# Run all tests
npm run test-all

# Run the basic functionality test
npm test

# Run only order syntax tests
npm run test-orders

# Run only game management tests
npm run test-game
```

The test runner (`run-tests.ts`) supports running specific test suites by providing their numbers as arguments:

```bash
# Run just the first and third test suites
npx ts-node test/run-tests.ts 1 3
```

## Test Output

The tests provide feedback using symbols and detailed output:

- ✅ Success - A test passed
- ❌ Failure - A test failed
- ℹ️ Info - Additional information provided by the test

## Extending the Tests

To add new tests:

1. Create a new test file in the `test` directory
2. Add the test file to the `TEST_SUITES` array in `run-tests.ts`
3. Create a new npm script in `package.json` to run your test individually

## Notes on Test Environment

The tests assume a properly configured Diplomacy engine with a valid configuration file at `/home/judge/dip.conf`. Make sure this file exists and contains the correct settings for the Diplomacy engine.

## Order Syntax Reference

The order tests validate various formats for Diplomacy orders including:

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