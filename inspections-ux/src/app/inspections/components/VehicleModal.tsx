import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Vehicle, VehicleData } from "../interfaces";

interface VehicleModalProps {
  selectedVehicleId: string;
  isOpen: boolean;
  onClose: () => void;
  fetchVehicleDetails: () => Promise<Vehicle>;
}

export default function VehicleModal({
  selectedVehicleId,
  isOpen,
  onClose,
  fetchVehicleDetails,
}: VehicleModalProps) {
  const [vehicleDetail, setVehicleDetail] = useState<Vehicle>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchVehicleDetails()
        .then((result) => setVehicleDetail(result))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, fetchVehicleDetails]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div
        className="bg-black rounded-lg shadow-lg p-6 w-[90vw] h-[90vh] overflow-auto relative border border-haul"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <label className="text-haul font-bold">Loading...</label>
        ) : vehicleDetail ? (
          <div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-t-md shadow-md mb-2">
              <h1 className="text-2xl font-bold text-white">{`Vehicle VIN: ${selectedVehicleId}`}</h1>
              <button
                className={` px-6 py-2 text-black bg-haul font-medium rounded-md hover:bg-black hover:text-haul transition-all`}
                onClick={() => onClose()}
              >
                <IoCloseSharp />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 mb-4 text-black">
              {vehicleDetail.map((vehicleProp: VehicleData, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-bold text-haul">
                    {vehicleProp.field}
                  </label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Type the BASIC..."
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={vehicleProp.value}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <label className="text-haul font-bold">Failed to load data.</label>
        )}
      </div>
    </div>
  );
}
