import { Module } from '@nestjs/common';
import { ParkinglotController } from './parkinglot.controller';
import { ParkinglotService } from './parkinglot.service';
import { ParkingLotEntity } from './entity/parkinglot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLotEntity])],
  controllers: [ParkinglotController],
  providers: [ParkinglotService]
})
export class ParkinglotModule {}
