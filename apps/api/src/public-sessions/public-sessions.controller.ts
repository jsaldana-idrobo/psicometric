import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CreatePublicSessionDto } from './dto/create-public-session.dto';
import {
  SavePublicSessionDto,
  SubmitPublicSessionDto,
} from './dto/save-public-session.dto';
import { PublicSessionsService } from './public-sessions.service';

@Controller('public-sessions')
export class PublicSessionsController {
  constructor(private readonly publicSessionsService: PublicSessionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreatePublicSessionDto,
  ) {
    return this.publicSessionsService.create(user.userId, dto);
  }

  @Get('patient/:patientId')
  @UseGuards(JwtAuthGuard)
  findByPatient(
    @CurrentUser() user: { userId: string },
    @Param('patientId') patientId: string,
  ) {
    return this.publicSessionsService.findByPatient(user.userId, patientId);
  }

  @Get('open/:token')
  getPublicSession(@Param('token') token: string) {
    return this.publicSessionsService.getPublicSession(token);
  }

  @Post('open/:token/save')
  saveProgress(
    @Param('token') token: string,
    @Body() dto: SavePublicSessionDto,
  ) {
    return this.publicSessionsService.saveProgress(token, dto);
  }

  @Post('open/:token/submit')
  submit(@Param('token') token: string, @Body() dto: SubmitPublicSessionDto) {
    return this.publicSessionsService.submit(token, dto);
  }
}
