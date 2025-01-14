import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: 'http://localhost:5173',  // Allow the specific frontend origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,  // Use this if you're sending credentials
  });
  await app.listen(3000);
}
bootstrap();
