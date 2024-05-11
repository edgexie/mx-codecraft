import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { InviteCode, InviteCodeSchema } from './invite-code.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from 'src/users/users.module'
import { MeModule } from 'src/me/me.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InviteCode.name, schema: InviteCodeSchema },
    ]),
    UsersModule,
    MeModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
