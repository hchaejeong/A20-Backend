import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { OpenaiModule } from './modules/openai/openai.module';
import { ParkinglotModule } from './modules/parkinglot/parkinglot.module';
import { ShareModule } from './modules/share/share.module';

@Module({
  imports: [AuthenticationModule, OpenaiModule, ParkinglotModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
