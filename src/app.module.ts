import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { OpenaiModule } from './openai/openai.module';
import { ParkinglotModule } from './parkinglot/parkinglot.module';
import { ShareModule } from './share/share.module';

@Module({
  imports: [AuthenticationModule, OpenaiModule, ParkinglotModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
