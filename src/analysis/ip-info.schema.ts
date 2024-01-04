import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class IpInfo {
  @Prop()
  ip: string
  @Prop()
  city: string
  @Prop()
  region: string
  @Prop()
  country: string
  @Prop()
  loc: string

  @Prop()
  canUse: boolean

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const IpInfoSchema = SchemaFactory.createForClass(IpInfo)

IpInfoSchema.pre('save', function (next) {
  this.updateTime = new Date()
  next()
})
