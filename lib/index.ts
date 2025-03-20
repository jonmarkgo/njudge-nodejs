import { join } from 'path';

interface Player {
  power: string;
  status: number;
  units: number;
  centers: number;
}

interface GameState {
  phase: string;
  year: number;
  season: string;
  players: Player[];
}

interface OrderResult {
  success: boolean;
  errors: number;
}

interface PlayerRegistration {
  name: string;
  email: string;
  level: string;
  address: string;
  country: string;
  phone?: string;
  site?: string;
}

interface OutboundEmail {
  to: string;
  from: string;
  subject: string;
  body: string;
}

interface PlayerPreferences {
  notifications: boolean;
  deadlineReminders: boolean;
  orderConfirmation: boolean;
}

interface GameDetails {
  id: string;
  name: string;
  variant: string;
  phase: string;
  press: string;
  deadline: string;
  graceTime: string;
  victoryConditions: string;
  startTime: string;
  players: number;
  year: number;
  started: boolean;
  playerList: {
    power: string;
    status: string;
    player: string;
  }[];
}

type GameVariant = 'standard' | 'machiavelli';
type PressType = 'none' | 'white' | 'grey';

interface DiplomacyGame {
  initGame(variant: string, playerCount: number): boolean;
  getGameState(): {
    phase: string;
    season: string;
    year: number;
    players: {
      power: string;
      status: number;
      units: number;
      centers: number;
    }[];
  };
  validateOrder(order: string, playerId: number): boolean;
  processOrders(gameId: string, playerId: number, orders: string[] | string): number;
  setGameVariant(variant: string, gameId: string): boolean;
  setPressRules(pressType: string, gameId: string): boolean;
  setDeadlines(deadline: number, grace: number, gameId: string): boolean;
  setVictoryConditions(dias: boolean, gameId: string): boolean;
  setGameAccess(dedication: number, onTimeRating: number, resistanceRating: number, gameId: string): boolean;

  // New player interaction functions
  registerPlayer(name: string, email: string, power: string, gameId: string): {
    success: boolean;
    playerId: number;
  };
  getPlayerStatus(playerId: number, gameId: string): {
    power: string;
    status: string;
    units: number;
    centers: number;
  };
  sendPress(sender: number, recipient: number | string, message: string, gameId: string): {
    success: boolean;
  };
  voteForDraw(playerId: number, vote: boolean, gameId: string): {
    success: boolean;
  };
  submitOrders(playerId: number, orders: string, gameId: string): {
    success: boolean;
    ordersAccepted: boolean;
  };

  // New game administration functions
  createGame(name: string, description: string, variant?: string): {
    success: boolean;
    gameId: string;
  };
  listGames(): {
    id: string;
    name: string;
    phase: string;
    players: number;
  }[];
  getGameDetails(gameId: string): GameDetails;
  modifyGameSettings(gameId: string, settings: Record<string, any>): {
    success: boolean;
  };
  setMaster(gameId: string, masterId: string): {
    success: boolean;
  };
  backupGame(gameId: string): {
    success: boolean;
    backupId: string;
  };
  restoreGame(backupId: string): {
    success: boolean;
    gameId: string;
  };
  
  // Player account management functions
  linkPlayerEmail(newEmail: string, existingEmail: string): boolean;
  setPlayerPreferences(playerId: number, preferences: PlayerPreferences): boolean;
  
  // Email and text processing functions
  processTextInput(text: string, fromEmail: string): boolean;
  getTextOutput(playerId: number): string;
  simulateInboundEmail(subject: string, body: string, fromEmail: string): boolean;
  getOutboundEmails(): OutboundEmail[];
  
  // Advanced diplomacy features
  processConditionalOrders(playerId: number, orders: string): boolean;
  extendedPressRules(gameId: string, ruleType: string, value: boolean): boolean;
}

// Attempt to load the native addon
let binding: DiplomacyGame;
try {
  binding = require('../build/Release/dip_binding');
} catch (e) {
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
    } as GameDetails),
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
export const initGame = binding.initGame;
export const getGameState = binding.getGameState;
export const validateOrder = binding.validateOrder;
export const processOrders = binding.processOrders;
export const setGameVariant = binding.setGameVariant;
export const setPressRules = binding.setPressRules;
export const setDeadlines = binding.setDeadlines;
export const setVictoryConditions = binding.setVictoryConditions;
export const setGameAccess = binding.setGameAccess;

export const registerPlayer = binding.registerPlayer;
export const getPlayerStatus = binding.getPlayerStatus;
export const sendPress = binding.sendPress;
export const voteForDraw = binding.voteForDraw;
export const submitOrders = binding.submitOrders;

export const createGame = binding.createGame;
export const listGames = binding.listGames;
export const getGameDetails = binding.getGameDetails;
export const modifyGameSettings = binding.modifyGameSettings;
export const setMaster = binding.setMaster;
export const backupGame = binding.backupGame;
export const restoreGame = binding.restoreGame;

// Export the new functions
export const linkPlayerEmail = binding.linkPlayerEmail;
export const setPlayerPreferences = binding.setPlayerPreferences;
export const processTextInput = binding.processTextInput;
export const getTextOutput = binding.getTextOutput;
export const simulateInboundEmail = binding.simulateInboundEmail;
export const getOutboundEmails = binding.getOutboundEmails;
export const processConditionalOrders = binding.processConditionalOrders;
export const extendedPressRules = binding.extendedPressRules;

// Export types
export type { Player, GameState, OutboundEmail, PlayerPreferences, GameDetails };

// Export the DiplomacyAddon interface for TypeScript users
export interface DiplomacyAddon {
  initGame(variant: GameVariant, numPlayers: number): void;
  processOrders(gameId: string, playerId: number, orders: string[] | string): number;
  validateOrder(order: string, playerId: number): boolean;
  getGameState(): GameState;
  registerPlayer(name: string, email: string, power: string, gameId: string): {
    success: boolean;
    playerId: number;
  };
  getPlayerStatus(playerId: number, gameId: string): {
    power: string;
    status: string;
    units: number;
    centers: number;
  };
  sendPress(sender: number, recipient: number | string, message: string, gameId: string): {
    success: boolean;
  };
  voteForDraw(playerId: number, vote: boolean, gameId: string): {
    success: boolean;
  };
  submitOrders(playerId: number, orders: string, gameId: string): {
    success: boolean;
    ordersAccepted: boolean;
  };
  linkPlayerEmail(newEmail: string, existingEmail: string): boolean;
  setPlayerPreferences(playerId: number, preferences: PlayerPreferences): boolean;
  setGameVariant(variant: GameVariant, gameId: string): boolean;
  setPressRules(pressType: PressType, gameId: string): boolean;
  setDeadlines(deadline: number, grace: number, gameId: string): boolean;
  setVictoryConditions(dias: boolean, gameId: string): boolean;
  setGameAccess(dedication: number, ontime: number, resrat: number, gameId: string): boolean;
  processTextInput(text: string, fromEmail: string): boolean;
  getTextOutput(playerId: number): string;
  simulateInboundEmail(subject: string, body: string, fromEmail: string): boolean;
  getOutboundEmails(): OutboundEmail[];
  processConditionalOrders(playerId: number, orders: string): boolean;
  extendedPressRules(gameId: string, ruleType: string, value: boolean): boolean;
}