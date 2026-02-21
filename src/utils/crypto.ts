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
    /**
     * Verifies the signature of a webhook notification.
     */
    static verifyWebhookSignature(payload: any, signature: string, integrityKey: string): boolean {
        const payloadString = JSON.stringify(payload);
        const expectedSignature = crypto.HmacSHA256(payloadString, integrityKey).toString(crypto.enc.Hex);
        return signature === expectedSignature;
    }
}
