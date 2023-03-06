import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 3000;
  app.enableCors();
  await app.listen(3000, '0.0.0.0');

  Logger.log(`Server running on port ${PORT}`, 'Bootstrap');
}
bootstrap();
