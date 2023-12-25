import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { MeModule } from './me/me.module'
import { ConfigModule } from '@nestjs/config'
import { AnalysisModule } from './analysis/analysis.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { AuthModule } from './auth/auth.module'
import { CustomeResponseInterceptor } from './interceptors/custome-response.interceptor'
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
    AnalysisModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomeResponseInterceptor,
    },
  ],
})
export class AppModule {}
