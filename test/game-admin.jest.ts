import { describe, test, expect } from '@jest/globals';
import {
  createGame,
  listGames,
  getGameDetails,
  modifyGameSettings,
  setMaster,
  backupGame,
  restoreGame,
  processOrders
} from '../lib';

// Type definitions for mock functions
interface GameResult {
  success: boolean;
  gameId: string;
}

interface GameDetails {
  id: string;
  variant: string;
  phase: string;
  year: number;
  players: number;
  started: boolean;
}

interface GameSummary {
  id: string;
  name: string;
  started: boolean;
}

interface SettingsResult {
  success: boolean;
}

interface BackupResult {
  success: boolean;
  backupId: string;
}

// Enable the test suite since we've implemented the required functions
describe('Game Administration', () => {
  test('should create a new game', () => {
    const result = createGame('standard', 'Test Game', '7');
    expect(result.success).toBe(true);
    expect(result.gameId).toBeDefined();
  });

  test('should list available games', () => {
    // Create a couple of games first
    createGame('standard', 'Test Game 1', '7');
    createGame('standard', 'Test Game 2', '7');
    
    const games = listGames();
    expect(games.length).toBeGreaterThan(1);
    expect(games[0].id).toBeDefined();
    expect(games[0].name).toBeDefined();
  });

  test('should get detailed information about a game', () => {
    const newGame = createGame('standard', 'Detail Test', '7');
    
    const details = getGameDetails(newGame.gameId);
    expect(details.id).toBe(newGame.gameId);
    expect(details.variant).toBe('standard');
    expect(details.players).toBe(7);
    expect(details.started).toBe(false);
  });

  test('should modify game settings', () => {
    const newGame = createGame('standard', 'Settings Test', '7');
    
    const result = modifyGameSettings(newGame.gameId, {
      name: 'Updated Game Name',
      turnTimeLimit: 24,
      maxPlayers: 5
    });
    
    expect(result.success).toBe(true);
    
    const details = getGameDetails(newGame.gameId);
    expect(details.id).toBe(newGame.gameId);
    // Settings would be updated in the details
  });

  test('should set a game master', () => {
    const newGame = createGame('standard', 'Master Test', '7');
    
    const result = setMaster(newGame.gameId, 'master@example.com');
    expect(result.success).toBe(true);
  });

  test('should backup a game', () => {
    const newGame = createGame('standard', 'Backup Test', '7');
    
    const result = backupGame(newGame.gameId);
    expect(result.success).toBe(true);
    expect(result.backupId).toBeDefined();
  });

  test('should restore a game from backup', () => {
    const newGame = createGame('standard', 'Restore Test', '7');
    const backup = backupGame(newGame.gameId);
    
    // Modify the game state
    processOrders(newGame.gameId, 0, [
      'A PAR-BUR'
    ]);
    
    const result = restoreGame(backup.backupId);
    expect(result.success).toBe(true);
    
    // Game should be back to initial state
    const details = getGameDetails(newGame.gameId);
    expect(details.phase).toBe('Spring');
    expect(details.year).toBe(1901);
  });
}); 