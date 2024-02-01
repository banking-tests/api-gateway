import { useCases } from '@/modules/finance/application/use-cases';
import { FinanceController } from '@/modules/finance/infrastructure/http/controllers/finance.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [FinanceController],
  providers: [...useCases],
})
export class FinanceModule {}
