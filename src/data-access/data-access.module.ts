import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ClinicsProviders, UsersProviders } from 'src/common/providers';

@Module({
  imports: [SequelizeModule.forFeature([])],
  exports: [SequelizeModule],
  providers: [...UsersProviders, ...ClinicsProviders],
})
export class DataAccessModule {}
