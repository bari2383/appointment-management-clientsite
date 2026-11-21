"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Check,
  Clock3,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

import { IDoctor, IDoctorSchedule } from "../../../../types/doctor.interface";

interface BookAppointmentDialogProps {
  doctor: IDoctor;
  isOpen: boolean;
  onClose: () => void;
}

const TIME_ZONE = "Asia/Dhaka";

// Format date and time in Bangladesh timezone
const formatScheduleDate = (
  date: string,
  options: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    ...options,
  }).format(new Date(date));
};

// Generate YYYY-MM-DD key in Bangladesh timezone
const getScheduleDateKey = (date: string): string => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(date));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

export default function BookAppointmentDialog({
  doctor,
  isOpen,
  onClose,
}: BookAppointmentDialogProps) {
  const router = useRouter();

  const [selectedSchedule, setSelectedSchedule] =
    useState<IDoctorSchedule | null>(null);

  // Get schedules directly from Doctor
  const doctorSchedules = doctor.schedule ?? [];

  // Group available schedules by date
  const groupedSchedules = useMemo(() => {
    const grouped: Record<string, IDoctorSchedule[]> = {};

    const now = Date.now();

    const availableSchedules = doctorSchedules
      .filter((schedule) => {
        const startTime = new Date(
          schedule.startDateTime
        ).getTime();

        return (
          schedule.isBooked === false &&
          Number.isFinite(startTime) &&
          startTime > now
        );
      })
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      );

    availableSchedules.forEach((schedule) => {
      const dateKey = getScheduleDateKey(
        schedule.startDateTime
      );

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(schedule);
    });

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) => dateA.localeCompare(dateB)
    );
  }, [doctorSchedules, isOpen]);

  // Total available slots
  const totalAvailableSlots = groupedSchedules.reduce(
    (total, [, schedules]) => total + schedules.length,
    0
  );

  // Close dialog
  const handleCloseModal = () => {
    setSelectedSchedule(null);
    onClose();
  };

  // Continue to appointment booking
  const handleContinue = () => {
    if (!selectedSchedule) return;

    const bookingUrl =
      `/dashboard/book-appointment/${doctor.id}/${selectedSchedule.id}`;

    handleCloseModal();

    router.push(bookingUrl);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseModal();
        }
      }}
    >
      <DialogContent
        className="flex max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-2xl border-slate-200 p-0 shadow-xl sm:max-w-2xl dark:border-slate-800"
      >
        {/* Dialog Header */}
        <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-5 sm:px-6 dark:border-slate-800">
          <DialogTitle className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
            Book an Appointment
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Select an available consultation time with{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {doctor.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-5">

            {/* Doctor Information */}
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 animate-in fade-in slide-in-from-bottom-2 [animation-duration:400ms] fill-mode-backwards motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
                <Stethoscope className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {doctor.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {doctor.designation}
                </p>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Consultation Fee:{" "}
                  <span className="font-semibold text-blue-600 dark:text-sky-300">
                    ৳{doctor.appointmentFee}
                  </span>
                </p>
              </div>
            </div>

            {/* Available Slots Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Available Time Slots
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Choose your preferred date and time
                </p>
              </div>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
                {totalAvailableSlots} Available
              </span>
            </div>

            {/* Available Schedules */}
            {groupedSchedules.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center animate-in fade-in zoom-in-95 [animation-duration:400ms] motion-reduce:animate-none dark:border-slate-700 dark:bg-slate-800/40">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                  <CalendarDays className="size-6 text-slate-400" />
                </div>

                <p className="font-medium text-slate-900 dark:text-white">
                  No Available Slots
                </p>

                <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                  This doctor currently has no available
                  appointment slots. Please check back later.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-64 pr-3 sm:h-72">
                <div className="space-y-5 [&>*]:animate-in [&>*]:fade-in [&>*]:slide-in-from-bottom-2 [&>*]:[animation-duration:400ms] [&>*]:fill-mode-backwards motion-reduce:[&>*]:animate-none [&>*:nth-child(2)]:[animation-delay:70ms] [&>*:nth-child(3)]:[animation-delay:140ms] [&>*:nth-child(4)]:[animation-delay:210ms]">

                  {groupedSchedules.map(
                    ([date, schedules]) => (
                      <div
                        key={date}
                        className="space-y-3"
                      >
                        {/* Date Header */}
                        <div className="flex items-center gap-2">
                          <CalendarDays className="size-4 shrink-0 text-blue-600 dark:text-sky-300" />

                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formatScheduleDate(
                              schedules[0].startDateTime,
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </h4>
                        </div>

                        {/* Time Slots */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {schedules.map((schedule) => {
                            const isSelected =
                              selectedSchedule?.id === schedule.id;

                            const startTime =
                              formatScheduleDate(
                                schedule.startDateTime,
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              );

                            return (
                              <Button
                                key={schedule.id}
                                type="button"
                                variant={
                                  isSelected
                                    ? "default"
                                    : "outline"
                                }
                                onClick={() =>
                                  setSelectedSchedule(schedule)
                                }
                                aria-pressed={isSelected}
                                className="h-auto min-h-11 justify-center gap-2 rounded-lg border-slate-200 bg-white px-2 py-3 text-xs font-medium text-slate-700 shadow-none transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.97] aria-pressed:border-blue-600 aria-pressed:bg-blue-600 aria-pressed:text-white aria-pressed:shadow-sm aria-pressed:hover:bg-blue-700 aria-pressed:hover:text-white sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                              >
                                {isSelected ? (
                                  <Check className="size-4 shrink-0 animate-in zoom-in-50 [animation-duration:200ms] motion-reduce:animate-none" />
                                ) : (
                                  <Clock3 className="size-4 shrink-0" />
                                )}

                                <span>
                                  {startTime}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="shrink-0 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-800/30">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Selected Schedule */}
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {selectedSchedule ? (
                <>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Selected:{" "}
                  </span>

                  {formatScheduleDate(
                    selectedSchedule.startDateTime,
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}

                  {" at "}

                  {formatScheduleDate(
                    selectedSchedule.startDateTime,
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </>
              ) : (
                "No time slot selected"
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                className="rounded-lg border-slate-200 bg-white text-slate-700 shadow-none transition-all duration-200 hover:bg-slate-50 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleContinue}
                disabled={!selectedSchedule}
                className="rounded-lg bg-blue-600 text-white shadow-none transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 active:scale-[0.97] disabled:bg-slate-200 disabled:text-slate-400 disabled:opacity-100 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}