"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreGame = exports.backupGame = exports.setMaster = exports.modifyGameSettings = exports.getGameDetails = exports.listGames = exports.createGame = exports.submitOrders = exports.voteForDraw = exports.sendPress = exports.getPlayerStatus = exports.getOutboundEmails = exports.simulateInboundEmail = exports.getTextOutput = exports.processTextInput = exports.setGameAccess = exports.setVictoryConditions = exports.setDeadlines = exports.setPressRules = exports.setGameVariant = exports.linkPlayerEmail = exports.registerPlayer = exports.getGameState = exports.validateOrder = exports.processOrders = exports.initGame = void 0;
const path_1 = require("path");
// Load the native addon
let addon;
try {
    addon = require((0, path_1.join)(__dirname, '../build/Release/dip.node'));
}
catch (e) {
    // If the original module isn't available, we'll use just the new binding
    addon = {};
}
// Import the new binding module
const binding = require('../build/Release/dip_binding.node');
// Merge the exports from both native modules
_a = { ...addon, ...binding }, 
// Export everything from our new binding
exports.initGame = _a.initGame, exports.processOrders = _a.processOrders, exports.validateOrder = _a.validateOrder, exports.getGameState = _a.getGameState, exports.registerPlayer = _a.registerPlayer, exports.linkPlayerEmail = _a.linkPlayerEmail, exports.setGameVariant = _a.setGameVariant, exports.setPressRules = _a.setPressRules, exports.setDeadlines = _a.setDeadlines, exports.setVictoryConditions = _a.setVictoryConditions, exports.setGameAccess = _a.setGameAccess, exports.processTextInput = _a.processTextInput, exports.getTextOutput = _a.getTextOutput, exports.simulateInboundEmail = _a.simulateInboundEmail, exports.getOutboundEmails = _a.getOutboundEmails, 
// New player interaction functions
exports.getPlayerStatus = _a.getPlayerStatus, exports.sendPress = _a.sendPress, exports.voteForDraw = _a.voteForDraw, exports.submitOrders = _a.submitOrders, 
// New game administration functions
exports.createGame = _a.createGame, exports.listGames = _a.listGames, exports.getGameDetails = _a.getGameDetails, exports.modifyGameSettings = _a.modifyGameSettings, exports.setMaster = _a.setMaster, exports.backupGame = _a.backupGame, exports.restoreGame = _a.restoreGame;
