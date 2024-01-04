import { Controller, Get, Query, Post, Body, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Users } from 'src/users/users.schema'
import { UsersService } from 'src/users/users.service'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Get('ip')
  getIpAddress(@Req() request: Request): string {
    const forwardedFor = request.headers['x-forwarded-for'] as string
    const realIp = request.headers['x-real-ip']

    // 优先使用 X-Forwarded-For 头部
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : realIp || request.ip

    return `Your real IP address is ${ip}`
  }
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
