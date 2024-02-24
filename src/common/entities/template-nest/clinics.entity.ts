import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { Addresses } from './addresses.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Clinics extends Model<Clinics> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website: string;

  @BelongsTo(() => Addresses, { onDelete: 'SET NULL', foreignKey: 'id' })
  addressId: Addresses;
}
