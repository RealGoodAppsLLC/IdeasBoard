import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService, HealthIndicatorService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly indicator: HealthIndicatorService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const isDev = process.env.NODE_ENV === 'development';
    return this.health.check([
      () => this.checkFirebaseAuth(isDev),
      () => this.checkFirebaseDb(isDev),
    ]);
  }

  private checkFirebaseAuth(isDev: boolean)
  {
    const firebaseAuthDomain = isDev
      ? process.env.FIREBASE_AUTH_EMULATOR_HOST
      : process.env.FIREBASE_AUTH_DOMAIN;

    if (!firebaseAuthDomain) {
      return this.indicator.check('firebase-auth').down({
        error: 'Firebase auth domain is missing from environment',
      });
    }

    const protocol = isDev ? 'http' : 'https';

    return this.http.responseCheck(
      'firebase-auth',
      new URL(`${protocol}://${firebaseAuthDomain}`),
      (res) => res.status === 200,
    );
  }

  private checkFirebaseDb(isDev: boolean)
  {
    const firebaseDbUrl = isDev
      ? process.env.FIREBASE_STORAGE_EMULATOR_HOST
      : process.env.FIREBASE_DB_URL;

    if (!firebaseDbUrl) {
      return this.indicator.check('firebase-db').down({
        error: 'Firebase db url is missing from environment',
      });
    }

    return this.http.responseCheck(
      'firebase-db',
      isDev ? `http://${firebaseDbUrl}` : firebaseDbUrl,
      (res) => res.status === 200,
    );
  }
}
