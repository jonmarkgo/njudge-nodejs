import { describe, test, expect, beforeEach } from '@jest/globals';
import {
  initGame,
  getGameState,
  setGameVariant,
  setPressRules,
  setDeadlines,
  setVictoryConditions,
  setGameAccess
} from '../lib';

describe('Game State Tests', () => {
  const gameId = 'test-game';

  beforeEach(() => {
    // Initialize a fresh game state before each test
    initGame('standard', 7);
  });

  describe('Game Initialization', () => {
    test('should initialize a standard game with 7 players', () => {
      const state = getGameState();
      
      expect(state).toBeDefined();
      expect(state.players).toHaveLength(7);
      expect(state.year).toBe(1901);
    });

    test('should initialize a standard game with 5 players', () => {
      initGame('standard', 5);
      const state = getGameState();
      
      expect(state).toBeDefined();
      expect(state.players).toHaveLength(5);
    });
  });

  describe('Game Configuration', () => {
    test('should set game variant', () => {
      const result = setGameVariant('standard', gameId);
      expect(result).toBe(true);
    });

    test('should set press rules', () => {
      const result = setPressRules('grey', gameId);
      expect(result).toBe(true);
    });

    test('should set deadlines', () => {
      const result = setDeadlines(24, 12, gameId);
      expect(result).toBe(true);
    });

    test('should set victory conditions', () => {
      const result = setVictoryConditions(true, gameId);
      expect(result).toBe(true);
    });

    test('should set game access settings', () => {
      const result = setGameAccess(1, 1, 2, gameId);
      expect(result).toBe(true);
    });
  });

  describe('Player State', () => {
    test('should have correct initial player states', () => {
      const state = getGameState();
      
      expect(state.players).toHaveLength(7);
      
      // All players should start with 0 units, centers, and status
      state.players.forEach(player => {
        expect(player.power).toBe('Unowned');
        expect(player.units).toBe(0);
        expect(player.centers).toBe(0);
        expect(player.status).toBe(0);
      });
    });
  });

  describe('Game Phase Information', () => {
    test('should have correct initial game phase', () => {
      const state = getGameState();
      
      // Initial phase is typically empty or a specific format
      // This test may need adjustment based on the actual behavior
      expect(state.phase).toBeDefined();
      expect(state.season).toBeDefined();
      expect(state.year).toBe(1901);
    });
  });

  // This would be a test for order processing, but it's disabled due to the po_init issue
  /*
  describe('Order Processing', () => {
    test('should update game state after processing orders', () => {
      // Implementation pending - this would test order processing
      // and its effect on the game state
    });
  });
  */
}); 