import { Controller, Get, Param, Res, Sse, Response } from '@nestjs/common'
import { SseService } from './sse.service'
import { Observable, interval, map, takeUntil } from 'rxjs'

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}
  @Get('use-get-decorator')
  async sseEndpoint(@Response() res) {
    let count = 0
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    })

    const timer = setInterval(() => {
      if (count === 10) {
        clearInterval(timer)
        res.end()
      }
      this.sseService.sendSseMessage(res, {
        message: `收到第 ${count++} 条消息`,
      })
    }, 1000)

    res.on('close', () => {
      console.log('客户端断开了')
      res.end()
    })
  }

  @Sse('use-sse-decorator')
  sendServerMessage(
    @Param() params,
    @Res() res,
  ): Observable<{ message: string }> {
    let count = 0
    const close$ = new Observable((observer) => {
      res.on('close', () => {
        observer.next()
        observer.complete()
        console.log('客户端断开了')
      })
    })
    const observable$ = interval(1000).pipe(
      map(() => ({ message: `收到第 ${count++} 条消息` })),
      takeUntil(close$),
    )
    return observable$
  }
}
