import * as crypto from 'crypto-js';

export class CryptoUtils {
    /**
     * Generates a signature for web payment requests using accountKey and integrityKey.
     * This matches the logic provided in the requirements.
     */
    static generateWebSignature(accountKey: string, integrityKey: string, timestamp: number): string {
        const dataToSign = `${accountKey}${timestamp}${integrityKey}`;
        const hash = crypto.SHA256(dataToSign);
        return hash.toString(crypto.enc.Hex);
    }
}
