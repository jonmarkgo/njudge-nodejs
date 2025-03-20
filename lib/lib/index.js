"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutboundEmails = exports.simulateInboundEmail = exports.getTextOutput = exports.processTextInput = exports.setGameAccess = exports.setVictoryConditions = exports.setDeadlines = exports.setPressRules = exports.setGameVariant = exports.linkPlayerEmail = exports.registerPlayer = exports.getGameState = exports.validateOrder = exports.processOrders = exports.initGame = void 0;
const path_1 = require("path");
// Load the native addon
const addon = require((0, path_1.join)(__dirname, '../build/Release/dip.node'));
// Export wrapped functions with TypeScript types
exports.initGame = addon.initGame, exports.processOrders = addon.processOrders, exports.validateOrder = addon.validateOrder, exports.getGameState = addon.getGameState, exports.registerPlayer = addon.registerPlayer, exports.linkPlayerEmail = addon.linkPlayerEmail, exports.setGameVariant = addon.setGameVariant, exports.setPressRules = addon.setPressRules, exports.setDeadlines = addon.setDeadlines, exports.setVictoryConditions = addon.setVictoryConditions, exports.setGameAccess = addon.setGameAccess, 
// Text I/O functions
exports.processTextInput = addon.processTextInput, exports.getTextOutput = addon.getTextOutput, exports.simulateInboundEmail = addon.simulateInboundEmail, exports.getOutboundEmails = addon.getOutboundEmails;
