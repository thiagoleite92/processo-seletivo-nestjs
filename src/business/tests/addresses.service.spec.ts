import { Test, TestingModule } from '@nestjs/testing';

import { AddressesService } from '../services/addresses.service';
import { InMemoryAddressesRepository } from './in-memory-repository/in-memory-clinics-repository';

let addressesRepository: InMemoryAddressesRepository;

describe('Service -> Addresses', () => {
  let sut: AddressesService;
  addressesRepository = new InMemoryAddressesRepository();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AddressesService, { provide: 'ADDRESSES_REPOSITORY', useValue: addressesRepository }],
    }).compile();

    sut = moduleRef.get<AddressesService>(AddressesService);
  });

  it('should AddressesService be defined', async () => {
    expect(sut).toBeDefined();
  });

  it('should be able to save a address', async () => {
    sut.createAddress({
      cep: '50711180',
      city: 'Recife',
      uf: 'pe',
      street: 'rua elizeu cavalcanti',
      number: '',
      neighborhood: 'Cordeiro',
      complement: '',
    });

    console.log(addressesRepository.items[0].id);

    expect(addressesRepository.items[0].id).toBeDefined();
  });
});
