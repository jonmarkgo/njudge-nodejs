"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedPressRules = exports.processConditionalOrders = exports.getOutboundEmails = exports.simulateInboundEmail = exports.getTextOutput = exports.processTextInput = exports.setPlayerPreferences = exports.linkPlayerEmail = exports.restoreGame = exports.backupGame = exports.setMaster = exports.modifyGameSettings = exports.getGameDetails = exports.listGames = exports.createGame = exports.submitOrders = exports.voteForDraw = exports.sendPress = exports.getPlayerStatus = exports.registerPlayer = exports.setGameAccess = exports.setVictoryConditions = exports.setDeadlines = exports.setPressRules = exports.setGameVariant = exports.processOrders = exports.validateOrder = exports.getGameState = exports.initGame = void 0;
// Attempt to load the native addon
let binding;
try {
    binding = require('../build/Release/dip_binding');
}
catch (e) {
    console.error('Failed to load diplomacy native binding:', e);
    // Provide a dummy implementation to prevent crashes during development
    binding = {
        initGame: () => false,
        getGameState: () => ({ phase: '', season: '', year: 0, players: [] }),
        validateOrder: () => false,
        processOrders: () => 0,
        setGameVariant: () => false,
        setPressRules: () => false,
        setDeadlines: () => false,
        setVictoryConditions: () => false,
        setGameAccess: () => false,
        registerPlayer: () => ({ success: false, playerId: 0 }),
        getPlayerStatus: () => ({ power: '', status: '', units: 0, centers: 0 }),
        sendPress: () => ({ success: false }),
        voteForDraw: () => ({ success: false }),
        submitOrders: () => ({ success: false, ordersAccepted: false }),
        createGame: () => ({ success: false, gameId: '' }),
        listGames: () => [],
        getGameDetails: () => ({
            id: '',
            name: '',
            variant: '',
            phase: '',
            press: '',
            deadline: '',
            graceTime: '',
            victoryConditions: '',
            startTime: '',
            players: 0,
            year: 1901,
            started: false,
            playerList: []
        }),
        modifyGameSettings: () => ({ success: false }),
        setMaster: () => ({ success: false }),
        backupGame: () => ({ success: false, backupId: '' }),
        restoreGame: () => ({ success: false, gameId: '' }),
        linkPlayerEmail: () => false,
        setPlayerPreferences: () => false,
        processTextInput: () => false,
        getTextOutput: () => '',
        simulateInboundEmail: () => false,
        getOutboundEmails: () => [],
        processConditionalOrders: () => false,
        extendedPressRules: () => false
    };
}
// Export all functions from the binding
exports.initGame = binding.initGame;
exports.getGameState = binding.getGameState;
exports.validateOrder = binding.validateOrder;
exports.processOrders = binding.processOrders;
exports.setGameVariant = binding.setGameVariant;
exports.setPressRules = binding.setPressRules;
exports.setDeadlines = binding.setDeadlines;
exports.setVictoryConditions = binding.setVictoryConditions;
exports.setGameAccess = binding.setGameAccess;
exports.registerPlayer = binding.registerPlayer;
exports.getPlayerStatus = binding.getPlayerStatus;
exports.sendPress = binding.sendPress;
exports.voteForDraw = binding.voteForDraw;
exports.submitOrders = binding.submitOrders;
exports.createGame = binding.createGame;
exports.listGames = binding.listGames;
exports.getGameDetails = binding.getGameDetails;
exports.modifyGameSettings = binding.modifyGameSettings;
exports.setMaster = binding.setMaster;
exports.backupGame = binding.backupGame;
exports.restoreGame = binding.restoreGame;
// Export the new functions
exports.linkPlayerEmail = binding.linkPlayerEmail;
exports.setPlayerPreferences = binding.setPlayerPreferences;
exports.processTextInput = binding.processTextInput;
exports.getTextOutput = binding.getTextOutput;
exports.simulateInboundEmail = binding.simulateInboundEmail;
exports.getOutboundEmails = binding.getOutboundEmails;
exports.processConditionalOrders = binding.processConditionalOrders;
exports.extendedPressRules = binding.extendedPressRules;
