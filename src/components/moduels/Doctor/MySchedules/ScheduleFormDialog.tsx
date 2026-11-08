"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { toast } from "sonner";
import {
    ArrowRight,
    CalendarCheck2,
    CalendarDays,
    Clock3,
    Info,
    Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createDoctorSchedules } from "@/services/doctor/scheduleManagement";

interface IScheduleFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type TFormValues = {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
};

type TFieldErrors = Partial<Record<keyof TFormValues, string[]>>;

const SLOT_DURATION = 20;

const initialFormValues: TFormValues = {
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
};

const ScheduleFormDialog = ({
    open,
    onClose,
    onSuccess
}: IScheduleFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const submittingRef = useRef(false);

    const [isPending, startTransition] = useTransition();
    const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
    const [errors, setErrors] = useState<TFieldErrors>({});

    const today = new Date().toLocaleDateString("en-CA");

    // Calculate appointment slots
    const slotPreview = useMemo(() => {
        const { startDate, endDate, startTime, endTime } = formValues;

        const emptyPreview = {
            days: 0,
            slotsPerDay: 0,
            totalSlots: 0
        };

        if (!startDate || !endDate || !startTime || !endTime) {
            return emptyPreview;
        }

        const start = parseISO(startDate);
        const end = parseISO(endDate);

        if (
            Number.isNaN(start.getTime()) ||
            Number.isNaN(end.getTime())
        ) {
            return emptyPreview;
        }

        const days = differenceInCalendarDays(end, start) + 1;

        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        const duration = endMinutes - startMinutes;

        if (days <= 0 || duration < SLOT_DURATION) {
            return emptyPreview;
        }

        const slotsPerDay = Math.floor(duration / SLOT_DURATION);

        return {
            days,
            slotsPerDay,
            totalSlots: days * slotsPerDay
        };
    }, [formValues]);

    // Update form fields
    const handleInputChange = (
        field: keyof TFormValues,
        value: string
    ) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: undefined
        }));
    };

    // Reset form
    const resetForm = () => {
        formRef.current?.reset();
        setFormValues({ ...initialFormValues });
        setErrors({});
    };

    // Close dialog
    const handleClose = () => {
        if (isPending || submittingRef.current) return;

        resetForm();
        onClose();
    };

    // Validate form before submission
    const validateForm = (): boolean => {
        const newErrors: TFieldErrors = {};

        const { startDate, endDate, startTime, endTime } = formValues;

        if (!startDate) {
            newErrors.startDate = ["Start date is required"];
        }

        if (!endDate) {
            newErrors.endDate = ["End date is required"];
        }

        if (!startTime) {
            newErrors.startTime = ["Start time is required"];
        }

        if (!endTime) {
            newErrors.endTime = ["End time is required"];
        }

        if (startDate && endDate && startDate > endDate) {
            newErrors.endDate = [
                "End date must be greater than or equal to start date"
            ];
        }

        if (startTime && endTime && startTime >= endTime) {
            newErrors.endTime = [
                "End time must be greater than start time"
            ];
        }

        if (
            startTime &&
            endTime &&
            startTime < endTime &&
            slotPreview.slotsPerDay === 0
        ) {
            newErrors.endTime = [
                "Consultation duration must be at least 20 minutes"
            ];
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit schedule
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Prevent duplicate submissions
        if (submittingRef.current || isPending) return;

        if (!validateForm()) {
            toast.error("Please check the form fields");
            return;
        }

        submittingRef.current = true;

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            try {
                const result = await createDoctorSchedules(null, formData);

                if (result.success) {
                    toast.success(
                        result.message || "Schedule created successfully",
                        {
                            id: "doctor-schedule-success"
                        }
                    );

                    resetForm();
                    onSuccess();

                    return;
                }

                if (result.errors) {
                    setErrors(result.errors as TFieldErrors);
                }

                if (result.message && result.message !== "Validation failed") {
                    toast.error(result.message);
                }

            } catch (error) {
                console.error("Create doctor schedule error:", error);

                toast.error(
                    "Something went wrong while creating the schedule"
                );
            } finally {
                submittingRef.current = false;
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) handleClose();
            }}
        >
            <DialogContent
                className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-130"
                showCloseButton={!isPending}
            >
                {/* Header */}
                <DialogHeader className="border-b bg-linear-to-br from-violet-50 via-white to-white px-6 py-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-violet-100 bg-white shadow-sm">
                        <CalendarCheck2 className="size-6 text-violet-600" />
                    </div>

                    <DialogTitle className="text-xl font-bold tracking-tight text-slate-900">
                        Create Doctor Schedule
                    </DialogTitle>

                    <DialogDescription className="mt-1 text-sm leading-relaxed text-slate-500">
                        Set your available dates and consultation hours.
                        Appointment slots will be generated automatically.
                    </DialogDescription>
                </DialogHeader>

                {/* Schedule Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">

                        {/* Date Range */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-violet-600" />

                                <h3 className="text-sm font-semibold text-slate-900">
                                    Available Dates
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="startDate">
                                        Start Date
                                    </FieldLabel>

                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        min={today}
                                        value={formValues.startDate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "startDate",
                                                e.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        required
                                        className="h-11 rounded-xl border-slate-200"
                                    />

                                    {errors.startDate?.[0] && (
                                        <p className="text-xs text-red-500">
                                            {errors.startDate[0]}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="endDate">
                                        End Date
                                    </FieldLabel>

                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        min={formValues.startDate || today}
                                        value={formValues.endDate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "endDate",
                                                e.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        required
                                        className="h-11 rounded-xl border-slate-200"
                                    />

                                    {errors.endDate?.[0] && (
                                        <p className="text-xs text-red-500">
                                            {errors.endDate[0]}
                                        </p>
                                    )}
                                </Field>
                            </div>
                        </div>

                        {/* Consultation Time */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Clock3 className="size-4 text-violet-600" />

                                <h3 className="text-sm font-semibold text-slate-900">
                                    Consultation Hours
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="startTime">
                                        Start Time
                                    </FieldLabel>

                                    <Input
                                        id="startTime"
                                        name="startTime"
                                        type="time"
                                        value={formValues.startTime}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "startTime",
                                                e.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        required
                                        className="h-11 rounded-xl border-slate-200"
                                    />

                                    {errors.startTime?.[0] && (
                                        <p className="text-xs text-red-500">
                                            {errors.startTime[0]}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="endTime">
                                        End Time
                                    </FieldLabel>

                                    <Input
                                        id="endTime"
                                        name="endTime"
                                        type="time"
                                        min={formValues.startTime || undefined}
                                        value={formValues.endTime}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "endTime",
                                                e.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        required
                                        className="h-11 rounded-xl border-slate-200"
                                    />

                                    {errors.endTime?.[0] && (
                                        <p className="text-xs text-red-500">
                                            {errors.endTime[0]}
                                        </p>
                                    )}
                                </Field>
                            </div>

                            {/* Slot Duration Info */}
                            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
                                <Info className="mt-0.5 size-4 shrink-0 text-blue-600" />

                                <p className="text-xs leading-relaxed text-blue-700">
                                    Each appointment slot is{" "}
                                    <span className="font-bold">
                                        {SLOT_DURATION} minutes
                                    </span>
                                    . Slots will be created automatically
                                    within your selected consultation hours.
                                </p>
                            </div>
                        </div>

                        {/* Live Schedule Preview */}
                        {slotPreview.totalSlots > 0 && (
                            <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <h4 className="text-sm font-semibold text-slate-900">
                                        Schedule Preview
                                    </h4>

                                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                                        20 min / slot
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            label: "Days",
                                            value: slotPreview.days
                                        },
                                        {
                                            label: "Slots / Day",
                                            value: slotPreview.slotsPerDay
                                        },
                                        {
                                            label: "Total Slots",
                                            value: slotPreview.totalSlots
                                        }
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="rounded-xl border border-violet-100 bg-white p-3 text-center"
                                        >
                                            <p className="text-xl font-bold text-violet-700">
                                                {item.value}
                                            </p>

                                            <p className="mt-1 text-[11px] font-medium text-slate-500">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 border-t bg-slate-50/80 px-6 py-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                            className="h-11 rounded-xl px-5"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isPending ||
                                slotPreview.totalSlots === 0
                            }
                            className="h-11 gap-2 rounded-xl bg-violet-600 px-5 font-semibold text-white shadow-md shadow-violet-500/15 transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    Create Schedule
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleFormDialog;