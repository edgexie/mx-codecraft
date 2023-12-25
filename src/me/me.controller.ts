import { MePageDto, UpdateMepageDto } from './me.dto'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MeService } from './me.service'

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  getMePages() {
    return this.meService.getMePages()
  }

  @Get('by-file')
  getMePageByFile() {
    return this.meService.getMePageByFile()
  }

  @Get(':id')
  getMePageById(@Param('id') id: string) {
    return this.meService.getMePageById(id)
  }

  @Post()
  createMePage(@Body() mePageDto: MePageDto) {
    return this.meService.create(mePageDto)
  }

  @Put()
  update(@Body() updateMepageDto: UpdateMepageDto) {
    return this.meService.update(updateMepageDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.meService.delete(id)
  }
}
