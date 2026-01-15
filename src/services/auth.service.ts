/**
 * Mock Authentication Service
 * Simulates backend authentication with 500ms delay
 */

import { User, LoginCredentials, SignUpCredentials } from '../types/auth';

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    password: 'password123',
    emailVerified: true,
  },
];

// Mock verification codes storage
const VERIFICATION_CODES: { [key: string]: { code: string; expiresAt: Date } } = {};

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === credentials.email);

        if (user && user.password === credentials.password) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  /**
   * Create account (sign up)
   */
  signUp: async (credentials: SignUpCredentials): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.password !== credentials.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }

        if (MOCK_USERS.some((u) => u.email === credentials.email)) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser: User = {
          id: String(MOCK_USERS.length + 1),
          email: credentials.email,
          name: credentials.name,
          password: credentials.password,
          emailVerified: false,
        };

        MOCK_USERS.push(newUser);
        
        // Generate verification code
        const verificationCode = Math.random().toString().substring(2, 8);
        VERIFICATION_CODES[credentials.email] = {
          code: verificationCode,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        };
        
        // Log verification code to console (demo only)
        console.log('========================================');
        console.log('📧 VERIFICATION EMAIL (DEMO MODE)');
        console.log('========================================');
        console.log(`To: ${credentials.email}`);
        console.log(`Verification Code: ${verificationCode}`);
        console.log('Expires in: 10 minutes');
        console.log('========================================');
        
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 500);
    });
  },

  /**
   * Verify email with code
   */
  verifyEmail: async (email: string, code: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const verification = VERIFICATION_CODES[email];

        if (!verification) {
          reject(new Error('Verification code not found'));
          return;
        }

        if (verification.expiresAt < new Date()) {
          reject(new Error('Verification code expired'));
          return;
        }

        if (verification.code !== code) {
          reject(new Error('Invalid verification code'));
          return;
        }

        const user = MOCK_USERS.find((u) => u.email === email);
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        user.emailVerified = true;
        delete VERIFICATION_CODES[email];

        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      }, 500);
    });
  },

  /**
   * Resend verification code
   */
  resendVerificationCode: async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === email);
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        const verificationCode = Math.random().toString().substring(2, 8);
        VERIFICATION_CODES[email] = {
          code: verificationCode,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        };

        // Log to console (demo only)
        console.log('========================================');
        console.log('📧 VERIFICATION CODE RESENT (DEMO MODE)');
        console.log('========================================');
        console.log(`To: ${email}`);
        console.log(`Verification Code: ${verificationCode}`);
        console.log('Expires in: 10 minutes');
        console.log('========================================');

        resolve();
      }, 500);
    });
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * Get current user (check if logged in)
   */
  getCurrentUser: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userStr = localStorage.getItem('currentUser');
        resolve(userStr ? JSON.parse(userStr) : null);
      }, 300);
    });
  },
};
