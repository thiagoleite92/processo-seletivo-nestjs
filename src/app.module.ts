import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DataAccessModule } from './data-access/data-access.module';
import { DistributionModule } from './distribution/distribution.module';
import { BusinessModule } from './business/business.module';
import { Dialect } from 'sequelize';
import { Users } from './common/entities';
import { LocalStrategy } from './common/auth/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['prod.env', '.env'],
    }),
    BusinessModule,
    DataAccessModule,
    DistributionModule,
    SequelizeModule.forRoot({
      models: [Users],
      autoLoadModels: true,
      synchronize: true,
      dialect: process.env.DATABASE_DIALECT as Dialect,
      port: 5432,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      define: {
        timestamps: false,
      },
    }),
  ],
  controllers: [],
  providers: [LocalStrategy],
})
export class AppModule {}
