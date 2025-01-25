import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<your-database-name>.firebaseio.com',
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
