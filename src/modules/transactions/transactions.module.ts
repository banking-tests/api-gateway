import { queryHandlers } from '@/modules/transactions/application/queries';
import { useCases } from '@/modules/transactions/application/use-cases';
import { TransactionsController } from '@/modules/transactions/infrastructure/http/controllers/transactions.controller';
import { transactionsLoader } from '@/modules/transactions/infrastructure/microservice/config/transactions.loader';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(transactionsLoader)],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get('transactions');
        const isSsl = config.port === 443;
        const baseURL = isSsl
          ? `https://${config.host}`
          : `http://${config.host}:${config.port}`;
        return {
          baseURL,
          headers: {
            Authorization: `ApiKey ${config.apiKey}`,
          },
        };
      },
    }),
    ConfigModule.forFeature(() => ({
      transactions: transactionsLoader(),
    })),
  ],
  controllers: [TransactionsController],
  providers: [...useCases, ...queryHandlers],
})
export class TransactionsModule {}
