import { Body, Controller, Get, Post } from '@nestjs/common'
import { Esp8266Service } from './esp8266.service'

@Controller('esp8266')
export class Esp8266Controller {
  constructor(private readonly esp8266Service: Esp8266Service) {}
  @Get()
  getHello() {
    return this.esp8266Service.getHello()
  }

  @Get('led')
  getLedStatus() {
    return this.esp8266Service.getLedStatus()
  }

  @Post('led')
  async handleLed(@Body('checked') checked: boolean) {
    return this.esp8266Service.handleLed(checked)
  }
}
