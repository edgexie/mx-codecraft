import { MePage, UpdateMepage } from './me.schema'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MeService } from './me.service'

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  getMePages() {
    return this.meService.getMePages()
  }

  @Get('page')
  getMePage() {
    return this.meService.getMePage()
  }

  @Get('by-file')
  getMePageByFile() {
    return this.meService.getMePageByFile()
  }

  @Get(':id')
  getMePageById(@Param('id') id: string) {
    return this.meService.getMePageById(id)
  }

  // 创建一条内容
  @Post()
  createMePage(@Body() mePage: MePage) {
    return this.meService.create(mePage)
  }

  @Put()
  update(@Body() updateMepage: UpdateMepage) {
    return this.meService.update(updateMepage)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.meService.delete(id)
  }
}
