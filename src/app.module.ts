import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { MeModule } from './me/me.module'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory() {
        return {
          uri: `mongodb+srv://${process.env.NAME}:${process.env.PWD}@${process.env.URI}`,
          connectionName: process.env.CONNECTION_NAME,
        }
      },
    }),
    MeModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
