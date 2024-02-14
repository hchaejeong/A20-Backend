import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Borrow, Lend } from './entity/share.entity';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('/lend')
  postLend(@Body() lendData: Lend) {
    return this.shareService.postLend(lendData);
  }

  @Get('/lend/all/:userId')
  getAllLends(@Param('userId') userId: string) {
    return this.shareService.getAllLends(userId);
  }

  @Get('/lend/:id')
  getOneLend(@Param('id') lendId: string) {
    return this.shareService.getOneLend(lendId);
  }

  @Delete('/lend/:id')
  deleteLend(@Param('id') lendId: string) {
    return this.shareService.deleteLend(lendId);
  }

  @Post('/borrow')
  postBorrow(@Body() borrowData: Borrow) {
    return this.shareService.postBorrow(borrowData);
  }

  @Get('/borrow/allbyuser/:userId')
  getAllBorrowsByUserId(@Param('userId') userId: string) {
    return this.shareService.getAllBorrowsByUserId(userId);
  }

  @Get('/borrow/allbyid/:id')
  getAllBorrowsByLendId(@Param('id') lendId: string) {
    return this.shareService.getAllBorrowsByLendId(lendId);
  }

  @Patch('/borrow/state/:id')
  changeBorrowState(
    @Param('id') borrowId: string,
    @Query('status') newStatus: number,
  ) {
    return this.shareService.changeBorrowState(borrowId, newStatus);
  }
}
