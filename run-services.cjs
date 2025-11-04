const { spawn } = require('child_process');
const path = require('path');

console.log('Starting XRPL Services...');

// Change to the project directory
const projectDir = '/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)';

// Start Xaman Payload Server
console.log('Starting Xaman Payload Server on port 3001...');
const xamanServer = spawn('npx', ['tsx', 'fixed-xaman-payload-server.ts'], {
  cwd: projectDir,
  stdio: 'inherit'
});

// Start Frontend Server
console.log('Starting Frontend Server on port 5002...');
const frontendServer = spawn('node', ['simple-server.cjs'], {
  cwd: projectDir,
  stdio: 'inherit'
});

// Handle process events
xamanServer.on('error', (error) => {
  console.error('Xaman server error:', error);
});

frontendServer.on('error', (error) => {
  console.error('Frontend server error:', error);
});

xamanServer.on('close', (code) => {
  console.log(`Xaman server exited with code ${code}`);
});

frontendServer.on('close', (code) => {
  console.log(`Frontend server exited with code ${code}`);
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Shutting down services...');
  xamanServer.kill();
  frontendServer.kill();
  process.exit(0);
});

console.log('Services started. Press Ctrl+C to stop.');