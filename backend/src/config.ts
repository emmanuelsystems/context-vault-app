import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10),

  database: {
    url: process.env.DATABASE_URL || 'postgresql://contextvault:dev_password_change_in_prod@localhost:5432/contextvault',
  },

  llm: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || '',
    },
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || 'change-this-in-production',
  },
};

// Validate required config
if (!config.database.url) {
  throw new Error('DATABASE_URL is required');
}
