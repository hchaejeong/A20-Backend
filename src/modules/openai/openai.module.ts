import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './services/openai.service';

@Module({
  imports: [ConfigModule],
  controllers: [OpenaiController],
  providers: [OpenaiService]
})
export class OpenaiModule {}
