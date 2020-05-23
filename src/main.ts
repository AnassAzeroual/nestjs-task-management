import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
