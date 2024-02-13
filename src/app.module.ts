import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './modules/openai/openai.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PostsModule } from './modules/posts/posts.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }), 
    CqrsModule,
    AuthModule, 
    DatabaseModule,
    OpenaiModule,
    PostsModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
