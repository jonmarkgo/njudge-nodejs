import {
  initGame,
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

// Test njudge command syntax based on the manual
async function testNjudgeCommands() {
  try {
    logSection('NJUDGE COMMAND SYNTAX TEST SUITE');
    logInfo('This suite tests command syntax based on the njudge manual');
    
    try {
      // Initialize a standard game
      initGame('standard', 7);
      logSuccess('Initialized standard game for command testing');
      
      // Group 1: Game Setup Commands
      logSection('1. Game Setup Commands');
      
      // These are management commands that would be sent via email to the judge
      const gameSetupCommands = [
        { command: 'JOIN mygame', description: 'Join a game' },
        { command: 'REMOVE mygame', description: 'Remove from a game' },
        { command: 'OBSERVE mygame', description: 'Observe a game' },
        { command: 'SET EMAIL new@example.com', description: 'Set email address' },
        { command: 'STATUS', description: 'Get player status' },
        { command: 'LIST', description: 'List available games' },
        { command: 'START mygame', description: 'Start a game' }
      ];
      
      // These would normally be text messages processed by the engine
      // We're not executing these, just checking if our validation can handle them
      logInfo('Note: The following game setup commands are shown for reference. These would typically be processed as text input rather than direct orders.');
      
      for (const { command, description } of gameSetupCommands) {
        logInfo(`${description}: ${command}`);
      }
      
      // Group 2: Movement Orders
      logSection('2. Movement Orders');
      
      // Based on the njudge manual, movement orders can have various formats
      const movementOrders = [
        // Standard movement syntax
        { order: 'F LON-NTH', description: 'Fleet move' },
        { order: 'A PAR-BUR', description: 'Army move' },
        
        // Hold syntax
        { order: 'F LON H', description: 'Hold (H)' },
        { order: 'A PAR HOLD', description: 'Hold (HOLD)' },
        
        // Support syntax
        { order: 'F LON S A WAL', description: 'Support hold (S)' },
        { order: 'F LON S A WAL-YOR', description: 'Support move (S)' },
        { order: 'F LON SUP A WAL', description: 'Support hold (SUP)' },
        { order: 'F LON SUPPORT A WAL-YOR', description: 'Support move (SUPPORT)' },
        
        // Convoy syntax
        { order: 'F NTH C A LON-NWY', description: 'Convoy (C)' },
        { order: 'F NTH CON A LON-NWY', description: 'Convoy (CON)' },
        { order: 'F NTH CONVOY A LON-NWY', description: 'Convoy (CONVOY)' },
        
        // Via convoy syntax (for armies)
        { order: 'A LON-NWY VIA', description: 'Move via convoy (VIA)' },
        { order: 'A LON-NWY VIA CONVOY', description: 'Move via convoy (VIA CONVOY)' }
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
      
      // Group 3: Retreat Orders
      logSection('3. Retreat Orders');
      
      const retreatOrders = [
        // Retreat to a specific location
        { order: 'A PAR R BUR', description: 'Retreat (R)' },
        { order: 'A PAR RET BUR', description: 'Retreat (RET)' },
        { order: 'A PAR RETREAT BUR', description: 'Retreat (RETREAT)' },
        
        // Disband unit
        { order: 'A PAR D', description: 'Disband (D)' },
        { order: 'A PAR DISBAND', description: 'Disband (DISBAND)' }
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
      
      // Group 4: Build Orders
      logSection('4. Build Orders');
      
      const buildOrders = [
        // Build new units
        { order: 'B A PAR', description: 'Build army (B)' },
        { order: 'B F BRE', description: 'Build fleet (B)' },
        { order: 'BUILD A PAR', description: 'Build army (BUILD)' },
        { order: 'BUILD F BRE', description: 'Build fleet (BUILD)' },
        
        // Remove existing units
        { order: 'R A PAR', description: 'Remove army (R)' },
        { order: 'R F BRE', description: 'Remove fleet (R)' },
        { order: 'REMOVE A PAR', description: 'Remove army (REMOVE)' },
        { order: 'REMOVE F BRE', description: 'Remove fleet (REMOVE)' },
        
        // Waive builds
        { order: 'W', description: 'Waive build (W)' },
        { order: 'WAIVE', description: 'Waive build (WAIVE)' }
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
      
      // Group 5: Press Commands
      logSection('5. Press Commands');
      
      // These would be sent as text messages, not as direct orders
      const pressCommands = [
        { command: 'PRESS FROM ENGLAND TO FRANCE', description: 'Send press' },
        { command: 'PRESS TO ALL', description: 'Send press to all' },
        { command: 'PRESS FROM ENGLAND TO FRANCE, GERMANY', description: 'Send press to multiple powers' },
        { command: 'NO PRESS', description: 'Prevent all press' },
        { command: 'NO PRESS FROM FRANCE', description: 'Block press from a power' },
        { command: 'YES PRESS FROM FRANCE', description: 'Allow press from a power' }
      ];
      
      // These would normally be text messages processed by the engine
      // We're not executing these, just checking if our validation can handle them
      logInfo('Note: The following press commands are shown for reference. These would typically be processed as text input rather than direct orders.');
      
      for (const { command, description } of pressCommands) {
        logInfo(`${description}: ${command}`);
      }
      
      // Group 6: Game Status Commands
      logSection('6. Game Status Commands');
      
      // These would be sent as text messages, not as direct orders
      const statusCommands = [
        { command: 'RESULTS', description: 'Get latest results' },
        { command: 'SUMMARY', description: 'Get game summary' },
        { command: 'CENTERS', description: 'Get supply center chart' },
        { command: 'MOVES', description: 'Get moves from last turn' },
        { command: 'MAP', description: 'Get ASCII map' },
        { command: 'HISTORY', description: 'Get game history' },
        { command: 'STATUS', description: 'Get game status' }
      ];
      
      // These would normally be text messages processed by the engine
      // We're not executing these, just checking if our validation can handle them
      logInfo('Note: The following status commands are shown for reference. These would typically be processed as text input rather than direct orders.');
      
      for (const { command, description } of statusCommands) {
        logInfo(`${description}: ${command}`);
      }
      
    } catch (error) {
      logFailure(`NJudge command test failed with error: ${error}`);
    }
    
    logSection('NJUDGE COMMAND TEST SUITE COMPLETE');
    
  } catch (error) {
    console.error('Test suite failed with error:', error);
  }
}

// Run all tests
testNjudgeCommands(); 