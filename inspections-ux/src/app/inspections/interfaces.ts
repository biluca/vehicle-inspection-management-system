export interface InspectionsData {
  data: Inspection[];
  meta: InspectionsMetaData;
}

export interface Inspection {
  id: string;
  inspection_date: string;
  report_number: string;
  report_state: string;
  vehicle_plate: string;
  basic: string;
  level: number;
  time_weight: number;
  HM_inspection: string;
  Placarable_HM_Veh_Insp: string;
  vehicles: InspectionVehicles[];
  violations: InspectionViolations[];
}

export interface InspectionVehicles {
  license_number: string;
  license_state: string;
  unit: string;
  unit_type: string;
  vehicle_id_number: string;
}

export interface InspectionViolations {
  BASIC: string;
  code: string;
  convicted_of_dif_charge: string;
  description: string;
  oos: string;
  time_severity_weight: string;
  unit: string;
}

export interface InspectionsMetaData {
  page: number;
  take: number;
  order: string;
  sort_by: string;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface VehicleData {
  field: string;
  value: string;
}

export interface Vehicle {
  vehicleData: VehicleData[];
}
