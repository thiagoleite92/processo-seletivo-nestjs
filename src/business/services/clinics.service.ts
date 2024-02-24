import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';
import { Clinics } from 'src/common/entities';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private clinicsRepository: typeof Clinics
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

  async clinicAlreadyRegistered(cnpj: string) {
    const clinic = await this.clinicExists(cnpj);

    if (clinic) {
      throw new ConflictException(null, ErrorMessages.CNPJ_ALREADY_REGISTERED);
    }
  }

  async createClinic({ cnpj, name, website }: CreateClinicDto) {
    await this.clinicsRepository.create<Clinics>({
      cnpj,
      name,
      website,
    });
  }
}
