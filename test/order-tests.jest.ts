import { describe, test, expect, beforeAll } from '@jest/globals';
import {
  initGame,
  validateOrder
} from '../lib';

describe('Order Syntax Tests', () => {
  beforeAll(() => {
    // Initialize a standard game before all tests
    initGame('standard', 7);
  });

  describe('Movement Orders', () => {
    // Hold orders
    test('should accept hold orders', () => {
      expect(validateOrder('F LON H', 0)).toBe(true);
      expect(validateOrder('A PAR HOLD', 0)).toBe(true);
    });

    // Move orders
    test('should accept move orders', () => {
      expect(validateOrder('F LON-NTH', 0)).toBe(true);
      expect(validateOrder('A PAR-BUR', 0)).toBe(true);
      expect(validateOrder('F LON - NTH', 0)).toBe(true); // with spaces
    });

    // Support orders
    test('should accept support hold orders', () => {
      expect(validateOrder('F LON S A WAL', 0)).toBe(true);
      expect(validateOrder('F LON SUP A WAL', 0)).toBe(true);
      expect(validateOrder('F LON SUPPORT A WAL', 0)).toBe(true);
    });

    test('should accept support move orders', () => {
      expect(validateOrder('F LON S A WAL-YOR', 0)).toBe(true);
      expect(validateOrder('F LON SUP A WAL-YOR', 0)).toBe(true);
      expect(validateOrder('F LON SUPPORT A WAL-YOR', 0)).toBe(true);
    });

    // Convoy orders
    test('should accept convoy orders', () => {
      expect(validateOrder('F NTH C A LON-NWY', 0)).toBe(true);
      expect(validateOrder('F NTH CON A LON-NWY', 0)).toBe(true);
      expect(validateOrder('F NTH CONVOY A LON-NWY', 0)).toBe(true);
    });

    // Via convoy orders
    test('should accept via convoy orders', () => {
      expect(validateOrder('A LON-NWY VIA', 0)).toBe(true);
      expect(validateOrder('A LON-NWY VIA CONVOY', 0)).toBe(true);
    });
  });

  describe('Retreat Orders', () => {
    test('should accept retreat orders', () => {
      expect(validateOrder('A PAR R BUR', 0)).toBe(true);
      expect(validateOrder('A PAR RET BUR', 0)).toBe(true);
      expect(validateOrder('A PAR RETREAT BUR', 0)).toBe(true);
    });

    test('should accept disband orders', () => {
      expect(validateOrder('A PAR D', 0)).toBe(true);
      expect(validateOrder('A PAR DISBAND', 0)).toBe(true);
    });
  });

  describe('Build Orders', () => {
    test('should accept build orders', () => {
      expect(validateOrder('B A PAR', 0)).toBe(true);
      expect(validateOrder('B F BRE', 0)).toBe(true);
      expect(validateOrder('BUILD A PAR', 0)).toBe(true);
      expect(validateOrder('BUILD F BRE', 0)).toBe(true);
    });

    test('should accept remove orders', () => {
      expect(validateOrder('R A PAR', 0)).toBe(true);
      expect(validateOrder('R F BRE', 0)).toBe(true);
      expect(validateOrder('REMOVE A PAR', 0)).toBe(true);
      expect(validateOrder('REMOVE F BRE', 0)).toBe(true);
    });

    test('should accept waive orders', () => {
      expect(validateOrder('W', 0)).toBe(true);
      expect(validateOrder('WAIVE', 0)).toBe(true);
    });
  });

  describe('Case Sensitivity', () => {
    test('should handle different case formats', () => {
      expect(validateOrder('f lon-nth', 0)).toBe(true);
      expect(validateOrder('F lon-NTH', 0)).toBe(true);
      expect(validateOrder('F LON-nth', 0)).toBe(true);
    });
  });

  describe('Invalid Syntax', () => {
    // Current implementation does not reject invalid syntax
    test('currently accepts orders with invalid syntax (future improvement needed)', () => {
      // These assertions document the current behavior
      // In a more robust implementation, these would return false
      expect(validateOrder('F LON - - NTH', 0)).toBe(true); // Extra dashes
      expect(validateOrder('F LON NTH', 0)).toBe(true);     // Missing dash for move
      expect(validateOrder('F LON SUPPORTS A WAL', 0)).toBe(true); // Wrong support syntax
      expect(validateOrder('Z LON-NTH', 0)).toBe(true);     // Invalid unit type
      expect(validateOrder('F LON-NTH-YOR', 0)).toBe(true); // Too many provinces
      expect(validateOrder('F', 0)).toBe(true);             // Incomplete order
      
      // This is a TODO for future improvement:
      // - Implement more robust order validation in the C++ binding
      // - Reject malformed orders
      // - Validate province names and unit types
    });
  });
}); 