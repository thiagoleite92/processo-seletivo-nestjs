import { CreateAddressDTO } from './create-address-dto';

export interface ClinicDTO {
  id: number;
  name: string;
  cnpj: string;
  ownerName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  addressId: number;
  address: CreateAddressDTO;
}
