import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class MePage {
  @Prop({ required: true })
  content: string

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const MePageSchema = SchemaFactory.createForClass(MePage)

MePageSchema.pre('save', function (next) {
  this.updateTime = new Date()
  next()
})
