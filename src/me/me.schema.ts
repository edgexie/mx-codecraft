import { PartialType } from '@nestjs/mapped-types'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsString } from 'class-validator'
@Schema()
export class MePage {
  @Prop({ required: true })
  @IsString()
  content: string

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const MePageSchema = SchemaFactory.createForClass(MePage)

export class UpdateMepage extends PartialType(MePage) {
  @IsNotEmpty()
  id: string
}

MePageSchema.pre('save', function (next) {
  // 如何给所有的schema设置，保存前的updatetime更新
  this.updateTime = new Date()
  next()
})
