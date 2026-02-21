import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateResultNotesDto } from './dto/update-result-notes.dto';
import { ResultsService } from './results.service';

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateTestResultDto,
  ) {
    return this.resultsService.create(user.userId, dto);
  }

  @Get('patient/:patientId')
  findByPatient(
    @CurrentUser() user: { userId: string },
    @Param('patientId') patientId: string,
  ) {
    return this.resultsService.findByPatient(user.userId, patientId);
  }

  @Patch(':id/notes')
  updateNotes(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateResultNotesDto,
  ) {
    return this.resultsService.updateNotes(user.userId, id, dto);
  }
}
