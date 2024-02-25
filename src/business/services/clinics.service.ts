import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';
import { Clinics } from 'src/common/entities';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { AddressesService } from './addresses.service';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private clinicsRepository: typeof Clinics,
    private readonly addressesService: AddressesService
  ) {}

  async list() {
    return this.clinicsRepository.findAll();
  }

  async create(createClinicDto: CreateClinicDto) {
    await this.clinicAlreadyRegistered(createClinicDto.cnpj);
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
    const clinic = await this.clinicsRepository.findByPk(clinicId);

    if (!clinic) {
      throw new BadRequestException(null, ErrorMessages.COMPANY_NOT_FOUND);
    }

    return clinic;
  }

  async clinicAlreadyRegistered(cnpj: string) {
    const clinic = await this.clinicExists(cnpj);

    if (clinic) {
      throw new ConflictException(null, ErrorMessages.CNPJ_ALREADY_REGISTERED);
    }
  }

  async createClinic({ cnpj, name, website, address }: CreateClinicDto) {
    const { id: addressId } = await this.addressesService.createAddress(address);

    await this.clinicsRepository.create<Clinics>({
      cnpj,
      name,
      website,
      addressId,
    });
  }

  async update(clinicId: number, { cnpj, name, website, address }: CreateClinicDto) {
    const clinic = await this.findClinicById(clinicId);

    if (cnpj !== clinic?.cnpj) {
      await this.clinicAlreadyRegistered(cnpj);
    }

    const { id: addressId } = await this.addressesService.updateAddress(clinic?.addressId, address);

    clinic.name = name;
    clinic.cnpj = cnpj;
    clinic.website = website;
    clinic.addressId = addressId;

    await clinic.save();

    return clinic;
  }

  async delete(clinicId: number) {
    const clinic = await this.findClinicById(clinicId);

    await this.clinicsRepository.destroy({
      where: { id: clinicId },
    });

    await this.addressesService.delete(clinic?.addressId);
  }
}
