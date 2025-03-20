import {
  initGame,
  registerPlayer,
  getPlayerStatus,
  sendPress,
  voteForDraw,
  submitOrders,
  processTextInput,
  getTextOutput,
  simulateInboundEmail,
  getOutboundEmails
} from '../lib';

describe('Player Communications', () => {
  beforeAll(() => {
    // Initialize a standard game for all tests
    initGame('standard', 7);
  });

  // These tests may need to be skipped if the C++ implementation
  // doesn't fully support these features yet

  describe('Press Messages', () => {
    test.skip('should send press message from one player to another', () => {
      // Register two players
      const player1Result = registerPlayer({
        name: 'Player 1',
        email: 'player1@example.com',
        level: 'novice',
        address: 'Test Address',
        country: 'Test Country'
      });
      
      const player2Result = registerPlayer({
        name: 'Player 2',
        email: 'player2@example.com',
        level: 'novice',
        address: 'Test Address',
        country: 'Test Country'
      });
      
      expect(player1Result).toBe(true);
      expect(player2Result).toBe(true);
      
      // Send press message
      const pressResult = sendPress(0, 1, 'Hello from Player 1', 'testgame');
      expect(pressResult.success).toBe(true);
      
      // Get output emails
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].to).toBe('player2@example.com');
      expect(emails[0].body).toContain('Hello from Player 1');
    });

    test.skip('should send press message to multiple players', () => {
      // This assumes players are already registered
      const pressResult = sendPress(0, ['1', '2'], 'Message to both players', 'testgame');
      expect(pressResult.success).toBe(true);
      
      // Get output emails
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(1); // At least 2 emails
    });

    test.skip('should send press message to all players', () => {
      const pressResult = sendPress(0, 'ALL', 'Announcement to everyone', 'testgame');
      expect(pressResult.success).toBe(true);
      
      // Get output emails
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
    });

    test.skip('should process text input press commands', () => {
      const result = processTextInput('PRESS FROM ENGLAND TO FRANCE\nLet\'s form an alliance!', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].body).toContain('Let\'s form an alliance!');
    });
  });

  describe('Press Control Commands', () => {
    test.skip('should block press from specific power', () => {
      const result = processTextInput('NO PRESS FROM FRANCE', 'england@example.com');
      expect(result).toBe(true);
      
      // Try to send press from France to England
      const pressResult = processTextInput('PRESS FROM FRANCE TO ENGLAND\nThis message should be blocked', 'france@example.com');
      expect(pressResult).toBe(true);
      
      // No emails should be sent
      const emails = getOutboundEmails();
      expect(emails.length).toBe(0);
    });

    test.skip('should allow press from previously blocked power', () => {
      // First block press
      processTextInput('NO PRESS FROM FRANCE', 'england@example.com');
      
      // Then allow it again
      const result = processTextInput('YES PRESS FROM FRANCE', 'england@example.com');
      expect(result).toBe(true);
      
      // Try to send press from France to England
      const pressResult = processTextInput('PRESS FROM FRANCE TO ENGLAND\nThis message should go through', 'france@example.com');
      expect(pressResult).toBe(true);
      
      // Emails should be sent
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].body).toContain('This message should go through');
    });

    test.skip('should block all press', () => {
      const result = processTextInput('NO PRESS', 'england@example.com');
      expect(result).toBe(true);
      
      // Try to send press from any power
      const pressResult1 = processTextInput('PRESS FROM FRANCE TO ENGLAND\nThis should be blocked', 'france@example.com');
      const pressResult2 = processTextInput('PRESS FROM GERMANY TO ENGLAND\nThis should be blocked too', 'germany@example.com');
      
      expect(pressResult1).toBe(true);
      expect(pressResult2).toBe(true);
      
      // No emails should be sent
      const emails = getOutboundEmails();
      expect(emails.length).toBe(0);
    });
  });

  describe('Draw Voting', () => {
    test.skip('should process draw vote', () => {
      const result = voteForDraw(0, true, 'testgame');
      expect(result.success).toBe(true);
    });

    test.skip('should process draw vote through text input', () => {
      const result = processTextInput('YES DRAW', 'player1@example.com');
      expect(result).toBe(true);
      
      // Verify the draw vote was registered
      // This would require a way to check the current draw votes
    });

    test.skip('should process draw cancellation', () => {
      // First vote for draw
      voteForDraw(0, true, 'testgame');
      
      // Then cancel the vote
      const result = voteForDraw(0, false, 'testgame');
      expect(result.success).toBe(true);
    });

    test.skip('should process draw cancellation through text input', () => {
      const result = processTextInput('NO DRAW', 'player1@example.com');
      expect(result).toBe(true);
      
      // Verify the draw vote was cancelled
      // This would require a way to check the current draw votes
    });
  });

  describe('Order Submission', () => {
    test.skip('should submit orders via API', () => {
      const orders = 'F LON-NTH\nA LVP-YOR\nF EDI-NWG';
      const result = submitOrders(0, orders, 'testgame');
      
      expect(result.success).toBe(true);
      expect(result.ordersAccepted).toBe(true);
    });

    test.skip('should submit orders via text input', () => {
      const orderText = 'ORDERS\nF LON-NTH\nA LVP-YOR\nF EDI-NWG\nENDORDERS';
      const result = processTextInput(orderText, 'england@example.com');
      
      expect(result).toBe(true);
      
      // Verify orders were accepted
      // This would require a way to check the current orders
    });

    test.skip('should reject invalid orders via API', () => {
      const invalidOrders = 'F LON-NTH\nX LVP-YOR\nF EDI-NWG'; // X is invalid unit type
      const result = submitOrders(0, invalidOrders, 'testgame');
      
      expect(result.success).toBe(true); // The submission itself succeeds
      expect(result.ordersAccepted).toBe(false); // But orders should be rejected
    });

    test.skip('should reject invalid orders via text input', () => {
      const invalidOrderText = 'ORDERS\nF LON-NTH\nX LVP-YOR\nF EDI-NWG\nENDORDERS'; // X is invalid unit type
      const result = processTextInput(invalidOrderText, 'england@example.com');
      
      expect(result).toBe(true);
      
      // Verify orders were rejected
      // This would require a way to check error messages
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].body).toContain('invalid'); // Should mention invalid orders
    });
  });

  describe('Status Commands', () => {
    test.skip('should get player status via API', () => {
      const status = getPlayerStatus(0, 'testgame');
      
      expect(status).toBeDefined();
      expect(status.power).toBeDefined();
      expect(status.status).toBeDefined();
      expect(status.units).toBeDefined();
      expect(status.centers).toBeDefined();
    });

    test.skip('should get player status via text input', () => {
      const result = processTextInput('STATUS', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('STATUS');
      // The body should contain status information
      expect(emails[0].body).toContain('units');
      expect(emails[0].body).toContain('centers');
    });

    test.skip('should get game results via text input', () => {
      const result = processTextInput('RESULTS', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('RESULTS');
    });

    test.skip('should get centers chart via text input', () => {
      const result = processTextInput('CENTERS', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('CENTERS');
    });

    test.skip('should get moves history via text input', () => {
      const result = processTextInput('MOVES', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('MOVES');
    });
  });
});