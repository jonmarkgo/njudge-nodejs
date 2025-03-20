import { describe, test, expect, beforeAll } from '@jest/globals';
import {
  initGame,
  processTextInput,
  getOutboundEmails,
  setDeadlines,
  getGameState
} from '../lib';

describe('Deadline Management Commands', () => {
  beforeAll(() => {
    // Initialize a standard game for all tests
    initGame('standard', 7);
  });

  describe('Absence Management', () => {
    test.skip('should process SET ABSENCE command', () => {
      const result = processTextInput('SET ABSENCE', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ABSENCE');
    });

    test.skip('should process UNSET ABSENCE command', () => {
      const result = processTextInput('UNSET ABSENCE', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ABSENCE');
    });

    test.skip('should process ABSENCE command with specific dates', () => {
      const result = processTextInput('SET ABSENCE 2025-04-01 2025-04-07', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ABSENCE');
      expect(emails[0].body).toContain('2025-04-01');
      expect(emails[0].body).toContain('2025-04-07');
    });
  });

  describe('Wait Management', () => {
    test.skip('should process SET WAIT command', () => {
      const result = processTextInput('SET WAIT', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('WAIT');
    });

    test.skip('should process UNSET WAIT command', () => {
      const result = processTextInput('UNSET WAIT', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('WAIT');
    });

    test.skip('should process WAIT ALL command', () => {
      const result = processTextInput('WAIT ALL', 'player@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('WAIT');
    });
  });

  describe('Deadline Configuration', () => {
    test('should set game deadlines through API', () => {
      const result = setDeadlines(24, 12, 'test-game');
      expect(result).toBe(true);
    });

    test.skip('should allow master to set deadlines through text commands', () => {
      const result = processTextInput('SET DEADLINE 48', 'master@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('DEADLINE');
    });

    test.skip('should allow master to set grace periods through text commands', () => {
      const result = processTextInput('SET GRACE 24', 'master@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('GRACE');
    });
  });
});