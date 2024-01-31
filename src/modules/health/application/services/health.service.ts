import { HttpServerConfiguration } from '@/core/types/http/http-server.type';
import { Pings } from '@/modules/health/application/types/pings.type';
import { pingStatuses } from '@/modules/health/application/utils/ping-status.util';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  public async healthCheck() {
    Logger.log('HealthCheck', HealthService.name);
    const microservices = await this.pingAccounts();
    return {
      gateway: 'up',
      ...microservices,
    };
  }

  public async pingAccounts(): Promise<Pings> {
    try {
      const microservices = this.configService.get<{ [key: string]: HttpServerConfiguration }>(
        'microservices',
      );

      const healthIndicators = Object.keys(microservices).map((key) => {
        const { host, port } = microservices[key];
        const url = this.buildUrl(host, port);
        return () => this.http.pingCheck(key, `${url}/health`);
      });

      const { info } = await this.health.check(healthIndicators);

      return pingStatuses(info);
    } catch (error) {
      return pingStatuses(error.response.details);
    }
  }

  private buildUrl(host: string, port: number): string {
    const isSsl = port === 443;
    return isSsl ? `https://${host}` : `http://${host}:${port}`;
  }
}
