import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
  'https://spoton.kr',         // 운영
  /^http:\/\/localhost:\d+$/,  // 개발 (모든 localhost 포트 허용)
  ];

  app.useGlobalPipes(new ValidationPipe);
  // CORS 설정
  app.enableCors({
    //origin: '*',
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,               // 쿠키/헤더 허용 시 필요
  });
  const port = 8000;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
