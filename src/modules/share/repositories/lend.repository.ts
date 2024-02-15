import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LendEntity } from '../entity/lend.entity';

@Injectable()
export class LendRepository {
  constructor(
    @InjectRepository(LendEntity)
    private repository: Repository<LendEntity>,
  ) {}

  create(args: {
    lenderId: string;
    parkingLotName: string;
    lenderName: string;
    relation: string;
    phoneNumber: string;
    address: string;
    lat: number;
    lon: number;
    totalQty: number;
    resQty: number;
    baseRate: number;
    baseTime: number;
    addRate: number;
    addTime: number;
    operDay: string[];
  }): LendEntity {
    const {
      lenderId,
      parkingLotName,
      lenderName,
      relation,
      phoneNumber,
      address,
      lat,
      lon,
      totalQty,
      resQty,
      baseRate,
      baseTime,
      addRate,
      addTime,
      operDay,
    } = args;

    return this.repository.create({
      lenderId,
      parkingLotName,
      lenderName,
      relation,
      phoneNumber,
      address,
      lat,
      lon,
      totalQty,
      resQty,
      baseRate,
      baseTime,
      addRate,
      addTime,
      operDay,
    });
  }

  save(
    ...args: Parameters<Repository<LendEntity>['save']>
  ): ReturnType<Repository<LendEntity>['save']> {
    return this.repository.save(...args);
  }

  find(
    ...args: Parameters<Repository<LendEntity>['find']>
  ): ReturnType<Repository<LendEntity>['find']> {
    return this.repository.find(...args);
  }

  findOne(
    ...args: Parameters<Repository<LendEntity>['findOne']>
  ): ReturnType<Repository<LendEntity>['findOne']> {
    return this.repository.findOne(...args);
  }

  update(
    ...args: Parameters<Repository<LendEntity>['update']>
  ): ReturnType<Repository<LendEntity>['update']> {
    return this.repository.update(...args);
  }
}
