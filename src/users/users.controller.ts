import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { Users } from './users.schema'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userInfo: Users) {
    return this.usersService.create(userInfo)
  }

  @Post('login')
  login(@Body() userInfo: Users) {
    return this.usersService.login(userInfo)
  }
}
