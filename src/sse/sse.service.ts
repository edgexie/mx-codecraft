import { Injectable } from '@nestjs/common'
import { Response } from 'express'
@Injectable()
export class SseService {
  sendSseMessage(res: Response, data: any) {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }
}
