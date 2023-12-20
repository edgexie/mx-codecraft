import { IsString, IsDate } from 'class-validator'

export class MePageDto {
  @IsString()
  content: string

  @IsDate()
  createTime: Date

  @IsDate()
  updateTime: Date
}
