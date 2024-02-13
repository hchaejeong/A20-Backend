import { Controller, Get, Query } from '@nestjs/common';
import { ParkinglotService } from './parkinglot.service';

@Controller('parkinglot')
export class ParkinglotController {
  constructor(private readonly parkinglotService: ParkinglotService) {}

  @Get()
  getAll() {
    return this.parkinglotService.getAll();
  }

  @Get('/near')
  getNear(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.parkinglotService.getNear(+lat, +lon);
  }
}
