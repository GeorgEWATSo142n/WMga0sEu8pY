// 代码生成时间: 2025-09-23 16:37:32
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoUtil {
  // Encrypts a password using bcrypt
  async encryptPassword(password: string): Promise<string> {
    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      // Handle encryption errors
      throw new Error(`Encryption error: ${error.message}`);
    }
  }

  // Compares a password with its hashed version for verification
  async comparePasswords(attempt: string, hashedPassword: string): Promise<boolean> {
    try {
      // Compare the attempt with the hashed password
      return await bcrypt.compare(attempt, hashedPassword);
    } catch (error) {
      // Handle comparison errors
      throw new Error(`Comparison error: ${error.message}`);
    }
  }
}
