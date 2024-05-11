import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InviteCode } from './invite-code.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { generateRandomNumber } from '../utils'
import { MeService } from 'src/me/me.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly meService: MeService,
    @InjectModel(InviteCode.name)
    private inviteCodeModel: Model<InviteCode>,
  ) {
    this.createStartCode()
  }

  // 创建code
  async create() {
    const date = new Date()
    const item = new this.inviteCodeModel({
      createTime: date,
      canUse: true,
      code: generateRandomNumber(),
    })
    return await item.save()
  }

  // 验证
  async validate(code) {
    const expires = 24 * 60 * 60 * 1000
    try {
      const res = await this.inviteCodeModel.findOne({ code })
      if (res.canUse) {
        const newTime = new Date().getTime()
        if (newTime - res.createTime.getTime() < expires) {
          const content = await this.meService.getMePageById(
            '663ec526dbce36179a59e7d2',
          )
          return {
            content: content,
            flag: true,
          }
        } else {
          await this.inviteCodeModel.findByIdAndUpdate(res.id, {
            canUse: false,
          })
          return false
        }
      }
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  // 获取验证码列表
  getList(pageSize, pageNumb) {
    if (!pageSize || !pageNumb) {
      throw new HttpException(
        '没有传分页参数',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    pageNumb = pageNumb - 1
    try {
      const res = this.inviteCodeModel
        .find()
        .skip(pageNumb * pageSize) // notice here
        .limit(pageSize)
      return res
    } catch (err) {
      console.log(err)
    }
  }
  /**
   * ~~废弃~~
   */
  async updateTheTime(id) {
    return this.inviteCodeModel.findByIdAndUpdate(id, {
      updateTime: new Date(),
    })
  }
  /**
   * ~~废弃~~
   */
  async createStartCode() {
    const count = await this.inviteCodeModel.countDocuments()
    if (count === 0) {
      this.create()
    }
  }

  /**
   * ~~废弃~~
   */
  async getNewstInviteCode() {
    return await this.inviteCodeModel.findOne().sort({ _id: -1 })
  }
}
