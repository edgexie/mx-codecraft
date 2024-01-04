import { Module } from '@nestjs/common'
import { AnalysisService } from './analysis.service'
import { AnalysisController } from './analysis.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Visit, VisitSchema } from './visit.schema'
import { VisitRecords, VisitRecordsSchema } from './visit-records.schema'
import { IpInfo, IpInfoSchema } from './ip-info.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visit.name,
        schema: VisitSchema,
      },
      {
        name: VisitRecords.name,
        schema: VisitRecordsSchema,
      },
      {
        name: IpInfo.name,
        schema: IpInfoSchema,
      },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
