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

  async updateAddress(addressId: number, { cep, city, district, number, state, street }: AddressDto) {
    const address = await this.findAddress(addressId);

    if (address) {
      address.city = city;
      address.cep = cep;
      address.district = district;
      address.number = String(number);
      address.state = state;
      address.street = street;

      await address.save();
      return address;
    }

    return await this.createAddress({ cep, city, district, number, state, street });
  }

  async findAddress(addressId: number) {
    return await this.addressesRepository.findByPk<Addresses>(addressId);
  }

  async delete(addressId: number) {
    await this.addressesRepository.destroy<Addresses>({ where: { id: addressId } });
  }
}
