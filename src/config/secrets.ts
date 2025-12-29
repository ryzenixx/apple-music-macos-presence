import 'dotenv/config';

export const TEAM_ID = process.env.APPLE_TEAM_ID || '';
export const KEY_ID = process.env.APPLE_KEY_ID || '';
export const PRIVATE_KEY = (process.env.APPLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
