import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PriceModule } from './price/price.module';

@Module({
  imports: [PriceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
