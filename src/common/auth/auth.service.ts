import { UsersService } from './../../business/services/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Utils } from '../utils/utils';
import { Users } from '../entities';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async generateToken(cpf: string, sub: number) {
    const payload = { cpf, sub };
    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: Utils.calculateMissingSeconds23hours(),
    });
    return accessToken;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByCPF(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: Users, res: any) {
    const accessToken: string = await this.generateToken(user.cpf, user.id);

    res.status(HttpStatus.OK).json({
      accessToken,
    });
  }
}
