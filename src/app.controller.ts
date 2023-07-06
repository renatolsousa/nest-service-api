import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';

@Controller()
export class AppController {
  token: string;

  constructor() {
    this.token = '98sd7fs6df54sd6f5s7df9';
  }

  @Get('/:token')
  checkToken(@Param('token') token: string): any {
    if (token != this.token) {
      throw new UnauthorizedException('access denied');
    }
    return {
      status: true,
      message: 'access granted',
    };
  }
}
