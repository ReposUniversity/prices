import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PriceModule } from './price/price.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PriceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
