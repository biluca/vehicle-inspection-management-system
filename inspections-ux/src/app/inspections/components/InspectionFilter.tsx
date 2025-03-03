"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "next/navigation";

interface InspectionsFilterProps {
  pageCount: number;
}

export default function InspectionsFilter({
  pageCount,
}: InspectionsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState({
    basic: "",
    sort_by: "",
    order: "",
    page: "",
  });

  const clearAllFilters = () => {
    const resetFilters = {
      basic: "",
      sort_by: "",
      order: "",
      page: "",
    };
    setFilters(resetFilters);
    router.push(`${pathname}`);
  };

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const updateURLParams = (updatedFilters: Record<string, string>) => {
    const params = new URLSearchParams();
    for (const key in updatedFilters) {
      if (updatedFilters[key]) {
        params.set(key, updatedFilters[key]);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const addQueryParam = (field: string, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    if (field != "page") {
      filters["page"] = "1";
    }
    setFilters(updatedFilters);
    updateURLParams(updatedFilters);
  };

  const nextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > pageCount) {
      return;
    }
    addQueryParam("page", nextPage.toString());
  };

  const previousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage < 1) {
      return;
    }
    addQueryParam("page", previousPage.toString());
  };

  const handlePagesExibition = (currentPage: number, pagesCount: number) => {
    if (pagesCount <= 3) {
      return Array.from({ length: pagesCount }, (_, i) => i + 1);
    }
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(pagesCount, currentPage + 1);

    if (end - start < 2) {
      if (start === 1) {
        return [start, start + 1, start + 2];
      } else if (end === pagesCount) {
        return [end - 2, end - 1, end];
      }
    }

    return [start, currentPage, end];
  };

  const sort_columns = [
    { column: "Date", value: "inspection_date" },
    { column: "Report Number", value: "report_number" },
    { column: "Report State", value: "report_state" },
  ];

  const sort_orders = [
    { column: "Ascending", value: "asc" },
    { column: "Descending", value: "desc" },
  ];

  return (
    <div className="grid grid-cols-6 gap-1 mb-4 text-black">
      <div>
        <label className="block text-sm font-medium text-haul">
          BASIC or Report Number
        </label>
        <input
          type="text"
          placeholder="Type the BASIC..."
          className="block w-full p-2 border border-gray-300 rounded"
          value={filters.basic}
          onChange={(e) => addQueryParam("basic", e.target.value)}
        ></input>
      </div>

      <div>
        <label className="block text-sm font-medium text-haul">Sort By</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={filters.sort_by || ""}
          onChange={(e) => addQueryParam("sort_by", e.target.value)}
        >
          <option value="">Select Column</option>
          {sort_columns.map((sort_column, index) => (
            <option key={index} value={sort_column.value}>
              {sort_column.column}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-haul">Order</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={filters.order || ""}
          onChange={(e) => addQueryParam("order", e.target.value)}
        >
          <option value="">Select Order</option>
          {sort_orders.map((sort_order, index) => (
            <option key={index} value={sort_order.value}>
              {sort_order.column}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button
          className="bg-haul text-black px-4 py-2 rounded w-full"
          onClick={() => clearAllFilters()}
        >
          Clear Filters
        </button>
      </div>

      <div></div>

      <div>
        <label className="block text-sm font-medium text-haul">
          Pages: {pageCount}
        </label>
        <div>
          <div className="flex items-center">
            <button
              className="px-3 py-2 border text-xl border-gray-300 rounded bg-white hover:bg-haul"
              onClick={() => {
                previousPage();
              }}
            >
              <GrFormPrevious />
            </button>
            {handlePagesExibition(currentPage, pageCount).map((pageNumber) => (
              <label
                key={pageNumber}
                className={`px-3 py-1 border border-gray-300 rounded ${
                  pageNumber === currentPage ? "bg-haul text-black" : "bg-white"
                }`}
              >
                {pageNumber}
              </label>
            ))}
            <button
              className="px-3 py-2 border text-xl border-gray-300 rounded bg-white hover:bg-haul"
              onClick={() => {
                nextPage();
              }}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
