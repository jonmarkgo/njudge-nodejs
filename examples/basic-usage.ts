import {
  initGame,
  registerPlayer,
  setGameVariant,
  setPressRules,
  getGameState,
  processOrders,
  validateOrder,
  PlayerRegistration,
  GameState
} from '../lib';

// Initialize a new standard game with 7 players
console.log('Initializing new standard game...');
initGame('standard', 7);

// Register a test player
const player: PlayerRegistration = {
  name: 'Test Player',
  email: 'test@example.com',
  level: 'Novice',
  address: '123 Test St',
  country: 'Test Country'
};

console.log('Registering player:', player);
const registered = registerPlayer(player);
console.log('Player registration result:', registered);

// Set up game parameters
console.log('Setting up game parameters...');
setGameVariant('standard', 'test-game-1');
console.log('Game variant set successfully');

setPressRules('white', 'test-game-1');
console.log('Press rules set successfully');

// Get current game state
console.log('Getting game state...');
const state = getGameState();
console.log('Current game state:', JSON.stringify(state, null, 2));

// Test order validation
const testOrder = 'A PAR-BUR';
console.log('Validating order:', testOrder);
const isValid = validateOrder(testOrder, 1);
console.log('Order validation result:', isValid);

// Test order processing
console.log('Processing orders...');
const result = processOrders('A PAR-BUR', 1);
console.log('Order processing result:', result); 