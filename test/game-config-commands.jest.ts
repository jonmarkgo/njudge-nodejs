import {
  initGame,
  setGameVariant,
  setPressRules,
  setDeadlines,
  setVictoryConditions,
  setGameAccess,
  processTextInput,
  getTextOutput,
  simulateInboundEmail,
  getOutboundEmails,
  createGame,
  listGames,
  getGameDetails,
  modifyGameSettings,
  setMaster,
  backupGame,
  restoreGame
} from '../lib';

describe('Game Configuration Commands', () => {
  beforeEach(() => {
    // Initialize a standard game for each test
    initGame('standard', 7);
  });

  describe('Game Variant Commands', () => {
    test('should set game variant to standard', () => {
      const result = setGameVariant('standard', 'testgame');
      expect(result).toBe(true);
    });

    test('should set game variant to machiavelli', () => {
      const result = setGameVariant('machiavelli', 'testgame');
      expect(result).toBe(true);
    });

    test.skip('should reject invalid game variant', () => {
      // @ts-ignore - Testing invalid input
      const result = setGameVariant('invalid-variant', 'testgame');
      expect(result).toBe(false);
    });
  });

  describe('Press Rule Commands', () => {
    test('should set press rules to none', () => {
      const result = setPressRules('none', 'testgame');
      expect(result).toBe(true);
    });

    test('should set press rules to white', () => {
      const result = setPressRules('white', 'testgame');
      expect(result).toBe(true);
    });

    test('should set press rules to grey', () => {
      const result = setPressRules('grey', 'testgame');
      expect(result).toBe(true);
    });

    test.skip('should reject invalid press rules', () => {
      // @ts-ignore - Testing invalid input
      const result = setPressRules('black', 'testgame');
      expect(result).toBe(false);
    });
  });

  describe('Deadline Commands', () => {
    test('should set deadlines', () => {
      // Set 24 hour deadline with 12 hour grace period
      const result = setDeadlines(24, 12, 'testgame');
      expect(result).toBe(true);
    });

    test('should set zero deadline for real-time games', () => {
      const result = setDeadlines(0, 0, 'testgame');
      expect(result).toBe(true);
    });

    test('should set long deadlines for slow games', () => {
      // 7 day deadline with 2 day grace period
      const result = setDeadlines(168, 48, 'testgame');
      expect(result).toBe(true);
    });

    test.skip('should reject negative deadlines', () => {
      const result = setDeadlines(-1, 0, 'testgame');
      expect(result).toBe(false);
    });
  });

  describe('Victory Condition Commands', () => {
    test('should set DIAS victory conditions', () => {
      const result = setVictoryConditions(true, 'testgame');
      expect(result).toBe(true);
    });

    test('should set non-DIAS victory conditions', () => {
      const result = setVictoryConditions(false, 'testgame');
      expect(result).toBe(true);
    });
  });

  describe('Game Access Commands', () => {
    test('should set game access parameters', () => {
      // Set dedication (0-5), on-time rating (0-5), and resistance rating (0-5)
      const result = setGameAccess(3, 4, 2, 'testgame');
      expect(result).toBe(true);
    });

    test.skip('should reject invalid dedication rating', () => {
      const result = setGameAccess(6, 3, 3, 'testgame');
      expect(result).toBe(false);
    });

    test.skip('should reject invalid on-time rating', () => {
      const result = setGameAccess(3, 6, 3, 'testgame');
      expect(result).toBe(false);
    });

    test.skip('should reject invalid resistance rating', () => {
      const result = setGameAccess(3, 3, 6, 'testgame');
      expect(result).toBe(false);
    });
  });

  describe('Game Administration Commands', () => {
    test.skip('should create a new game', () => {
      const result = createGame('testgame', 'Test game description');
      expect(result.success).toBe(true);
      expect(result.gameId).toBeDefined();
    });

    test.skip('should list available games', () => {
      const games = listGames();
      expect(Array.isArray(games)).toBe(true);
      // At least our test game should be there
      expect(games.length).toBeGreaterThan(0);
    });

    test.skip('should get game details', () => {
      const details = getGameDetails('testgame');
      expect(details).toBeDefined();
      expect(details.name).toBe('testgame');
    });

    test.skip('should modify game settings', () => {
      const result = modifyGameSettings('testgame', {
        variant: 'standard',
        press: 'white',
        deadline: 24,
        grace: 12
      });
      expect(result.success).toBe(true);
    });

    test.skip('should set game master', () => {
      const result = setMaster('testgame', 'master@example.com');
      expect(result.success).toBe(true);
    });

    test.skip('should backup and restore a game', () => {
      // First backup the game
      const backupResult = backupGame('testgame', 'backup-testgame.json');
      expect(backupResult.success).toBe(true);
      expect(backupResult.file).toBeDefined();
      
      // Then restore from the backup
      const restoreResult = restoreGame('backup-testgame.json');
      expect(restoreResult.success).toBe(true);
      expect(restoreResult.gameId).toBeDefined();
    });
  });
});