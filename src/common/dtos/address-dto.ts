export interface AddressDTO {
  cep: string;
  city: string;
  street: string;
  uf: string;
  neighborhood: string;
  complement?: string;
  number?: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
