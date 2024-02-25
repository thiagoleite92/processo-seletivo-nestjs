import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Clinics } from './clinics.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Addresses extends Model<Addresses> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cep: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  neighborhood: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @HasOne(() => Clinics)
  clinics: Clinics[];
}
