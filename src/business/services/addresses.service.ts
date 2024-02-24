import { Inject, Injectable } from '@nestjs/common';
import { AddressDto } from 'src/common/dtos/address-dto';
import { Addresses } from 'src/common/entities';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private addressesRepository: typeof Addresses
  ) {}

  async createAddress({ cep, city, district, number, state, street }: AddressDto) {
    const address = await this.addressesRepository.create<Addresses>({
      cep,
      city,
      district,
      number: String(number),
      state,
      street,
    });
    return address;
  }
}
