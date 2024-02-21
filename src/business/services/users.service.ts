import { ErrorMessages } from './../../common/enums/error-messages.enum';
import { CreateUserDto } from './../../common/dtos/create-user-dto';
import { Users } from './../../common/entities';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.userAlreadyRegistered(createUserDto.cpf);
    await this.createUser(createUserDto);
  }

  async list() {
    return (await this.usersRepository.findAll()).map((user: Users) => {
      return { name: user.name, email: user.email, phoneNumber: user.phoneNumber, cpf: user.cpf };
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    await this.usersRepository.create<Users>({
      cpf: createUserDto.cpf,
      name: createUserDto.name,
      password: bcrypt.hashSync(createUserDto.password, Number(process.env.SALT)),
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
    });
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>();
  }

  findOne(id: number) {
    return this.usersRepository.findOne<Users>({
      where: {
        id,
      },
    });
  }

  findByCPF(cpf: string) {
    return this.usersRepository.findOne<Users>({
      where: {
        cpf,
      },
    });
  }

  validateLogin(document: string) {
    return !!this.findByCPF(document);
  }

  private async userExists(cpf: string) {
    const user = await this.usersRepository.findOne({
      where: {
        [Op.or]: [{ cpf }],
      },
    });
    return user;
  }

  private async userAlreadyRegistered(cpf: string) {
    const user = await this.userExists(cpf);
    if (user) {
      throw new ConflictException(null, ErrorMessages.USER_ALREADY_REGISTERED);
    }
  }
}
