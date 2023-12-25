import { Module } from '@nestjs/common'
import { AnalysisService } from './analysis.service'
import { AnalysisController } from './analysis.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Visit, VisitSchema } from './visit.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visit.name,
        schema: VisitSchema,
      },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
