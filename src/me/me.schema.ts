import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MePageDocument = HydratedDocument<MePage>

@Schema()
export class MePage {
  @Prop()
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
