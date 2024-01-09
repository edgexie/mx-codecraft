import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import axios from 'axios'
@Injectable()
export class Esp8266Service {
  private ESP8266_URL = process.env.ESP8266_URL
  async getHello() {
    try {
      const res = await axios.get(this.ESP8266_URL)
      return res.data
    } catch (err) {
      throw new HttpException('获取失败', HttpStatus.FORBIDDEN)
    }
  }
  async getLedStatus() {
    try {
      const res = await axios.get(this.ESP8266_URL + '/led')
      return res.data
    } catch (err) {
      throw new HttpException('获取失败', HttpStatus.FORBIDDEN)
    }
  }

  async handleLed(checked) {
    try {
      return (await axios.post(this.ESP8266_URL + '/led', { checked })).data
    } catch (err) {
      throw new HttpException('操作失败', HttpStatus.FORBIDDEN)
    }
  }
}
