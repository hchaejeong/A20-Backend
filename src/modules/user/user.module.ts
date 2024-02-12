import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { GetUserHandler } from './queries/handlers/get-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository]), CqrsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, GetUserHandler],
  exports: [UserService],
})
export class UserModule {}
