// 代码生成时间: 2025-10-29 22:59:23
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncryptionService {
    /**
     * Hashes a password using bcrypt.
     * @param password The password to be hashed.
     * @returns A promise that resolves with the hashed password.
     */
    async hashPassword(password: string): Promise<string> {
        try {
            const saltOrRounds = 10; // Adjust as needed for security
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error(`Error hashing password: ${error.message}`);
        }
    }

    /**
     * Compares a plain text password with a hashed one.
     * @param password The plain text password to compare.
     * @param hashedPassword The hashed password to compare against.
     * @returns A promise that resolves with a boolean indicating if they match.
     */
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw new Error(`Error comparing password: ${error.message}`);
        }
    }
}