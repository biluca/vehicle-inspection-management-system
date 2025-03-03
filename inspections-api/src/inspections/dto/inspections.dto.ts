export class VehicleDTO {
  unit: string;
  vehicle_id_number?: string;
  unit_type?: string;
  license_state?: string;
  license_number?: string;
}

export class ViolationDTO {
  convicted_of_dif_charge: string;
  BASIC: string;
  code: string;
  description: string;
  oos: string;
  time_severity_weight: string;
  unit: string;
}

export class InspectionDTO {
  id: string;
  inspection_date: string;
  report_state: string;
  report_number: string;
  level: string;
  time_weight: string;
  Placarable_HM_Veh_Insp: string;
  HM_inspection: string;
  vehicles: VehicleDTO[];
  violations: ViolationDTO[];
}
