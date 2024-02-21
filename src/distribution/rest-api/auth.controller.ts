import { LoginDto } from './../../common/dtos/login.dto';
import { LocalAuthGuard } from './../../common/auth/local-auth.guard';
import { AuthService } from './../../common/auth/auth.service';
import { Controller, Request, Post, UseGuards, Res, HttpCode } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Request() req, @Res() res) {
    return this.authService.login(req.user, res);
  }
}
