import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly jwtExpiresIn: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpiresIn =
      this.configService.get<number>('JWT_EXPIRES_IN') ?? 28800;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.buildAuthResponse(
      String(user.id),
      String(user.email),
      String(user.fullName),
    );
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Sesión inválida');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      signatureName: user.signatureName,
      licenseNumber: user.licenseNumber,
    };
  }

  private buildAuthResponse(userId: string, email: string, fullName: string) {
    const token = this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: this.jwtExpiresIn,
      },
    );

    return {
      token,
      user: {
        id: userId,
        email,
        fullName,
      },
    };
  }
}
