import * as OTPAuth from "otpauth";

export const DEFAULT_PERIOD = 30;
export const DEFAULT_DIGITS = 6;

export interface TotpResult {
    token: string;
    remaining: number;
    remainingProgress: number; // 0 to 100
    isValid: boolean;
    error?: unknown;
}

export function generateTotp(secret: string, digits: number = DEFAULT_DIGITS, period: number = DEFAULT_PERIOD): TotpResult {
    try {
        if (!secret) {
            return { token: "", remaining: 0, remainingProgress: 0, isValid: false };
        }
        // Basic cleanup of secret (remove spaces, uppercase)
        const cleanSecret = secret.replace(/\s+/g, "").toUpperCase();

        // Create TOTP object
        const totp = new OTPAuth.TOTP({
            issuer: "TotpApp",
            label: "User",
            algorithm: "SHA1",
            digits: digits,
            period: period,
            secret: OTPAuth.Secret.fromBase32(cleanSecret),
        });

        const token = totp.generate();
        const now = Math.floor(Date.now() / 1000);
        const remaining = period - (now % period);
        const remainingProgress = (remaining / period) * 100;

        return { token, remaining, remainingProgress, isValid: true };
    } catch (error) {
        return { token: "", remaining: 0, remainingProgress: 0, isValid: false, error };
    }
}
