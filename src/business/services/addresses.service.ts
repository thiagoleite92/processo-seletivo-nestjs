import { Inject, Injectable } from '@nestjs/common';
import { AddressDto } from 'src/common/dtos/address-dto';
import { Addresses } from 'src/common/entities';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private addressesRepository: typeof Addresses
  ) {}

  async createAddress({ cep, city, neighborhood, number, uf, street }: AddressDto) {
    const address = await this.addressesRepository.create<Addresses>({
      cep,
      city,
      neighborhood,
      number: String(number),
      uf,
      street,
    });
    return address;
  }

  async updateAddress(addressId: number, { cep, city, neighborhood, number, uf, street }: AddressDto) {
    const address = await this.findAddress(addressId);

    if (address) {
      address.city = city;
      address.cep = cep;
      address.neighborhood = neighborhood;
      address.number = String(number);
      address.uf = uf;
      address.street = street;

      await address.save();
      return address;
    }

    return await this.createAddress({ cep, city, neighborhood, number, uf, street });
  }

  async findAddress(addressId: number) {
    return await this.addressesRepository.findByPk<Addresses>(addressId);
  }

  async delete(addressId: number) {
    await this.addressesRepository.destroy<Addresses>({ where: { id: addressId } });
  }
}
