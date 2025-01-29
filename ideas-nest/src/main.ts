import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL,
  });

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
