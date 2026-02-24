import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { TestsService } from './tests.service';

@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  findAll(@Query('summary') summary?: string) {
    const summaryOnly = summary === '1' || summary === 'true';
    return this.testsService.findAll(summaryOnly);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(id);
  }
}
