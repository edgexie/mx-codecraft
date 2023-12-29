import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Users {
  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  phoneNumber: number

  @Prop()
  pwd: string

  @Prop()
  createTime: Date

  @Prop()
  updateTime: Date
}

export const UsersSchema = SchemaFactory.createForClass(Users)

UsersSchema.pre('save', function (next) {
  // 如何给所有的schema设置，保存前的updatetime更新
  this.updateTime = new Date()
  next()
})
