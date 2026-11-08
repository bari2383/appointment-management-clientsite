"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Filter, X } from "lucide-react";

import RefreshButton from "@/components/shared/RefreshButton";
import SelectFilter from "@/components/shared/selectFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MySchedulesFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const isBooked = searchParams.get("isBooked");

  const activeFiltersCount = [
    startDate,
    endDate,
    isBooked
  ].filter(Boolean).length;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    ["startDate", "endDate", "isBooked"].forEach((key) => {
      params.delete(key);
    });

    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 sm:p-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Filter className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Filter Schedules</h3>
            <p className="text-xs text-muted-foreground">
              Find schedules by date and booking status
            </p>
          </div>
        </div>

        <RefreshButton />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">

        {/* Booking Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Booking Status
          </label>

          <SelectFilter
            paramName="isBooked"
            placeholder="Booking Status"
            defaultValue="All"
            options={[
              { label: "Available", value: "false" },
              { label: "Booked", value: "true" }
            ]}
          />
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label
            htmlFor="schedule-start-date"
            className="text-xs font-medium text-muted-foreground"
          >
            Start Date
          </label>

          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="schedule-start-date"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => updateFilter("startDate", e.target.value)}
              className="h-10 w-full pl-9"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label
            htmlFor="schedule-end-date"
            className="text-xs font-medium text-muted-foreground"
          >
            End Date
          </label>

          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="schedule-end-date"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => updateFilter("endDate", e.target.value)}
              className="h-10 w-full pl-9"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          type="button"
          variant="outline"
          onClick={clearFilters}
          disabled={activeFiltersCount === 0}
          className="h-10 gap-2 sm:col-span-2 lg:col-span-1"
        >
          <X className="size-4" />
          Clear Filters
          {activeFiltersCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MySchedulesFilters;