import { Injectable, HttpService } from '@nestjs/common';
import { PriceDTO } from './dto/price.dto';

@Injectable()
export class PriceService {
    constructor(private http: HttpService) { }
    async getCodes() {
        try {
            const answer = await this.http.get('https://economia.awesomeapi.com.br/json/all').toPromise();
            const array = Object.entries(answer.data);
            return array.map(elem => {
                return {
                    code: elem[0],
                    name: elem[1]['name'],
                    value: elem[1]['ask'],
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async convertValue(code: string, value: number): Promise<PriceDTO> {
        try {
            const answer = await this.http.get('https://economia.awesomeapi.com.br/json/all').toPromise();
            const array = Object.entries(answer.data);
            const currentCoin = array.filter(elem => {
                return elem[0] == code;
            })
            
            if(!currentCoin) {
                throw new Error('Moeda nao disponivel');
            }

            const price: PriceDTO  = new PriceDTO();
            price.code = code;
            price.ask = value / Number(currentCoin[0][1]["ask"]);
            price.value = Number(currentCoin[0][1]["ask"]);
            return price;
        } catch (error) {
            throw error;
        }
    }
}
