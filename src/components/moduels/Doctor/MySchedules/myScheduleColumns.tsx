"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock3 } from "lucide-react";
import { format, isBefore, isValid } from "date-fns";
import { IDoctorSchedule } from "../../../../../types/schedule.interface";

const formatScheduleDate = (date: string, pattern: string) => {
  const parsedDate = new Date(date);
  return isValid(parsedDate) ? format(parsedDate, pattern) : "N/A";
};

const isPastSchedule = (schedule: IDoctorSchedule) => {
  const endDate = new Date(schedule.endDateTime);
  return isValid(endDate) && isBefore(endDate, new Date());
};

export const myScheduleColumns: Column<IDoctorSchedule>[] = [
  {
    header: "Date",
    accessor: (schedule) => (
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-violet-50">
          <CalendarDays className="size-4 text-violet-600" />
        </div>
        <span className="text-sm font-medium text-slate-800">
          {formatScheduleDate(schedule.startDateTime, "MMM dd, yyyy")}
        </span>
      </div>
    ),
    sortKey: "startDateTime"
  },
  {
    header: "Time Slot",
    accessor: (schedule) => (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Clock3 className="size-4 text-slate-400" />
        <span className="whitespace-nowrap font-medium">
          {formatScheduleDate(schedule.startDateTime, "hh:mm a")}
          {" - "}
          {formatScheduleDate(schedule.endDateTime, "hh:mm a")}
        </span>
      </div>
    )
  },
  {
    header: "Status",
    accessor: (schedule) => {
      const isPast = isPastSchedule(schedule);

      return (
        <Badge
          variant="outline"
          className={
            isPast
              ? "rounded-md border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              : "rounded-md border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
          }
        >
          {isPast ? "Past" : "Upcoming"}
        </Badge>
      );
    }
  },
  {
    header: "Booking Status",
    accessor: (schedule) => (
      <Badge
        variant="outline"
        className={
          schedule.isBooked
            ? "rounded-md border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            : "rounded-md border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
        }
      >
        <span
          className={`mr-1.5 inline-block size-1.5 rounded-full ${schedule.isBooked ? "bg-blue-500" : "bg-amber-500"
            }`}
        />
        {schedule.isBooked ? "Booked" : "Available"}
      </Badge>
    )
  }
];