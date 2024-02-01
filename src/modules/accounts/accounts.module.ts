import { useCases } from '@/modules/accounts/application/use-cases';
import { AccountsController } from '@/modules/accounts/infrastructure/http/controllers/accounts.controller';
import { accountsLoader } from '@/modules/accounts/infrastructure/microservice/config/accounts.loader';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(accountsLoader)],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get('accounts');
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
      accounts: accountsLoader(),
    })),
  ],
  controllers: [AccountsController],
  providers: [...useCases],
})
export class AccountsModule {}
