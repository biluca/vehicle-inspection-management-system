import { Controller, Get, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get(':vin_code')
  async getVehicleDetails(@Param('vin_code') vin_code: string) {
    console.log('Reached VehiclesController on getVehicleDetails()');

    return this.vehiclesService.getVehicleDetails(vin_code);
  }
}
