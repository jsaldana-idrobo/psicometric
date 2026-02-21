import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { AUTH_COOKIE_NAME } from './auth.constants';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authResponse = await this.authService.login(dto.email, dto.password);
    this.setAuthCookie(response, authResponse.token);
    return authResponse.user;
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.isProduction(),
      path: '/',
    });

    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: { userId: string }) {
    return this.authService.getProfile(user.userId);
  }

  private setAuthCookie(response: Response, token: string) {
    response.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.isProduction(),
      maxAge: this.getCookieMaxAge(),
      path: '/',
    });
  }

  private getCookieMaxAge() {
    const jwtExpirationSeconds =
      this.configService.get<number>('JWT_EXPIRES_IN') ?? 28800;
    return jwtExpirationSeconds * 1000;
  }

  private isProduction() {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }
}
