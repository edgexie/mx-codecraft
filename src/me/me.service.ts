import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MePage, UpdateMepage } from './me.schema'
import { Model } from 'mongoose'
import * as fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

@Injectable()
export class MeService {
  constructor(@InjectModel(MePage.name) private mePageModel: Model<MePage>) {}
  // 查询
  async getMePageById(id: string) {
    try {
      const item = await this.mePageModel.findById(id)
      // If no item is found with the given id, findById returns null
      return item
    } catch (error) {
      throw new Error(`Error getting item by id: ${error.message}`)
    }
  }

  async getMePageByFile() {
    const readFileAsync = promisify(fs.readFile)
    // const filePath = 'src/me/about-me.md'
    const filePath = resolve('./src/me/about-me.md')
    // const filePath = join(__dirname, './about-me.md')
    // const filePath = join(process.cwd(), '/src/me/about-me.md')
    try {
      const data = await readFileAsync(filePath, 'utf8')
      return data
    } catch (error) {
      throw new Error(`Error reading file ${filePath}: ${error.message}`)
    }
  }

  async getMePages() {
    return this.mePageModel.find()
  }

  // 添加
  create(mePage: MePage) {
    mePage.createTime = new Date()
    const createMePage = new this.mePageModel(mePage)
    return createMePage.save()
  }

  // 修改
  async update(updateMepage: UpdateMepage) {
    return this.mePageModel.findOneAndUpdate(
      { _id: updateMepage.id },
      updateMepage,
      {
        new: true,
      },
    )
  }

  // 删除
  delete(id: string) {
    return this.mePageModel.findByIdAndDelete({ _id: id })
  }
}
