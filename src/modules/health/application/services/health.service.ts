// eslint-disable-next-line hexagonal-architecture/enforce
import { HttpServerConfiguration } from '@/core/types/http/http-server.type';
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
    const accounts = await this.pingAccounts();
    return {
      gateway: 'up',
      accounts,
    };
  }

  public async pingAccounts(): Promise<string> {
    try {
      const config = this.configService.get<HttpServerConfiguration>('accounts');
      const isSsl = config.port === 443;
      const url = isSsl ? `https://${config.host}` : `http://${config.host}:${config.port}`;
      const { info } = await this.health.check([
        () => this.http.pingCheck('accounts', `${url}/health`),
      ]);

      return info.accounts.status;
    } catch (error) {
      Logger.error(`Error pinging accounts: ${error.message}`, HealthService.name);
      return 'down';
    }
  }
}
