import { Injectable } from '@nestjs/common';
import { PageOptionsDTO, PageDTO, PageMetaDTO } from './dto/page.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InspectionDTO } from './dto/inspections.dto';

@Injectable()
export class InspectionsService {
  constructor(private prismaService: PrismaService) {}

  async getInspections(pageOptionsDTO: PageOptionsDTO) {
    console.log('Reached InspectionsService on getInspections()');

    const filter = pageOptionsDTO.filter || '';

    const filterData = {};

    if (filter) {
      filterData['where'] = {
        OR: [
          {
            report_number: {
              contains: pageOptionsDTO.filter,
            },
          },
          {
            violations: {
              some: {
                BASIC: {
                  contains: pageOptionsDTO.filter,
                },
              },
            },
          },
        ],
      };
    }

    filterData['orderBy'] = {};
    filterData['orderBy'][pageOptionsDTO.sort_by] = pageOptionsDTO.order;

    const [itemCount] = await this.prismaService.$transaction([
      this.prismaService.inspections.count(filterData),
    ]);

    filterData['skip'] = pageOptionsDTO.skip;
    filterData['take'] = pageOptionsDTO.take;

    const inspectionData: Array<InspectionDTO> =
      await this.prismaService.inspections.findMany(filterData);

    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });

    return new PageDTO(inspectionData, pageMetaDto);
  }

  async getInspection(report_number: string) {
    const filterData = {
      where: {
        report_number: report_number,
      },
    };

    const [inspectionData] = await this.prismaService.$transaction([
      this.prismaService.inspections.findFirstOrThrow(filterData),
    ]);

    return inspectionData;
  }
}
