import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
