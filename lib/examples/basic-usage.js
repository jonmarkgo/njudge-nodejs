"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
// Initialize a new standard game with 7 players
console.log('Initializing new standard game...');
(0, lib_1.initGame)('standard', 7);
// Game ID for testing
const gameId = 'test-game-1';
// Register a test player
const playerName = 'Test Player';
const playerEmail = 'test@example.com';
const playerPower = 'England';
console.log('Registering player:', playerName);
const registered = (0, lib_1.registerPlayer)(playerName, playerEmail, playerPower, gameId);
console.log('Player registration result:', registered);
// Link player email
console.log('Linking player email...');
const emailLinked = (0, lib_1.linkPlayerEmail)('new-email@example.com', playerEmail);
console.log('Email linking result:', emailLinked);
// Set player preferences
console.log('Setting player preferences...');
const prefsSet = (0, lib_1.setPlayerPreferences)(registered.playerId, {
    notifications: true,
    deadlineReminders: true,
    orderConfirmation: false
});
console.log('Preferences set result:', prefsSet);
// Set up game parameters
console.log('Setting up game parameters...');
(0, lib_1.setGameVariant)('standard', gameId);
console.log('Game variant set successfully');
(0, lib_1.setPressRules)('white', gameId);
console.log('Press rules set successfully');
// Get current game state
console.log('Getting game state...');
const state = (0, lib_1.getGameState)();
console.log('Current game state:', JSON.stringify(state, null, 2));
// Process text command
console.log('Processing text command...');
const textResult = (0, lib_1.processTextInput)('REGISTER New Player', 'new@example.com');
console.log('Text processing result:', textResult);
// Get outbound emails
console.log('Getting outbound emails...');
const emails = (0, lib_1.getOutboundEmails)();
console.log('Outbound emails:', emails);
// Test order validation
const testOrder = 'A PAR-BUR';
console.log('Validating order:', testOrder);
const isValid = (0, lib_1.validateOrder)(testOrder, 1);
console.log('Order validation result:', isValid);
// Test order processing
console.log('Processing orders...');
const result = (0, lib_1.processOrders)(gameId, 0, ['A LON-NTH', 'F EDI-NWG']);
console.log('Order processing result:', result);
