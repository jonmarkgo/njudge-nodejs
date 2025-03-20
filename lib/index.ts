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
  subject: string;
  body: string;
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
  processOrders(orders: string, playerId: number): number;
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
  getGameDetails(gameId: string): {
    id: string;
    name: string;
    variant: string;
    phase: string;
    press: string;
    deadline: string;
    graceTime: string;
    victoryConditions: string;
    startTime: string;
    players: {
      power: string;
      status: string;
      player: string;
    }[];
  };
  modifyGameSettings(gameId: string, settings: Record<string, any>): {
    success: boolean;
  };
  setMaster(gameId: string, masterId: string): {
    success: boolean;
  };
  backupGame(gameId: string, filename: string): {
    success: boolean;
    file: string;
  };
  restoreGame(filename: string): {
    success: boolean;
    gameId: string;
  };
}

// Load the native addon
let addon: DiplomacyAddon;
try {
  addon = require(join(__dirname, '../build/Release/dip.node'));
} catch (e) {
  // If the original module isn't available, we'll use just the new binding
  addon = {} as DiplomacyAddon;
}

// Import the new binding module
const binding = require('../build/Release/dip_binding.node');

// Merge the exports from both native modules
export const {
  // Export everything from our new binding
  initGame,
  processOrders,
  validateOrder,
  getGameState,
  registerPlayer,
  linkPlayerEmail,
  setGameVariant,
  setPressRules,
  setDeadlines,
  setVictoryConditions,
  setGameAccess,
  processTextInput,
  getTextOutput,
  simulateInboundEmail,
  getOutboundEmails,
  // New player interaction functions
  getPlayerStatus,
  sendPress,
  voteForDraw,
  submitOrders,
  // New game administration functions
  createGame,
  listGames,
  getGameDetails,
  modifyGameSettings,
  setMaster,
  backupGame,
  restoreGame
} = { ...addon, ...binding };

// Re-export types and interfaces
export type {
  GameVariant,
  PressType
};

export interface DiplomacyAddon {
  initGame(variant: GameVariant, numPlayers: number): void;
  processOrders(orders: string, playerId: number): number;
  validateOrder(order: string, playerId: number): boolean;
  getGameState(): GameState;
  registerPlayer(player: PlayerRegistration): boolean;
  linkPlayerEmail(newEmail: string, existingEmail: string): boolean;
  setGameVariant(variant: GameVariant, gameId: string): boolean;
  setPressRules(pressType: PressType, gameId: string): boolean;
  setDeadlines(deadline: number, grace: number, gameId: string): boolean;
  setVictoryConditions(dias: boolean, gameId: string): boolean;
  setGameAccess(dedication: number, ontime: number, resrat: number, gameId: string): boolean;
  // Text I/O functions
  processTextInput(text: string, fromEmail: string): boolean;
  getTextOutput(playerId: number): string;
  simulateInboundEmail(subject: string, body: string, fromEmail: string): boolean;
  getOutboundEmails(): OutboundEmail[];
}

export type {
  Player,
  GameState,
  OrderResult,
  PlayerRegistration,
  OutboundEmail
};