import { Controller, Get, Query, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 创建验证码
  @Post()
  create() {
    return this.authService.create()
  }

  // 分页获取列表
  @Get()
  getList(
    @Query('pageSize') pageSize: number,
    @Query('pageNumb') pageNumb: number,
  ) {
    return this.authService.getList(pageSize, pageNumb)
  }
  // 验证
  @Get('validate-code')
  validate(@Query('code') code: string) {
    return this.authService.validate(code)
  }

  @Get('newest-invite-code')
  getNewstInviteCode() {
    return this.authService.getNewstInviteCode()
  }
}
