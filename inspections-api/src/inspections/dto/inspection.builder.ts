import { InspectionDTO, ViolationDTO, VehicleDTO } from './inspections.dto';

export class InspectionDTOBuilder {
  private inspection_date: string;
  private report_state: string;
  private report_number: string;
  private level: string;
  private time_weight: string;
  private Placarable_HM_Veh_Insp: string;
  private HM_inspection: string;
  private vehicles: VehicleDTO[] = [];
  private violations: ViolationDTO[] = [];

  setInspectionDate(inspection_date: string): this {
    this.inspection_date = inspection_date;
    return this;
  }

  setReportState(report_state: string): this {
    this.report_state = report_state;
    return this;
  }

  setReportNumber(report_number: string): this {
    this.report_number = report_number;
    return this;
  }

  setLevel(level: string): this {
    this.level = level;
    return this;
  }

  setTimeWeight(time_weight: string): this {
    this.time_weight = time_weight;
    return this;
  }

  setPlacarableHMVehInsp(Placarable_HM_Veh_Insp: string): this {
    this.Placarable_HM_Veh_Insp = Placarable_HM_Veh_Insp;
    return this;
  }

  setHMInspection(HM_inspection: string): this {
    this.HM_inspection = HM_inspection;
    return this;
  }

  addVehicle(vehicle: VehicleDTO): this {
    this.vehicles.push(vehicle);
    return this;
  }

  addViolation(violation: ViolationDTO): this {
    this.violations.push(violation);
    return this;
  }

  build(): InspectionDTO {
    const inspectionDTO = new InspectionDTO();
    inspectionDTO.inspection_date = this.inspection_date;
    inspectionDTO.report_state = this.report_state;
    inspectionDTO.report_number = this.report_number;
    inspectionDTO.level = this.level;
    inspectionDTO.time_weight = this.time_weight;
    inspectionDTO.Placarable_HM_Veh_Insp = this.Placarable_HM_Veh_Insp;
    inspectionDTO.HM_inspection = this.HM_inspection;
    inspectionDTO.vehicles = this.vehicles;
    inspectionDTO.violations = this.violations;

    return inspectionDTO;
  }
}
