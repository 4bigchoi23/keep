import { SectionCards } from "@/components/cms/section-cards"
import { ChartAreaInteractive } from "@/components/cms/chart-area-interactive"
import { DataTable } from "@/components/cms/data-table"

import data from "./data.json"

export default async function Admin() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
