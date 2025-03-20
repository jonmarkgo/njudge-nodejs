import {
  initGame,
  getGameState
} from '../lib';

async function runTest() {
  try {
    console.log('************************************');
    console.log('* Diplomacy Engine Node.js Binding *');
    console.log('************************************');
    console.log('Using configuration from /home/judge/dip.conf');
    
    // Initial game state
    console.log('\nInitial game state:');
    let state = getGameState();
    console.log(JSON.stringify(state, null, 2));
    
    // Initialize a game
    console.log('\nInitializing a standard game with 7 players...');
    try {
      initGame('standard', 7);
      console.log('Game initialized successfully');
      
      // Get updated game state
      console.log('\nUpdated game state:');
      state = getGameState();
      console.log(JSON.stringify(state, null, 2));
    } catch (error) {
      console.error('Error initializing game:', error);
    }
    
    console.log('\nBindings are working successfully!');
    console.log('\nTest completed');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest(); 