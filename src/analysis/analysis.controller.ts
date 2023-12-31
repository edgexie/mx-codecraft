import { Controller, Get, Query } from '@nestjs/common'
import { AnalysisService } from './analysis.service'

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('ip')
  getIpAddress(): string {
    return this.analysisService.getIpAddress()
  }

  @Get('visit-count')
  getVisitCount(@Query('path') path: string) {
    return this.analysisService.getVisitCount(path)
  }
}
