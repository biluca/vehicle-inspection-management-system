import InspectionsTable from "./components/InspectionsTable";
import { getInspections } from "./actions";
import { InspectionsData } from "./interfaces";
import InspectionsFilter from "./components/InspectionFilter";

export default async function InspectionsPage({
  searchParams,
}: {
  searchParams: {
    basic?: string;
    sort_by?: string;
    order?: string;
    page?: string;
  };
}) {
  const inspectionsData: InspectionsData = await getInspections(
    await searchParams
  );
  

  return (
    <>
      <InspectionsFilter pageCount={inspectionsData.meta.pageCount}/>
      <InspectionsTable inspectionsData={inspectionsData} />
    </>
  );
}
