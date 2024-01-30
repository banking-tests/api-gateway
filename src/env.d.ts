import { Environment } from '@/core/domain/enums/environment.enum';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // ENVIRONMENT
      NODE_ENV: Environment;
      DEBUG: string;

      // SERVER
      HOST: string;
      PORT: string;

      // Anti throttle
      ANTI_THROTTLE_MAX_REQUEST?: string;
      ANTI_THROTTLE_INTERVAL?: string;

      // Microservices
      ACCOUNTS_HOST: string;
      ACCOUNTS_PORT: string;
      ACCOUNTS_API_KEY: string;
    }
  }
}

export {};
