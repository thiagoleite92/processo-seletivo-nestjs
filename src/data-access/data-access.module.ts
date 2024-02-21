import { UsersProviders } from './../common/providers/users.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([])],
  exports: [SequelizeModule],
  providers: [...UsersProviders],
})
export class DataAccessModule {}
