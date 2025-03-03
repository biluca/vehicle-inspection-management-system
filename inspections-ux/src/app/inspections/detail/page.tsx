import { getInspection } from "../actions";
import Header from "../components/Header";
import InspectionDetail from "../components/InspectionDetail";
import { Inspection } from "../interfaces";

export default async function InspectionDetailPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const inspectionData: Inspection = await getInspection((await searchParams).id);

  return (
    <div>
      <Header
        title={`Inspection Overview - [ ${inspectionData.report_number} ]`}
        showHomeButton={false}
      />
      <InspectionDetail inspection={inspectionData} />
    </div>
  );
}
