import { describe, test, expect, beforeAll } from '@jest/globals';
import {
  initGame,
  processTextInput,
  getOutboundEmails,
  registerPlayer,
  linkPlayerEmail,
  setPlayerPreferences
} from '../lib';

describe('Player Registration and Preferences', () => {
  beforeAll(() => {
    // Initialize a standard game for all tests
    initGame('standard', 7);
  });

  describe('Player Registration API', () => {
    test('should register new player', () => {
      const result = registerPlayer('Player1', 'player@example.com', 'England', 'test-game');
      expect(result.success).toBe(true);
      expect(result.playerId).toBeDefined();
    });

    test('should link player email through API', () => {
      const result = linkPlayerEmail('new-email@example.com', 'player@example.com');
      expect(result).toBe(true);
    });
  });

  describe('Registration Commands', () => {
    test('should process REGISTER command', () => {
      const result = processTextInput('REGISTER John Doe', 'new@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('REGISTER');
    });

    test.skip('should process UNREGISTER command', () => {
      // Skipped until implemented
    });
  });

  describe('Player Preferences', () => {
    test.skip('should process SET PASSWORD command', () => {
      // Skipped until implemented
    });

    test.skip('should process SET ADDRESS command', () => {
      // Skipped until implemented
    });

    test.skip('should process SET EMAIL command', () => {
      // Skipped until implemented
    });

    test.skip('should process SET PHONE command', () => {
      // Skipped until implemented
    });

    test.skip('should process SET LEVEL command', () => {
      // Skipped until implemented
    });

    test.skip('should process SET VACATION command', () => {
      // Skipped until implemented
    });

    test('should set player notification preferences', () => {
      // First register a player to get a valid ID
      const registration = registerPlayer('PrefsTest', 'prefs@example.com', 'France', 'test-game');
      expect(registration.success).toBe(true);
      
      // Set preferences for the registered player
      const result = setPlayerPreferences(registration.playerId, { 
        notifications: true, 
        deadlineReminders: true, 
        orderConfirmation: true 
      });
      expect(result).toBe(true);
    });
  });

  describe('Power Preferences', () => {
    test.skip('should process SET PREFERENCE command for power rankings', () => {
      // Skipped until implemented
    });

    test.skip('should process SET NO PREFERENCE command', () => {
      // Skipped until implemented
    });
  });
});