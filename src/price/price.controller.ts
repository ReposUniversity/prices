import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceDTO } from './dto/price.dto';

@Controller('price')
export class PriceController {
    constructor(private readonly priceService: PriceService) { }
    @Get('code')
    get(): any {
        return this.priceService.getCodes();
    }

    @Get(':coin/:value')
    getHello(@Param('coin') coin: string, @Param('value') value: number): PriceDTO {
        return this.priceService.convertValue(coin, value);
    }
}
