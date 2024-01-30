import { Test, TestingModule } from '@nestjs/testing';

import { HealthService } from '@/modules/health/application/services/health.service';
import { HealthModule } from '@/modules/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule, TerminusModule, HttpModule, ConfigModule.forFeature(() => ({}))],
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have void health method', async () => {
    expect(await service.healthCheck()).toHaveProperty('gateway');
    expect(await service.healthCheck()).toHaveProperty('accounts');
  });
});
