import jwt from 'jsonwebtoken';
import { TEAM_ID, KEY_ID, PRIVATE_KEY } from '../config/secrets';

export function generateDeveloperToken(): string {
    const token = jwt.sign({}, PRIVATE_KEY, {
        algorithm: 'ES256',
        expiresIn: '180d',
        issuer: TEAM_ID,
        header: {
            alg: 'ES256',
            kid: KEY_ID
        }
    });
    return token;
}
