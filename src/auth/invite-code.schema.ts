import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class InviteCode {
  @Prop({ length: 6 })
  code: number

  @Prop()
  canUse: boolean

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const InviteCodeSchema = SchemaFactory.createForClass(InviteCode)

InviteCodeSchema.pre('save', function (next) {
  this.updateTime = new Date()
  next()
})
