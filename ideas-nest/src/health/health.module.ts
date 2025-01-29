import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthIndicatorService, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [HealthIndicatorService],
})
export class HealthModule {}
