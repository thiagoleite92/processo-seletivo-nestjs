import { Addresses } from '../entities';

export const AddressesProviders = [
  {
    provide: 'ADDRESSES_REPOSITORY',
    useValue: Addresses,
  },
];
