import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('patient/:patientId/pdf')
  async getPatientPdf(
    @CurrentUser() user: { userId: string },
    @Param('patientId') patientId: string,
    @Res() response: Response,
  ) {
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="informe-${patientId}.pdf"`,
    );

    await this.reportsService.streamPatientReport(
      user.userId,
      patientId,
      response,
    );
  }
}
