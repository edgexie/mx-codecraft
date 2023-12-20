import { MePageDto } from './me.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MePage } from './me.schema'
import { Model } from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

@Injectable()
export class MeService {
  constructor(@InjectModel(MePage.name) private mePageModel: Model<MePage>) {}

  async getMePageById(id: string) {
    try {
      const item = await this.mePageModel.findById(id).exec()

      // If no item is found with the given id, findById returns null
      return item
    } catch (error) {
      throw new Error(`Error getting item by id: ${error.message}`)
    }
  }

  async getMePageByFile() {
    const readFileAsync = promisify(fs.readFile)
    const filePath = 'src/me/about-me.md'
    try {
      const data = await readFileAsync(filePath, 'utf8')
      return data
    } catch (error) {
      throw new Error(`Error reading file ${filePath}: ${error.message}`)
    }
  }
  async getMePages() {
    return this.mePageModel.find().exec()
  }

  async create(mePageDto: MePageDto) {
    mePageDto.createTime = new Date()
    const createMePage = new this.mePageModel(mePageDto)
    return createMePage.save()
  }
}
