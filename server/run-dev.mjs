import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

import('./src/index.ts').catch(err => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});