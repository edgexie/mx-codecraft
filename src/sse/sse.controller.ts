import { Controller, Get, Response } from '@nestjs/common'
import { SseService } from './sse.service'

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}
  @Get()
  async sseEndpoint(@Response() res) {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
    })

    setInterval(() => {
      this.sseService.sendSseMessage(res, {
        message: 'This is a real-time message.',
      })
    }, 1000)

    res.on('close', () => {
      console.log('Client disconnected')
      res.end()
    })
  }
}
