import { describe, test, expect, beforeAll } from '@jest/globals';
import {
  initGame,
  validateOrder,
  processTextInput,
  getOutboundEmails,
  submitOrders
} from '../lib';

describe('Conditional Orders', () => {
  beforeAll(() => {
    // Initialize a standard game for all tests
    initGame('standard', 7);
  });

  describe('Order Submission API', () => {
    test('should submit orders through API', () => {
      const orders = 'F LON-NTH\nA LVP-YOR\nA EDI-CLY';
      const result = submitOrders(1, orders, 'test-game');
      expect(result).toBeDefined();
      expect(result).toHaveProperty('success');
    });
  });

  describe('Conditional Order Syntax', () => {
    test('should validate conditional movement orders', () => {
      const conditionalOrders = [
        'F LON-NTH ; F NWG-NTH', // If F NWG-NTH executes, move to North Sea
        'A LVP-YOR ; A YOR-EDI', // If A YOR-EDI executes, move to Yorkshire
        'F NTH-NWG ; F NWG-BAR', // If F NWG-BAR executes, move to Norwegian Sea
      ];
      
      conditionalOrders.forEach(order => {
        expect(validateOrder(order, 0)).toBe(true);
      });
    });

    test('should validate nested conditional orders', () => {
      const nestedOrders = [
        'F LON-NTH ; F NWG-NTH ; F BAR-NWG', // Double conditional
        'A PAR-BUR ; A BUR-RUH ; A RUH-KIE ; A KIE-BER', // Triple conditional chain
      ];
      
      nestedOrders.forEach(order => {
        expect(validateOrder(order, 0)).toBe(true);
      });
    });

    test.skip('should process conditional orders through text input', () => {
      const ordersText = `ORDERS
F LON-NTH ; F NWG-NTH
A LVP-YOR
A EDI S A LVP-YOR
END`;
      
      const result = processTextInput(ordersText, 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ORDERS');
    });
  });

  describe('Complex Order Conditions', () => {
    test('should validate OR conditions in orders', () => {
      const orConditionOrders = [
        'F LON-NTH | F LON-ENG', // Either move to North Sea OR English Channel
        'A PAR-BUR | A PAR-PIC', // Either move to Burgundy OR Picardy
      ];
      
      orConditionOrders.forEach(order => {
        expect(validateOrder(order, 0)).toBe(true);
      });
    });

    test('should validate complex condition combinations', () => {
      const complexOrders = [
        'F LON-NTH ; F NWG-NTH | F LON-ENG', // If NWG-NTH then LON-NTH, else LON-ENG
        'A PAR-BUR ; A MUN-BUR | A PAR-PIC ; A MAR-BUR', // Complex nested condition
      ];
      
      complexOrders.forEach(order => {
        expect(validateOrder(order, 0)).toBe(true);
      });
    });

    test.skip('should process OR conditions through text input', () => {
      const ordersText = `ORDERS
F LON-NTH | F LON-ENG
A LVP-YOR | A LVP-WAL
A EDI-CLY | A EDI H
END`;
      
      const result = processTextInput(ordersText, 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ORDERS');
    });
  });

  describe('Order Precedence', () => {
    test.skip('should handle order precedence in conditional chains', () => {
      // Submit multiple orders for the same unit with precedence
      const ordersText = `ORDERS
1. F LON-NTH
2. F LON-ENG
3. F LON-ECH
END`;
      
      const result = processTextInput(ordersText, 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      expect(emails[0].subject).toContain('ORDERS');
    });

    test.skip('should handle order retraction', () => {
      // First submit an order
      let result = processTextInput('ORDERS\nF LON-NTH\nEND', 'england@example.com');
      expect(result).toBe(true);
      
      // Then retract it
      result = processTextInput('NO F LON', 'england@example.com');
      expect(result).toBe(true);
      
      const emails = getOutboundEmails();
      expect(emails.length).toBeGreaterThan(0);
      // One of the emails should confirm the retraction
      expect(emails.some((e: any) => e.body.includes('retracted') || e.body.includes('cancelled'))).toBe(true);
    });
  });
});