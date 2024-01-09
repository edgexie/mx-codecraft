import { Module } from '@nestjs/common';
import { Esp8266Service } from './esp8266.service';
import { Esp8266Controller } from './esp8266.controller';

@Module({
  controllers: [Esp8266Controller],
  providers: [Esp8266Service],
})
export class Esp8266Module {}
