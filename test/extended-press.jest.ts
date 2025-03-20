import { describe, test, expect, beforeEach } from '@jest/globals';
import {
  initGame,
  registerPlayer,
  sendPress,
  getOutboundEmails,
  setPressRules
} from '../lib';

// Interface for email objects
interface Email {
  to: string;
  from: string;
  subject: string;
  body: string;
}

// The test suite is now enabled since we've implemented the necessary functions
describe('Extended Press and Communication', () => {
  const gameId = 'test-game';
  const playerIds: Record<string, number> = {};
  
  beforeEach(() => {
    // Initialize a game
    initGame('standard', 7);
    
    // Set up the game with grey press (all communication allowed)
    setPressRules('grey', gameId);
    
    // Register players
    const players = [
      { name: 'England Player', email: 'england@example.com', power: 'England' },
      { name: 'France Player', email: 'france@example.com', power: 'France' },
      { name: 'Germany Player', email: 'germany@example.com', power: 'Germany' }
    ];
    
    players.forEach(player => {
      const result = registerPlayer(player.name, player.email, player.power, gameId);
      playerIds[player.power] = result.playerId;
    });
  });
  
  // Rest of the test file can remain the same, with proper type annotations
  test('should allow direct press between players', () => {
    const result = sendPress(
      playerIds['England'],
      playerIds['France'],
      'Hello France, would you like to ally against Germany?',
      gameId
    );
    
    expect(result.success).toBe(true);
    
    const emails = getOutboundEmails();
    expect(emails.length).toBeGreaterThan(0);
    expect(emails[0].to).toBe('france@example.com');
    expect(emails[0].body).toContain('ally against Germany');
  });
  
  test('should allow broadcast press to all players', () => {
    const result = sendPress(
      playerIds['England'],
      0, // 0 means broadcast to all
      'Attention everyone: I propose a Western Triple Alliance!',
      gameId
    );
    
    expect(result.success).toBe(true);
    
    const emails = getOutboundEmails();
    expect(emails.length).toBeGreaterThan(1);
    emails.forEach((email: Email) => {
      expect(email.body).toContain('Western Triple Alliance');
    });
  });
  
  test('should block press in no-press games', () => {
    // Change to no-press
    setPressRules('none', gameId);
    
    const result = sendPress(
      playerIds['England'],
      playerIds['France'],
      'This should be blocked',
      gameId
    );
    
    expect(result.success).toBe(false);
    
    const emails = getOutboundEmails();
    expect(emails.some((e: Email) => e.body.includes('This should be blocked'))).toBe(false);
  });
});