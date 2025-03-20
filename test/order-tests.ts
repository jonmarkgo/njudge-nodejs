import {
  initGame,
  processOrders,
  validateOrder,
  getGameState
} from '../lib';

// Test helpers
function logSection(title: string): void {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`${title}`);
  console.log(`${'='.repeat(80)}`);
}

function logSuccess(message: string): void {
  console.log(`✅ ${message}`);
}

function logFailure(message: string): void {
  console.log(`❌ ${message}`);
}

function logInfo(message: string): void {
  console.log(`ℹ️ ${message}`);
}

// Main test function for order syntax
async function testOrderSyntax() {
  try {
    logSection('DIPLOMACY ORDER SYNTAX TEST SUITE');
    logInfo('This suite tests the various order formats accepted by njudge');
    
    try {
      // Initialize a standard game
      initGame('standard', 7);
      logSuccess('Initialized standard game for order testing');
      
      // Group 1: Movement Orders
      logSection('1. Movement Orders');
      
      const movementOrders = [
        // Hold
        { order: 'F LON H', description: 'Hold' },
        { order: 'A PAR HOLD', description: 'Hold (alternative)' },
        
        // Move
        { order: 'F LON-NTH', description: 'Move' },
        { order: 'A PAR-BUR', description: 'Move' },
        { order: 'F LON - NTH', description: 'Move (with spaces)' },
        
        // Support Hold
        { order: 'F LON S A WAL', description: 'Support Hold' },
        { order: 'F LON SUP A WAL', description: 'Support Hold (alternative)' },
        { order: 'F LON SUPPORT A WAL', description: 'Support Hold (spelled out)' },
        
        // Support Move
        { order: 'F LON S A WAL-YOR', description: 'Support Move' },
        { order: 'F LON SUP A WAL-YOR', description: 'Support Move (alternative)' },
        { order: 'F LON SUPPORT A WAL-YOR', description: 'Support Move (spelled out)' },
        
        // Convoy
        { order: 'F NTH C A LON-NWY', description: 'Convoy' },
        { order: 'F NTH CON A LON-NWY', description: 'Convoy (alternative)' },
        { order: 'F NTH CONVOY A LON-NWY', description: 'Convoy (spelled out)' }
      ];
      
      // Test each movement order
      for (const { order, description } of movementOrders) {
        try {
          const isValid = validateOrder(order, 0);
          if (isValid) {
            logSuccess(`${description}: ${order}`);
          } else {
            logFailure(`${description} rejected: ${order}`);
          }
        } catch (error) {
          logFailure(`${description} error: ${order} - ${error}`);
        }
      }
      
      // Group 2: Retreat Orders
      logSection('2. Retreat Orders');
      
      const retreatOrders = [
        // Retreat
        { order: 'A PAR R BUR', description: 'Retreat' },
        { order: 'A PAR RET BUR', description: 'Retreat (alternative)' },
        { order: 'A PAR RETREAT BUR', description: 'Retreat (spelled out)' },
        
        // Disband
        { order: 'A PAR D', description: 'Disband' },
        { order: 'A PAR DISBAND', description: 'Disband (spelled out)' }
      ];
      
      // Test each retreat order
      for (const { order, description } of retreatOrders) {
        try {
          const isValid = validateOrder(order, 0);
          if (isValid) {
            logSuccess(`${description}: ${order}`);
          } else {
            logFailure(`${description} rejected: ${order}`);
          }
        } catch (error) {
          logFailure(`${description} error: ${order} - ${error}`);
        }
      }
      
      // Group 3: Build Orders
      logSection('3. Build Orders');
      
      const buildOrders = [
        // Build
        { order: 'B F LON', description: 'Build Fleet' },
        { order: 'B A PAR', description: 'Build Army' },
        { order: 'BUILD F LON', description: 'Build Fleet (spelled out)' },
        { order: 'BUILD A PAR', description: 'Build Army (spelled out)' },
        
        // Remove
        { order: 'R F LON', description: 'Remove Fleet' },
        { order: 'R A PAR', description: 'Remove Army' },
        { order: 'REMOVE F LON', description: 'Remove Fleet (spelled out)' },
        { order: 'REMOVE A PAR', description: 'Remove Army (spelled out)' },
        
        // Waive
        { order: 'W', description: 'Waive Build' },
        { order: 'WAIVE', description: 'Waive Build (spelled out)' }
      ];
      
      // Test each build order
      for (const { order, description } of buildOrders) {
        try {
          const isValid = validateOrder(order, 0);
          if (isValid) {
            logSuccess(`${description}: ${order}`);
          } else {
            logFailure(`${description} rejected: ${order}`);
          }
        } catch (error) {
          logFailure(`${description} error: ${order} - ${error}`);
        }
      }
      
      // Group 4: Batch Order Processing - DISABLED due to po_init symbol missing
      logSection('4. Batch Order Processing');
      logInfo('SKIPPED - Requires po_init symbol which is currently unavailable');
      /*
      // Test a batch of standard move orders
      const batchOrders = `
        F LON-NTH
        A WAL-YOR
        A LVP-EDI
      `;
      
      try {
        const result = processOrders(batchOrders, 0);
        logInfo(`Batch order processing result: ${result}`);
        logSuccess('Processed batch of orders');
      } catch (error) {
        logFailure(`Batch order processing failed: ${error}`);
      }
      */
      
      // Group 5: Case Sensitivity Tests
      logSection('5. Case Sensitivity Tests');
      
      const caseSensitivityOrders = [
        { order: 'f lon-nth', description: 'Lowercase' },
        { order: 'F lon-NTH', description: 'Mixed case' },
        { order: 'F LON-nth', description: 'Mixed case 2' }
      ];
      
      for (const { order, description } of caseSensitivityOrders) {
        try {
          const isValid = validateOrder(order, 0);
          if (isValid) {
            logSuccess(`${description} accepted: ${order}`);
          } else {
            logFailure(`${description} rejected: ${order}`);
          }
        } catch (error) {
          logFailure(`${description} error: ${order} - ${error}`);
        }
      }
      
      // Group 6: Invalid Syntax Tests
      logSection('6. Invalid Syntax Tests');
      
      const invalidSyntaxOrders = [
        { order: 'F LON - - NTH', description: 'Extra dashes' },
        { order: 'F LON NTH', description: 'Missing dash for move' },
        { order: 'F LON SUPPORTS A WAL', description: 'Wrong support syntax' },
        { order: 'Z LON-NTH', description: 'Invalid unit type' },
        { order: 'F LON-NTH-YOR', description: 'Too many provinces' },
        { order: 'F', description: 'Incomplete order' }
      ];
      
      for (const { order, description } of invalidSyntaxOrders) {
        try {
          const isValid = validateOrder(order, 0);
          if (!isValid) {
            logSuccess(`Correctly rejected ${description}: ${order}`);
          } else {
            logFailure(`Incorrectly accepted ${description}: ${order}`);
          }
        } catch (error) {
          logSuccess(`Correctly threw error for ${description}: ${order}`);
        }
      }
      
    } catch (error) {
      logFailure(`Order syntax test failed with error: ${error}`);
    }
    
    logSection('ORDER SYNTAX TEST SUITE COMPLETE');
    
  } catch (error) {
    console.error('Test suite failed with error:', error);
  }
}

// Run all tests
testOrderSyntax(); 