// Jest setup file for testing
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Global test setup
beforeAll(async () => {
  // Any global setup needed for tests
});

afterAll(async () => {
  // Any global cleanup needed for tests
});

// Increase timeout for async operations
jest.setTimeout(10000);