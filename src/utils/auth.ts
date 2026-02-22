import * as cryptoJs from 'crypto-js';
import { randomUUID } from 'crypto';
import { AuthPayload } from '../types';

export class AuthUtils {
    static generateJWT(apiKey: string, apiSecret: string): string {
        const header = { alg: 'HS256', typ: 'JWT' };
        const now = Math.floor(Date.now() / 1000);

        const payload: AuthPayload = {
            iss: apiKey,
            jti: randomUUID(),
            iat: now,
            exp: now + 30, // 30 seconds expiration as requested
        };

        const base64url = (source: cryptoJs.lib.WordArray | string): string => {
            let encodedSource = typeof source === 'string'
                ? cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(source))
                : cryptoJs.enc.Base64.stringify(source);

            return encodedSource
                .replace(/=+$/, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        };

        const encodedHeader = base64url(JSON.stringify(header));
        const encodedPayload = base64url(JSON.stringify(payload));

        const signatureSource = `${encodedHeader}.${encodedPayload}`;
        const signature = base64url(cryptoJs.HmacSHA256(signatureSource, apiSecret));

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
}
