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
  // 如何给所有的schema设置，保存前的updatetime更新
  this.updateTime = new Date()
  next()
})
