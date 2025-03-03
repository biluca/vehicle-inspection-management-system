"use client";

import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { InspectionsData, InspectionViolations } from "../interfaces";

interface InspectionsTableProps {
  inspectionsData: InspectionsData;
}

export default function InspectionsTable({
  inspectionsData,
}: InspectionsTableProps) {
  const router = useRouter();

  const inspections = inspectionsData.data;

  const getUniqueBASICValues = (violations: InspectionViolations[]) => {
    const uniqueBASICvalue: string[] = [];

    violations.forEach((violation: InspectionViolations) => {
      if (
        violation.BASIC !== null &&
        !uniqueBASICvalue.includes(violation.BASIC)
      ) {
        uniqueBASICvalue.push(violation.BASIC);
      }
    });

    if (uniqueBASICvalue.length == 0) {
      uniqueBASICvalue.push(`NO VIOLATIONS`);
    } else {
      uniqueBASICvalue.push(`[${violations.length}]`);
    }

    return uniqueBASICvalue;
  };

  const handleDetailsClick = (id: string) => {
    router.push(`/inspections/detail?id=${id}`);
  };

  return (
    <div>
      <table className="w-full text-sm jus border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-800 border-gray-300">
            <th className="border p-2">Date</th>
            <th className="border p-2">Report Number</th>
            <th className="border p-2">Report State</th>
            <th className="border p-2">Plate Number</th>
            <th className="border p-2">Plate State</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Basic</th>
            <th className="border p-2">Severity Weight</th>
            <th className="border p-2">Time Weight</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection, index) => (
            <tr
              key={index}
              className="text-black odd:bg-slate-200 even:bg-slate-100 hover:bg-haul"
            >
              <td className="border border-gray-300 p-2">
                {inspection.inspection_date}
              </td>

              <td className="border border-gray-300 p-2">
                <div className="flex space-x-2 justify-start items-center">
                  <button
                    className="text-haul bg-gray-800 rounded-xl p-2 mr-6 hover:text-black hover:bg-gray-400"
                    onClick={() => handleDetailsClick(inspection.report_number)}
                  >
                    <FaSearch />
                  </button>
                  {inspection.report_number}
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {inspection.report_state}
              </td>
              <td className="border border-gray-300 p-2">
                {inspection.vehicles[0].license_number}
              </td>
              <td className="border border-gray-300 p-2">
                {inspection.vehicles[0].license_state}
              </td>
              <td className="border border-gray-300 p-2">
                {inspection.vehicles[0].unit_type}
              </td>
              <td className="border border-gray-300 p-2">
                {getUniqueBASICValues(inspection.violations).map(
                  (violation, index) => (
                    <div key={index}>{violation}</div>
                  )
                )}
              </td>
              <td className="border border-gray-300 p-2">{inspection.level}</td>
              <td className="border border-gray-300 p-2">
                {inspection.time_weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
