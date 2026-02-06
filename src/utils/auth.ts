import * as crypto from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { AuthPayload } from '../types';

export class AuthUtils {
    static generateJWT(apiKey: string, apiSecret: string): string {
        const header = { alg: 'HS256', typ: 'JWT' };
        const now = Math.floor(Date.now() / 1000);

        const payload: AuthPayload = {
            iss: apiKey,
            jti: uuidv4(),
            iat: now,
            exp: now + 30, // 30 seconds expiration as requested
        };

        const base64url = (source: crypto.lib.WordArray | string): string => {
            let encodedSource = typeof source === 'string'
                ? crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(source))
                : crypto.enc.Base64.stringify(source);

            return encodedSource
                .replace(/=+$/, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        };

        const encodedHeader = base64url(JSON.stringify(header));
        const encodedPayload = base64url(JSON.stringify(payload));

        const signatureSource = `${encodedHeader}.${encodedPayload}`;
        const signature = base64url(crypto.HmacSHA256(signatureSource, apiSecret));

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
}
