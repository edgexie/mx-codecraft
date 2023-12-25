import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Visit } from './visit.schema'
import { Model } from 'mongoose'

@Injectable()
export class AnalysisService {
  constructor(@InjectModel(Visit.name) private visitModel: Model<Visit>) {}
  // 创建一条访问记录
  create(path) {
    const item = new this.visitModel({
      path,
      count: 1,
      canUse: true,
    })
    item.save()
  }

  // 更新访问量
  async update(path) {
    if (!path) {
      // 为什么报错没有返回给前端
      throw new HttpException('path 没有传', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    try {
      const res = await this.visitModel.findOneAndUpdate(
        { path },
        { $inc: { count: 1 } },
        { upsert: true, new: true }, // 设置 upsert 选项为 true，表示如果找不到匹配的文档，则插入新的文档
      )
      return res
    } catch (err) {
      throw new HttpException('这条记录还没有创建', HttpStatus.BAD_REQUEST)
    }
  }

  // 获取访问量
  async getVisitCount(path) {
    return this.update(path)
  }
}
