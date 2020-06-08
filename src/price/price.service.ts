import { Injectable, HttpService } from '@nestjs/common';
import { PriceDTO } from './dto/price.dto';

@Injectable()
export class PriceService {
    constructor(private http: HttpService) { }
    async getCodes() {
        try {
            const answer = await this.http.get('https://economia.awesomeapi.com.br/json/all').toPromise()
            const array = Object.entries(answer.data)
            return array.map(elem => {
                return {
                    code: elem[1]['code'],
                    name: elem[1]['name'],
                }
            })
        } catch (error) {
            throw error;
        }
    }
    convertValue(coin: string, value: number): PriceDTO {
        const price: PriceDTO  = new PriceDTO();
        price.code = coin
        price.ask = 433
        price.value = value
        return price;
    }
}
