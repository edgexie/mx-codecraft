import { IsString, IsDate, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class MePageDto {
  @IsString()
  id: string

  @IsString()
  content: string

  @IsDate()
  createTime: Date

  @IsDate()
  updateTime: Date
}

export class UpdateMepageDto extends PartialType(MePageDto) {
  @IsNotEmpty()
  id: string
}
