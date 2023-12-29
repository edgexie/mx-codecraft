import { Controller, Get, Query, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Users } from 'src/users/users.schema'
import { UsersService } from 'src/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  // 登录
  @Post('login')
  login(@Body() userInfo: Users) {
    return this.usersService.login(userInfo)
  }
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
