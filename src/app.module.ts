import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [AuthenticationModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
