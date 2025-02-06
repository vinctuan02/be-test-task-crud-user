import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
// import * as cors from 'cors';
// import helmet from 'helmet';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app)

  // app.use(
  //   helmet({
  //     crossOriginResourcePolicy: false, // Cho phép CORS
  //     crossOriginOpenerPolicy: false,
  //   }),
  // );

  // Bật CORS đúng cách
  // app.enableCors({
  //   origin: '*',
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  //   optionsSuccessStatus: 200,
  // });

  const logger = new Logger('Bootstrap');

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
