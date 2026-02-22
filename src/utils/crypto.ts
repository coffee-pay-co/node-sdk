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
        const payloadString = this.stableStringify(payload);
        const expectedSignature = crypto.HmacSHA256(payloadString, integrityKey).toString(crypto.enc.Hex);
        return signature === expectedSignature;
    }

    /**
     * Deterministic JSON stringify that sorts object keys recursively.
     */
    private static stableStringify(obj: any): string {
        return JSON.stringify(this.sortObject(obj));
    }

    private static sortObject(obj: any): any {
        if (obj === null || typeof obj !== 'object' || obj instanceof Date) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map((item) => this.sortObject(item));
        }
        const sortedKeys = Object.keys(obj).sort();
        const result: any = {};
        for (const key of sortedKeys) {
            result[key] = this.sortObject(obj[key]);
        }
        return result;
    }
}
