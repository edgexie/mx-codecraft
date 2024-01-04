import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class VisitRecords {
  @Prop()
  path: string
  @Prop()
  ip: string
  @Prop()
  city?: string
  @Prop()
  region?: string
  @Prop()
  country?: string
  @Prop()
  lat?: number
  @Prop()
  lng?: number

  @Prop()
  canUse: boolean

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const VisitRecordsSchema = SchemaFactory.createForClass(VisitRecords)

VisitRecordsSchema.pre('save', function (next) {
  this.updateTime = new Date()
  next()
})
