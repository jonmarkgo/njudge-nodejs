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
    processTextInput(text: string, fromEmail: string): boolean;
    getTextOutput(playerId: number): string;
    simulateInboundEmail(subject: string, body: string, fromEmail: string): boolean;
    getOutboundEmails(): OutboundEmail[];
}
export declare const initGame: (variant: GameVariant, numPlayers: number) => void, processOrders: (orders: string, playerId: number) => number, validateOrder: (order: string, playerId: number) => boolean, getGameState: () => GameState, registerPlayer: (player: PlayerRegistration) => boolean, linkPlayerEmail: (newEmail: string, existingEmail: string) => boolean, setGameVariant: (variant: GameVariant, gameId: string) => boolean, setPressRules: (pressType: PressType, gameId: string) => boolean, setDeadlines: (deadline: number, grace: number, gameId: string) => boolean, setVictoryConditions: (dias: boolean, gameId: string) => boolean, setGameAccess: (dedication: number, ontime: number, resrat: number, gameId: string) => boolean, processTextInput: (text: string, fromEmail: string) => boolean, getTextOutput: (playerId: number) => string, simulateInboundEmail: (subject: string, body: string, fromEmail: string) => boolean, getOutboundEmails: () => OutboundEmail[];
export type { GameVariant, PressType };
export type { Player, GameState, OrderResult, PlayerRegistration, OutboundEmail, DiplomacyAddon };
