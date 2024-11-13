import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando CORS
  app.enableCors({
    origin: 'http://localhost:8100', // Permite apenas o frontend local
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite cookies
  });

  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
