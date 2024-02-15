import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParkinglotService } from './parkinglot.service';

@Controller('parkinglot')
export class ParkinglotController {
  constructor(private readonly parkinglotService: ParkinglotService) {}

  @Get('/init')
  getAll(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.parkinglotService.init(+lat, +lon);
  }

  @Get('/near')
  getNear(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.parkinglotService.getNear(+lat, +lon);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.parkinglotService.getOne(id);
  }
}
