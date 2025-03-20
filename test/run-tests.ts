#!/usr/bin/env ts-node

import { join } from 'path';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

// Test suites
const TEST_SUITES = [
  {
    name: 'Basic Functionality',
    file: 'example.ts',
    description: 'Tests basic initialization and game state retrieval'
  },
  {
    name: 'Order Syntax',
    file: 'order-tests.ts',
    description: 'Tests various order formats and syntax validation'
  },
  {
    name: 'Game Management',
    file: 'game-management-tests.ts',
    description: 'Tests game setup, player registration, and game state tracking'
  },
  {
    name: 'NJudge Commands',
    file: 'njudge-commands.ts', 
    description: 'Tests order syntax from the NJudge manual'
  },
  {
    name: 'Full Test Suite',
    file: 'test-suite.ts',
    description: 'Comprehensive test of all Node.js binding functionality'
  }
];

// Check if config file exists
const configFile = '/home/judge/dip.conf';
if (!existsSync(configFile)) {
  console.error(`Error: Configuration file not found: ${configFile}`);
  console.error('Please ensure the diplomacy engine is properly configured before running tests.');
  process.exit(1);
}

// Print header
console.log(`
==================================================================================
                     DIPLOMACY ENGINE NODE.JS BINDING TEST RUNNER
==================================================================================
`);

console.log(`Configuration file: ${configFile}`);
console.log(`\nAvailable test suites:\n`);

// List available test suites
TEST_SUITES.forEach((suite, index) => {
  console.log(`${index + 1}. ${suite.name} (${suite.file})`);
  console.log(`   ${suite.description}`);
});

// Parse command line arguments
const args = process.argv.slice(2);
let selectedSuites: number[] = [];

if (args.length === 0) {
  // Run all suites by default
  selectedSuites = TEST_SUITES.map((_, index) => index);
} else {
  // Parse suite numbers
  args.forEach(arg => {
    const num = parseInt(arg, 10);
    if (!isNaN(num) && num > 0 && num <= TEST_SUITES.length) {
      selectedSuites.push(num - 1);
    } else {
      console.warn(`Warning: Invalid test suite number: ${arg}`);
    }
  });
}

if (selectedSuites.length === 0) {
  console.error('Error: No valid test suites selected.');
  process.exit(1);
}

// Function to run a test suite
function runTestSuite(suiteIndex: number): boolean {
  const suite = TEST_SUITES[suiteIndex];
  const testFile = join(__dirname, suite.file);
  
  if (!existsSync(testFile)) {
    console.error(`Error: Test file not found: ${testFile}`);
    return false;
  }
  
  console.log(`\n==================================================================================`);
  console.log(`Running test suite: ${suite.name} (${suite.file})`);
  console.log(`==================================================================================\n`);
  
  try {
    execSync(`ts-node ${testFile}`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\nTest suite failed: ${suite.name}`);
    return false;
  }
}

// Run selected test suites
console.log(`\nRunning ${selectedSuites.length} test suite(s)...\n`);

let passedCount = 0;
let failedCount = 0;

selectedSuites.forEach(suiteIndex => {
  const success = runTestSuite(suiteIndex);
  if (success) {
    passedCount++;
  } else {
    failedCount++;
  }
});

// Print summary
console.log(`\n==================================================================================`);
console.log(`                                TEST SUMMARY`);
console.log(`==================================================================================`);
console.log(`Total test suites: ${selectedSuites.length}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`==================================================================================\n`);

// Exit with appropriate code
process.exit(failedCount > 0 ? 1 : 0); 