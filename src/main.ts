import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors();
  //api docs
  const options = new DocumentBuilder()
    .setTitle('G&G')
    .setDescription('The `G&G` API description')
    .setVersion('0.0.1')
    .addTag('cois')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //run
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
