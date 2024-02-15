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
import { ShareService } from './share.service';
import { CreateLendDto } from './dto/create-lend.dto';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('/lend')
  postLend(@Body() lendData: CreateLendDto) {
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

  // @Patch('/lend/:id')
  // updateLend(@Param('id') lendId: string, @Body() updateData: CreateBorrowDto) {
  //   return this.shareService.updateLend(lendId, updateData);
  // }

  @Post('/borrow')
  postBorrow(@Body() borrowData: CreateBorrowDto) {
    return this.shareService.postBorrow(borrowData);
  }

  @Get('/borrow/allbyuser/:userId')
  getAllBorrowsByUserId(@Param('userId') userId: string) {
    return this.shareService.getAllBorrowsByUserId(userId);
  }

  @Get('/borrow/allbylendid/:id')
  getAllBorrowsByLendId(@Param('id') lendId: string) {
    return this.shareService.getAllBorrowsByLendId(lendId);
  }

  @Get('/borrow/:id')
  getOneBorrow(@Param('id') borrowId: string) {
    return this.shareService.getOneBorrow(borrowId);
  }

  @Patch('/borrow/state/:id')
  changeBorrowState(
    @Param('id') borrowId: string,
    @Query('status') newStatus: number,
  ) {
    return this.shareService.changeBorrowState(borrowId, newStatus);
  }
}
