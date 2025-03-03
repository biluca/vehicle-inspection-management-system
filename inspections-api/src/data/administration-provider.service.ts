import * as fs from 'fs';
import { XMLParser, X2jOptions } from 'fast-xml-parser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdministrationProviderService {
  private async readFile(fileName: string) {
    console.log('Reached AdministrationProviderService on readFile()');

    try {
      return fs.readFileSync(fileName, 'utf-8').toString();
    } catch (err) {
      console.error('Error Reading File:', err);
    }
  }

  private transformInspections(data) {
    console.log(
      'Reached AdministrationProviderService on transformInspections()',
    );

    const inspections = data.carrierData.inspections.inspection;
    return inspections.map((inspection) => ({
      ...inspection,
      vehicles: inspection.vehicles.vehicle,
      violations: inspection.violations.violation,
    }));
  }

  async extractInspectionsData() {
    console.log(
      'Reached AdministrationProviderService on extractInspectionsData()',
    );

    const xmlDataFile = await this.readFile(
      'src/administration-provider/inspections-data.xml',
    );

    const parseOptions: X2jOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      isArray: (tagName) =>
        ['inspection', 'vehicle', 'violation'].includes(tagName),
    };

    const parser = new XMLParser(parseOptions);
    const jsonDataFile = parser.parse(xmlDataFile);
    const inspectionData = this.transformInspections(jsonDataFile);

    return inspectionData;
  }
}
