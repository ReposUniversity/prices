import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceDTO } from './dto/price.dto';

@Controller('api/price')
export class PriceController {
    constructor(private readonly priceService: PriceService) { }
    @Get('code')
    get(): any {
        return this.priceService.getCodes();
    }

    @Get(':code/:value')
    getHello(@Param('code') code: string, @Param('value') value: number): Promise<PriceDTO> {
        return this.priceService.convertValue(code, value);
    }
}
