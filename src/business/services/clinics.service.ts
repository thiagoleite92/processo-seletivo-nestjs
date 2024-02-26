import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';
import { Addresses, Clinics } from 'src/common/entities';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { AddressesService } from './addresses.service';
import { BaseFilterDTO } from 'src/common/dtos/base-filter-dto';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private clinicsRepository: typeof Clinics,
    private readonly addressesService: AddressesService
  ) {}

  async list({ page, search, perPage }: BaseFilterDTO) {
    return this.clinicsRepository.findAll({
      include: { model: Addresses, as: 'address' },
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
          cnpj: {
            [Op.iLike]: `%${search}%`,
          },
          ownerName: {
            [Op.iLike]: `%${search}%`,
          },
        },
      },
      limit: Number(perPage),
      offset: (Number(page) - 1) * 10,
    });
  }

  async create(createClinicDto: CreateClinicDto) {
    await this.cnpjAlreadyRegistered(createClinicDto.cnpj);
    await this.createClinic(createClinicDto);
  }

  private async clinicExists(cnpj: string) {
    const clinic = await this.clinicsRepository.findOne({
      where: {
        [Op.or]: [{ cnpj }],
      },
    });

    return clinic;
  }

  async findClinicById(clinicId: number) {
    const clinic = await this.clinicsRepository.findByPk(clinicId, { include: { model: Addresses, as: 'address' } });

    if (!clinic) {
      throw new BadRequestException(null, ErrorMessages.COMPANY_NOT_FOUND);
    }

    return clinic;
  }

  async cnpjAlreadyRegistered(cnpj: string) {
    const clinic = await this.clinicExists(cnpj);

    if (clinic) {
      throw new ConflictException(null, ErrorMessages.CNPJ_ALREADY_REGISTERED);
    }
  }

  async createClinic({ cnpj, name, ownerName, phone, address }: CreateClinicDto) {
    const { id: addressId } = await this.addressesService.createAddress(address);

    await this.clinicsRepository.create({
      cnpj,
      name,
      ownerName,
      phone,
      addressId,
    });
  }

  async update(clinicId: number, { cnpj, name, ownerName, phone, address }: CreateClinicDto) {
    const clinic = await this.findClinicById(clinicId);

    if (cnpj !== clinic?.cnpj) {
      await this.cnpjAlreadyRegistered(cnpj);
    }

    const { id: addressId } = await this.addressesService.updateAddress(clinic?.addressId, address);

    clinic.name = name;
    clinic.cnpj = cnpj;
    clinic.ownerName = ownerName;
    clinic.phone = phone;
    clinic.addressId = addressId;

    await clinic.save();
  }

  async delete(clinicId: number) {
    const clinic = await this.findClinicById(clinicId);

    await this.clinicsRepository.destroy({
      where: { id: clinicId },
    });

    await this.addressesService.delete(clinic?.addressId);
  }
}
