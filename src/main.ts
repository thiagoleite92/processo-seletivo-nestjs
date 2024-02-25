import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      enableDebugMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.enableCors({ ...corsOptions });

  const config = new DocumentBuilder().setTitle('Template Api').setVersion('1.0').addTag('Api').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Listen na PORT: ${process.env.PORT}`);
  await app.listen(3001);
}

bootstrap();
