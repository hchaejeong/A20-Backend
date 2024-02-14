import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from './entity/borrow.entity';
import { LendEntity } from './entity/lend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, LendEntity])],
  controllers: [ShareController],
  providers: [ShareService]
})
export class ShareModule {}
