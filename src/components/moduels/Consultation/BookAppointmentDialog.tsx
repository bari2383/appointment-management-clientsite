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
        className="
                    flex
                    max-h-[90vh]
                    w-[calc(100%-2rem)]
                    max-w-2xl
                    flex-col
                    gap-0
                    overflow-hidden
                    p-0
                    sm:max-w-2xl
                "
      >
        {/* Dialog Header */}
        <DialogHeader className="shrink-0 border-b px-5 py-5 sm:px-6">
          <DialogTitle className="text-lg font-semibold sm:text-xl">
            Book an Appointment
          </DialogTitle>

          <DialogDescription>
            Select an available consultation time with{" "}
            <span className="font-medium text-foreground">
              {doctor.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-5">

            {/* Doctor Information */}
            <div className="flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Stethoscope className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">
                  {doctor.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {doctor.designation}
                </p>

                <p className="mt-2 text-sm">
                  Consultation Fee:{" "}
                  <span className="font-semibold text-primary">
                    ৳{doctor.appointmentFee}
                  </span>
                </p>
              </div>
            </div>

            {/* Available Slots Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">
                  Available Time Slots
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Choose your preferred date and time
                </p>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {totalAvailableSlots} Available
              </span>
            </div>

            {/* Available Schedules */}
            {groupedSchedules.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-4 py-12 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="size-6 text-muted-foreground" />
                </div>

                <p className="font-medium">
                  No Available Slots
                </p>

                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  This doctor currently has no available
                  appointment slots. Please check back later.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-64 pr-3 sm:h-72">
                <div className="space-y-5">

                  {groupedSchedules.map(
                    ([date, schedules]) => (
                      <div
                        key={date}
                        className="space-y-3"
                      >
                        {/* Date Header */}
                        <div className="flex items-center gap-2">
                          <CalendarDays className="size-4 shrink-0 text-primary" />

                          <h4 className="text-sm font-semibold">
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
                                className="
                                                                    h-auto
                                                                    min-h-11
                                                                    justify-center
                                                                    gap-2
                                                                    rounded-lg
                                                                    px-2
                                                                    py-3
                                                                    text-xs
                                                                    sm:text-sm
                                                                "
                              >
                                {isSelected ? (
                                  <Check className="size-4 shrink-0" />
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
        <DialogFooter className="shrink-0 border-t bg-muted/20 px-5 py-4 sm:px-6">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Selected Schedule */}
            <div className="text-sm text-muted-foreground">
              {selectedSchedule ? (
                <>
                  <span className="font-medium text-foreground">
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
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleContinue}
                disabled={!selectedSchedule}
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