import { Controller, Get, Query, Param } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { PageOptionsDTO } from './dto/page.dto';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  async getInspections(@Query() options) {
    console.log('Reached InspectionsController on getInspections()');
    const pageOptionsDTO = new PageOptionsDTO().buildPageOptionsDTO(options);

    console.log('PAGINATION OPTIONS:', pageOptionsDTO);

    return this.inspectionsService.getInspections(pageOptionsDTO);
  }

  @Get(':report_number')
  async getInspection(@Param('report_number') report_number: string) {
    return this.inspectionsService.getInspection(report_number);
  }
}
