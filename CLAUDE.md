# Diplomacy Engine Node.js Bindings - Dev Guide

## Build & Test Commands
```bash
# Build the project (native addon + TypeScript)
npm run build

# Clean build artifacts
npm run clean

# Run all Jest tests
npm run test:jest

# Run a specific Jest test
npm run test:orders         # Test order syntax
npm run test:state          # Test game state
npm run test:management     # Test game management
npm run test:phases         # Test game phases
npm run test:config         # Test game configuration
npm run test:njudge-commands # Test NJudge commands

# Run a single test file directly
npx jest test/game-state.jest.ts
```

## Code Style Guidelines
- **TypeScript**: Use strict mode and proper type annotations
- **Imports**: Import specific functions/types, not whole modules
- **Types**: Define interfaces for all data structures in index.ts
- **Naming**: camelCase for variables/functions, PascalCase for interfaces/classes
- **Error Handling**: Return typed result objects with success/failure states
- **C++ Binding**: Minimal C++ code, focused on interfacing with the engine
- **Tests**: Write Jest tests for all features (*.jest.ts)
- **Documentation**: JSDoc comments for public API functions