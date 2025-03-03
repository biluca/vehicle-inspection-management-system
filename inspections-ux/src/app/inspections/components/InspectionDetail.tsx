"use client";

import { FaSearch } from "react-icons/fa";
import {
  Inspection,
  InspectionVehicles,
  InspectionViolations,
} from "../interfaces";
import { useCallback, useState } from "react";
import VehicleModal from "./VehicleModal";
import { getVehicleDetails } from "../actions";

interface InspectionDetailProps {
  inspection: Inspection;
}

export default function InspectionDetail({
  inspection,
}: InspectionDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | "">("");

  const vehicles: InspectionVehicles[] = inspection.vehicles;
  const violations: InspectionViolations[] = inspection.violations;

  const openModal = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicleId("");
  };

  const fetchVehicleDetails = useCallback(async () => {
    return await getVehicleDetails(selectedVehicleId);
  }, [selectedVehicleId]);

  return (
    <div>
      <section className=" bg-gray-800 mb-12 p-6 rounded-b-md">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <span className="block font-extrabold">Report Number</span>
            <span className="text-xl">{inspection.report_number}</span>
          </div>
          <div>
            <span className="block font-extrabold">Report State</span>
            <span className="text-xl">{inspection.report_state}</span>
          </div>
          <div>
            <span className="block font-extrabold">Inspection Date</span>
            <span className="text-xl">{inspection.inspection_date}</span>
          </div>
          <div>
            <span className="block font-extrabold">#ID</span>
            <span className="text-xl">{inspection.id}</span>
          </div>
          <div>
            <span className="block font-extrabold">Level</span>
            <span className="text-xl">{inspection.level}</span>
          </div>

          <div>
            <span className="block font-extrabold">Post Crash Inspection</span>
            <span className="text-xl">{inspection.HM_inspection}</span>
          </div>
          <div>
            <span className="block font-extrabold">
              Hazmat Placard Required
            </span>
            <span className="text-xl">{inspection.Placarable_HM_Veh_Insp}</span>
          </div>
          <div>
            <span className="block font-extrabold">Time Weight (TiW)</span>
            <span className="text-xl">{inspection.time_weight}</span>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-extrabold mb-3">Vehicle Information</h2>
        <table className="table-auto w-full bg-gray-50 shadow-md rounded">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3">Unit</th>
              <th className="p-3">Type</th>
              <th className="p-3">Plate State</th>
              <th className="p-3">Plate Number</th>
              <th className="p-3">VIN</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={index}
                className="text-black odd:bg-slate-200 even:bg-slate-100  hover:bg-haul"
              >
                <td className="p-3">{vehicle.unit}</td>
                <td className="p-3">{vehicle.unit_type}</td>
                <td className="p-3">{vehicle.license_number}</td>
                <td className="p-3">{vehicle.license_state}</td>
                <td className="flex space-x-2 justify-start items-center">
                  <button
                    id="vehicle_details_button"
                    className="text-haul bg-gray-800 rounded-xl p-2 mr-4 hover:text-black hover:bg-gray-400"
                    onClick={() => openModal(vehicle.vehicle_id_number)}
                  >
                    <FaSearch />
                  </button>
                  {vehicle.vehicle_id_number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-lg font-extrabold mb-3">Violations</h2>
        <table className="table-auto w-full bg-gray-50 shadow-md rounded">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3">Code</th>
              <th className="p-3">Unit</th>
              <th className="p-3">OOS</th>
              <th className="p-3">Description</th>
              <th className="p-3">BASIC</th>
              <th className="p-3">Time Severity</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((violation, index) =>
              violation.code === null ? (
                <tr
                  key="no-violation"
                  className="text-black font-bold m-2 bg-slate-100"
                >
                  <td className="p-3">NO VIOLATIONS</td>
                </tr>
              ) : (
                <tr
                  key={index}
                  className="text-black odd:bg-slate-200 even:bg-slate-100 hover:bg-haul"
                >
                  <td className="p-3">
                    {violation.code === null ? "NO VIOLATIONS" : violation.code}
                  </td>
                  <td className="p-3">
                    {violation.unit === "D" ? "Driver" : violation.unit}
                  </td>
                  <td className="p-3">{violation.oos}</td>
                  <td className="p-3">{violation.description}</td>
                  <td className="p-3">{violation.BASIC}</td>
                  <td className="p-3">{violation.time_severity_weight}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        fetchVehicleDetails={fetchVehicleDetails}
        selectedVehicleId={selectedVehicleId || ""}
      />
    </div>
  );
}
