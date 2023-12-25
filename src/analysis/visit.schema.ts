import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Visit {
  @Prop()
  path: string
  @Prop()
  count: number
  @Prop()
  canUse: boolean

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const VisitSchema = SchemaFactory.createForClass(Visit)

VisitSchema.pre('save', function (next) {
  this.updateTime = new Date()
  next()
})
