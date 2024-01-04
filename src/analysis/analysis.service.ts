import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Visit } from './visit.schema'
import { Model } from 'mongoose'
import { VisitRecords } from './visit-records.schema'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import axios from 'axios'
import { IpInfo } from './ip-info.schema'

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<Visit>,
    @InjectModel(IpInfo.name) private ipInfoModel: Model<IpInfo>,
    @InjectModel(VisitRecords.name)
    private visitRecordsModel: Model<VisitRecords>,
    @Inject(REQUEST) private request: Request,
  ) {}

  // 更新访问量
  async update(path) {
    if (!path) {
      // 为什么报错没有返回给前端
      throw new HttpException('path 没有传', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    try {
      const ipInfo = await this.createRecord(path)
      const res = await this.visitModel.findOneAndUpdate(
        { path },
        { $inc: { count: 1 }, updateTime: new Date() },
        { upsert: true, new: true }, // 设置 upsert 选项为 true，表示如果找不到匹配的文档，则插入新的文档
      )
      return { visitCountInfo: res, ipInfo }
    } catch (err) {
      throw new HttpException('这条记录还没有创建', HttpStatus.BAD_REQUEST)
    }
  }

  // 获取访问量
  async getVisitCount(path) {
    return this.update(path)
  }

  // 获取访问ip
  getIpAddress(): string {
    const forwardedFor = this.request.headers['x-forwarded-for'] as string
    const realIp = this.request.headers['x-real-ip'] as string

    // 优先使用 X-Forwarded-For 头部
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : realIp || this.request.ip

    return ip
  }

  // 存ip
  async createIp(ipInfo: IpInfo) {
    const item = new this.ipInfoModel(ipInfo)
    return await item.save()
  }

  // 查询数据库里是否有ip，如果没有就创建一条再返回
  async getIpInfo(): Promise<IpInfo> {
    const ip = this.getIpAddress()
    const res = await this.ipInfoModel.findOne({ ip })
    if (!res) {
      const ipInfo = await axios.get(
        `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`,
      )
      const data: IpInfo = ipInfo.data
      return await this.createIp(data)
    } else {
      return res
    }
  }

  // 记录一条访问数据
  async createRecord(path) {
    try {
      const ipInfo = await this.getIpInfo()
      const [lat, lng] = (ipInfo.loc || '0,0').split(',').map(parseFloat)
      const item = new this.visitRecordsModel({
        path,
        canUse: true,
        ip: this.getIpAddress(),
        city: ipInfo.city,
        region: ipInfo.region,
        country: ipInfo.country,
        lat,
        lng,
        createTime: new Date(),
      })
      const res = await item.save()
      return res
    } catch (err) {
      console.log(err)
    }
  }
}
