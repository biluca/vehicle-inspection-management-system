import { Inspection, InspectionsData, Vehicle } from "./interfaces";

const INSPECTIONS_API_URL = "http://127.0.0.1:3001";

export async function getInspections(params: {
  basic?: string;
  sort_by?: string;
  order?: string;
  page?: string;
}): Promise<InspectionsData> {
  const queryParams = new URLSearchParams();
  if (params.basic) {
    queryParams.set("filter", params.basic);
  }

  if (params.sort_by) {
    queryParams.set("sort_by", params.sort_by);
  }

  if (params.order) {
    queryParams.set("order", params.order);
  }

  if (params.page) {
    queryParams.set("page", params.page);
  }

  const url = `${INSPECTIONS_API_URL}/inspections?${queryParams.toString()}`;

  console.log("URL", url);

  const response = await fetch(url, {
    method: "GET",
  });
  const inspectionsData = await response.json();
  return inspectionsData;
}

export async function getInspection(reportNumber: string): Promise<Inspection> {
  const url = `${INSPECTIONS_API_URL}/inspections/${reportNumber}/`;
  console.log("URL", url);
  const response = await fetch(url, {
    method: "GET",
  });
  const inspectionsData = await response.json();

  return inspectionsData;
}

export async function getVehicleDetails(vin_code: string): Promise<Vehicle> {
  const url = `${INSPECTIONS_API_URL}/vehicles/${vin_code}/`;
  console.log("URL", url);
  const response = await fetch(url, {
    method: "GET",
  });
  const vehicleData = await response.json();

  return vehicleData;
}
