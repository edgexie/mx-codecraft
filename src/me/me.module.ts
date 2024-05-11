import { Module } from '@nestjs/common'
import { MeService } from './me.service'
import { MeController } from './me.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { MePage, MePageSchema } from './me.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MePage.name, schema: MePageSchema }]),
  ],
  controllers: [MeController],
  providers: [MeService],
  exports: [MeService],
})
export class MeModule {}
