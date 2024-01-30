import { AntiThrottleConfiguration } from '@/core/types/http/throttles.type';
import { registerAs } from '@nestjs/config';

export const antiThrottleConfigLoader = registerAs(
  'antiThrottle',
  (): AntiThrottleConfiguration => ({
    maxRequest: parseInt(process.env.ANTI_THROTTLE_MAX_REQUEST, 10) || 15,
    interval: parseInt(process.env.ANTI_THROTTLE_INTERVAL, 10) || 30,
  }),
);
