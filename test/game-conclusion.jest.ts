import { describe, test, expect, beforeAll } from '@jest/globals';
import {
  initGame,
  processTextInput,
  getOutboundEmails,
  voteForDraw,
  setVictoryConditions
} from '../lib';

describe('Game Conclusion Mechanisms', () => {
  beforeAll(() => {
    // Initialize a standard game for all tests
    initGame('standard', 7);
  });

  describe('Draw Voting', () => {
    test('should set victory conditions through API', () => {
      // Test setting DIAS to true
      let result = setVictoryConditions(true, 'test-game');
      expect(result).toBe(true);
      
      // Test setting DIAS to false (NoDIAS)
      result = setVictoryConditions(false, 'test-game');
      expect(result).toBe(true);
    });

    test('should process a vote for draw through API', () => {
      // This uses the voteForDraw function directly
      const result = voteForDraw(1, true, 'test-game');
      expect(result).toBeDefined();
      expect(result).toHaveProperty('success');
    });

    test.skip('should process SET DRAW YES command', () => {
      const result = processTextInput('SET DRAW YES', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('DRAW');
    });

    test.skip('should process SET DRAW NO command', () => {
      const result = processTextInput('SET DRAW NO', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('DRAW');
    });

    test.skip('should process DRAW PROPOSED command', () => {
      // This is a master command to propose a draw to all players
      const result = processTextInput('DRAW PROPOSED', 'master@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('DRAW');
    });
  });

  describe('Concession Handling', () => {
    test.skip('should process SET CONCEDE command', () => {
      const result = processTextInput('SET CONCEDE ITALY', 'france@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('CONCEDE');
    });

    test.skip('should process UNSET CONCEDE command', () => {
      const result = processTextInput('UNSET CONCEDE ITALY', 'france@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('CONCEDE');
    });

    test.skip('should process concession vote counting', () => {
      // First set a concession by one player
      let result = processTextInput('SET CONCEDE ITALY', 'france@example.com');
      expect(result).toBe(true);
      
      // Then by another
      result = processTextInput('SET CONCEDE ITALY', 'germany@example.com');
      expect(result).toBe(true);
      
      // Check that the votes are counted and processed
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      
      // The last email might contain information about the concession status
      const lastEmail = emails[emails.length - 1];
      expect(lastEmail.body).toContain('CONCEDE');
      expect(lastEmail.body).toContain('ITALY');
    });
  });
});