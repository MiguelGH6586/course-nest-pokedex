import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove all filed that not included in Dto
      forbidNonWhitelisted: true, // Throw bad request is request has field not required
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
