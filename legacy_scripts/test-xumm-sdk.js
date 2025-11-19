import { Xumm } from 'xumm';
import dotenv from 'dotenv';

dotenv.config();

console.log('API Key:', process.env.VITE_XUMM_API_KEY);
console.log('API Secret:', process.env.XUMM_API_SECRET ? '[SET]' : '[NOT SET]');

if (!process.env.VITE_XUMM_API_KEY || !process.env.XUMM_API_SECRET) {
  console.error('Xaman API credentials not configured');
  process.exit(1);
}

try {
  console.log('Initializing Xumm SDK...');
  const xumm = new Xumm(process.env.VITE_XUMM_API_KEY, process.env.XUMM_API_SECRET);
  console.log('Xumm SDK initialized successfully');
  
  xumm.on('error', (error) => {
    console.error('Xumm SDK error:', error);
  });
  
  xumm.on('ready', () => {
    console.log('Xumm SDK is ready');
  });
  
  console.log('Xumm SDK setup complete');
} catch (error) {
  console.error('Error initializing Xumm SDK:', error);
}