import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowEntity } from '../entity/borrow.entity';

@Injectable()
export class BorrowRepository {
  constructor(
    @InjectRepository(BorrowEntity)
    private repository: Repository<BorrowEntity>,
  ) {}

    create(args: { lendId: string, borrowerId: string, borrowerName: string, phoneNumber: string, borrowStartTime: string, borrowEndTime: string, carModel: string, carNumber: string, status: number }): BorrowEntity {
        const { lendId, borrowerId, borrowerName, phoneNumber, borrowStartTime, borrowEndTime, carModel, carNumber, status } = args;

        return this.repository.create({
            lendId,
            borrowerId,
            borrowerName,
            phoneNumber,
            borrowStartTime,
            borrowEndTime,
            carModel,
            carNumber,
            status
        });
  }

  save(...args: Parameters<Repository<BorrowEntity>['save']>): ReturnType<Repository<BorrowEntity>['save']> {
    return this.repository.save(...args);
  }

  find(...args: Parameters<Repository<BorrowEntity>['find']>): ReturnType<Repository<BorrowEntity>['find']> {
    return this.repository.find(...args);
  }

  findOne(...args: Parameters<Repository<BorrowEntity>['findOne']>): ReturnType<Repository<BorrowEntity>['findOne']> {
    return this.repository.findOne(...args);
  }

  update(...args: Parameters<Repository<BorrowEntity>['update']>): ReturnType<Repository<BorrowEntity>['update']> {
    return this.repository.update(...args);
  }
}
