import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class VehiclesService {
  constructor(private configService: ConfigService) {}

  async getVehicleDetails(vin_code: string) {
    const vehicleData = await this.callVehicleAPI(vin_code);
    const normalizedVehicleData = this.normalizeData(vehicleData);

    return normalizedVehicleData;
  }

  private formatField(field: string) {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^ /, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private normalizeData(vehicleData: object) {
    const ignoreValues = ['', 'Not Applicable', 'Not Reported'];
    const ignoreFields = ['ErrorCode', 'ErrorText', 'AdditionalErrorText'];

    return Object.entries(vehicleData)
      .filter(([key, value]) => !ignoreFields.includes(key))
      .filter(([key, value]) => !ignoreValues.includes(value))
      .map(([key, value]) => ({ field: this.formatField(key), value }));
  }

  private async callVehicleAPI(vin_code: string) {
    const api_url = this.configService.get('NHTSA_API_URL');

    const response = await axios.get(`${api_url}${vin_code}?format=json`);

    return response.data['Results'][0];
  }
}
