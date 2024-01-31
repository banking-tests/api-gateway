import { Module } from '@nestjs/common';

import { accountsLoader } from '@/modules/accounts/infrastructure/microservice/config/accounts.loader';
import { HealthService } from '@/modules/health/application/services/health.service';
import { HealthController } from '@/modules/health/infrastructure/controllers/health.controller';
import { transactionsLoader } from '@/modules/transactions/infrastructure/microservice/config/transactions.loader';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ConfigModule.forFeature(() => ({
      accounts: accountsLoader(),
      transactions: transactionsLoader(),
    })),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
