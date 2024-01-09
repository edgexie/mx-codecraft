import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
    credentials: true, // 是否允许发送凭证（例如 cookies）
    allowedHeaders: ['Content-Type'], // 允许的请求头
  })
  await app.listen(3000)
}
bootstrap()
