import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Users } from './users.schema'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  // 用户名查重

  // 注册
  async create(userInfo: Users) {
    if (await this.usersModel.findOne({ name: userInfo.name })) {
      throw new ConflictException('用户名重复')
    }
    const user = new this.usersModel(userInfo)
    return user.save()
  }

  // 登录
  async login(userInfo: { name: string; pwd: string }) {
    const res = await this.usersModel.findOne({ name: userInfo.name })
    if (!res) {
      throw new UnauthorizedException('没有这个用户 ')
    }

    if (res.pwd === userInfo.pwd) {
      return true
    } else {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED)
    }
  }
}
