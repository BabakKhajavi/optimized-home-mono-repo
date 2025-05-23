import * as dotenv from 'dotenv';
import path from 'path';
const envFilePath = path.resolve(`.env.${process.env.NODE_ENV}`);
const result = dotenv.config({ path: envFilePath });
if (result.error) {
  console.error('Failed to load .env file:', result.error);
  process.exit(1);
}

export const environment = {
  origins: [
    process.env.SERVICE_CORS_ORIGIN_PORTAL as string,
    process.env.SERVICE_CORS_ORIGIN_APP as string,
    process.env.SERVICE_CORS_ORIGIN_WEB as string,
    'http://localhost:4173',
  ],
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  host: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_DATABASE || '',
  username: process.env.DB_USERS || '',
  password: process.env.DB_PASSWORD || '',
  loggingDatabase: process.env.LOGGING_DATABASE === 'true',
  sendgrid: {
    sendGridAPIKey: process.env.SENDGRID_API_KEY,
    sendgridAlarmTemplateId: process.env.SENDGRID_ALARM_TEMPLATE_ID,
    sendgridAutoReplayTemplateId: process.env.SENDGRID_AUTO_REPLAY_TEMPLATE_ID,
  },
};
