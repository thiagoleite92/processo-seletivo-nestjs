import { AddressDTO } from 'src/common/dtos/address-dto';
import { CreateAddressDTO } from '../../../common/dtos/create-address-dto';

export class InMemoryAddressesRepository {
  items: AddressDTO[] = [];

  async create({ cep, city, neighborhood, number, street, uf, complement }: CreateAddressDTO) {
    this.items.push({
      cep,
      city,
      neighborhood,
      number,
      street,
      uf,
      complement,
      id: Math.floor(Math.random() * 10000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
