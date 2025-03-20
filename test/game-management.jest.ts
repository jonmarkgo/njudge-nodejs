import { describe, test, expect } from '@jest/globals';
import {
  initGame,
  getGameState,
  setGameVariant,
  setPressRules,
  setDeadlines,
  setVictoryConditions,
  setGameAccess,
  processOrders
} from '../lib';

describe('Diplomacy Game Engine', () => {
  // Basic functionality tests (formerly in example.jest.ts)
  describe('Basic Game Functionality', () => {
    test('should retrieve empty initial game state', () => {
      // Get initial state before initialization
      const initialState = getGameState();
      
      expect(initialState).toBeDefined();
      expect(initialState.phase).toBe('');
      expect(initialState.season).toBe('Unknown');
      expect(initialState.year).toBe(1901);
      expect(initialState.players).toEqual([]);
    });

    test('should initialize a standard game with 7 players', () => {
      // Initialize the game
      initGame('standard', 7);
      
      // Get state after initialization
      const state = getGameState();
      
      expect(state).toBeDefined();
      expect(state.phase).toBe('');
      expect(state.season).toBe('Unknown');
      expect(state.year).toBe(1901);
      expect(state.players).toHaveLength(7);
      
      // Verify all players are initially unowned with no units/centers
      state.players.forEach(player => {
        expect(player.power).toBe('Unowned');
        expect(player.status).toBe(0);
        expect(player.units).toBe(0);
        expect(player.centers).toBe(0);
      });
    });
  });

  // Game management tests (converted from game-management-tests.ts)
  describe('Game Management', () => {
    // Define game ID for this test session
    const gameId = `test-game-${Date.now()}`;

    describe('Game Initialization with different variants', () => {
      test('should initialize standard game with different player counts', () => {
        // Test standard game with 5 players
        initGame('standard', 5);
        let state = getGameState();
        expect(state.players).toHaveLength(5);
        
        // Reset to 7 players for remaining tests
        initGame('standard', 7);
        state = getGameState();
        expect(state.players).toHaveLength(7);
      });
    });

    describe('Game Configuration', () => {
      test('should set game variant', () => {
        const variantSet = setGameVariant('standard', gameId);
        expect(variantSet).toBe(true);
      });

      test('should set press rules', () => {
        const pressSet = setPressRules('grey', gameId);
        expect(pressSet).toBe(true);
      });

      test('should set deadlines', () => {
        const deadlinesSet = setDeadlines(24, 12, gameId);
        expect(deadlinesSet).toBe(true);
      });

      test('should set victory conditions', () => {
        const victorySet = setVictoryConditions(true, gameId);
        expect(victorySet).toBe(true);
      });

      test('should set game access parameters', () => {
        const accessSet = setGameAccess(1, 1, 2, gameId);
        expect(accessSet).toBe(true);
      });
    });

    describe('Game State Reporting', () => {
      test('should report game state correctly', () => {
        const state = getGameState();
        
        // Check basic state properties
        expect(state).toBeDefined();
        expect(state.phase).toBeDefined();
        expect(state.season).toBeDefined();
        expect(state.year).toBeDefined();
        expect(state.players).toBeDefined();
        expect(Array.isArray(state.players)).toBe(true);
        
        // Since we initialized with 7 players
        expect(state.players.length).toBe(7);
        
        // Check player properties
        state.players.forEach(player => {
          expect(player).toHaveProperty('power');
          expect(player).toHaveProperty('status');
          expect(player).toHaveProperty('units');
          expect(player).toHaveProperty('centers');
        });
      });
    });

    // NOTICE: The following sections are commented out as they were also commented out in the original file
    // Phase Progression tests are not converted since they were marked as DISABLED in the original file
    
    /*
    describe('Game Phase Progression', () => {
      // This would be implemented if po_init symbol becomes available
      test('should process orders and advance game phase', () => {
        // Test implementation would go here
      });
    });
    */

    // Player Registration tests are not converted since they were marked as SIMULATION ONLY in the original file
    
    /*
    describe('Player Registration', () => {
      // This would be implemented once segfault issues are resolved
      test('should register players successfully', () => {
        // Test implementation would go here
      });
    });
    */
  });
}); 