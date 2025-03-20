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

interface DiplomacyAddon {
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

// Load the native addon
const addon = require(join(__dirname, '../build/Release/dip.node')) as DiplomacyAddon;

// Export wrapped functions with TypeScript types
export const {
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
  // Text I/O functions
  processTextInput,
  getTextOutput,
  simulateInboundEmail,
  getOutboundEmails
} = addon;

// Re-export types and interfaces
export type {
  GameVariant,
  PressType
};

export type {
  Player,
  GameState,
  OrderResult,
  PlayerRegistration,
  OutboundEmail,
  DiplomacyAddon
};