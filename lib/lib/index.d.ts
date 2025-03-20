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
export declare const initGame: (variant: string, playerCount: number) => boolean;
export declare const getGameState: () => {
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
export declare const validateOrder: (order: string, playerId: number) => boolean;
export declare const processOrders: (gameId: string, playerId: number, orders: string[] | string) => number;
export declare const setGameVariant: (variant: string, gameId: string) => boolean;
export declare const setPressRules: (pressType: string, gameId: string) => boolean;
export declare const setDeadlines: (deadline: number, grace: number, gameId: string) => boolean;
export declare const setVictoryConditions: (dias: boolean, gameId: string) => boolean;
export declare const setGameAccess: (dedication: number, onTimeRating: number, resistanceRating: number, gameId: string) => boolean;
export declare const registerPlayer: (name: string, email: string, power: string, gameId: string) => {
    success: boolean;
    playerId: number;
};
export declare const getPlayerStatus: (playerId: number, gameId: string) => {
    power: string;
    status: string;
    units: number;
    centers: number;
};
export declare const sendPress: (sender: number, recipient: number | string, message: string, gameId: string) => {
    success: boolean;
};
export declare const voteForDraw: (playerId: number, vote: boolean, gameId: string) => {
    success: boolean;
};
export declare const submitOrders: (playerId: number, orders: string, gameId: string) => {
    success: boolean;
    ordersAccepted: boolean;
};
export declare const createGame: (name: string, description: string, variant?: string) => {
    success: boolean;
    gameId: string;
};
export declare const listGames: () => {
    id: string;
    name: string;
    phase: string;
    players: number;
}[];
export declare const getGameDetails: (gameId: string) => GameDetails;
export declare const modifyGameSettings: (gameId: string, settings: Record<string, any>) => {
    success: boolean;
};
export declare const setMaster: (gameId: string, masterId: string) => {
    success: boolean;
};
export declare const backupGame: (gameId: string) => {
    success: boolean;
    backupId: string;
};
export declare const restoreGame: (backupId: string) => {
    success: boolean;
    gameId: string;
};
export declare const linkPlayerEmail: (newEmail: string, existingEmail: string) => boolean;
export declare const setPlayerPreferences: (playerId: number, preferences: PlayerPreferences) => boolean;
export declare const processTextInput: (text: string, fromEmail: string) => boolean;
export declare const getTextOutput: (playerId: number) => string;
export declare const simulateInboundEmail: (subject: string, body: string, fromEmail: string) => boolean;
export declare const getOutboundEmails: () => OutboundEmail[];
export declare const processConditionalOrders: (playerId: number, orders: string) => boolean;
export declare const extendedPressRules: (gameId: string, ruleType: string, value: boolean) => boolean;
export type { Player, GameState, OutboundEmail, PlayerPreferences, GameDetails };
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
