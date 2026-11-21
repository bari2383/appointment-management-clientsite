"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import {
    Calendar,
    CheckCircle2,
    Clock,
    CreditCard,
    Loader2,
    MapPin,
    Phone,
    Stethoscope,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { IDoctor } from "../../../../../types/doctor.interface";
import { ISchedule } from "../../../../../types/schedule.interface";
import { createAppointment, createAppointmentWithPayLater } from "@/services/Appointment/appointmentManagement";

interface AppointmentConfirmationProps {
    doctor: IDoctor;
    schedule: ISchedule;
}

const AppointmentConfirmation = ({
    doctor,
    schedule,
}: AppointmentConfirmationProps) => {
    const router = useRouter();

    const [isPayingNow, setIsPayingNow] = useState(false);
    const [isPayingLater, setIsPayingLater] = useState(false);

    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleConfirmBooking = async () => {
        setIsPayingNow(true);

        try {
            const result = await createAppointment({
                doctorId: doctor.id!,
                scheduleId: schedule.id,
            });

            if (result.success && result.data?.paymentUrl) {
                toast.success("Redirecting to payment...");
                // Redirect to Stripe checkout
                window.location.replace(result.data.paymentUrl);
            } else if (result.success) {
                setBookingSuccess(true);
                toast.success("Appointment booked successfully!");

                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push("/dashboard/my-appointments");
                }, 2000);
            } else {
                toast.error(result.message || "Failed to book appointment");
                setIsPayingNow(false);
            }
        } catch (error) {
            toast.error("An error occurred while booking the appointment");
            setIsPayingNow(false);
            console.error(error);
        }
    };

    const handlePayLater = async () => {
        setIsPayingLater(true);

        try {
            const result = await createAppointmentWithPayLater({
                doctorId: doctor.id!,
                scheduleId: schedule.id,
            });

            if (result.success) {
                setBookingSuccess(true);
                toast.success(
                    "Appointment booked! You can pay later from your appointments page."
                );

                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push("/dashboard/my-appointments");
                }, 2000);
            } else {
                toast.error(result.message || "Failed to book appointment");
                setIsPayingLater(false);
            }
        } catch (error) {
            toast.error("An error occurred while booking the appointment");
            setIsPayingLater(false);
            console.error(error);
        }
    };

    if (bookingSuccess) {
        return (
            <div className="mx-auto max-w-2xl animate-in fade-in zoom-in-95 [animation-duration:400ms] motion-reduce:animate-none">
                <Card className="gap-0 overflow-hidden rounded-2xl border-emerald-200 bg-emerald-50/70 py-0 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.25)]">
                    <CardContent className="p-8 sm:p-12">
                        <div className="space-y-5 text-center">
                            <div className="flex justify-center">
                                <CheckCircle2 className="size-16 rounded-full bg-emerald-100 p-3.5 text-emerald-600 ring-8 ring-emerald-50 animate-in zoom-in-50 [animation-duration:500ms] motion-reduce:animate-none" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-emerald-900 sm:text-3xl">
                                    Appointment Confirmed!
                                </h2>
                                <p className="mt-2 text-base text-emerald-700">
                                    Your appointment has been successfully booked
                                </p>
                            </div>
                            <p className="text-sm text-emerald-600 animate-pulse motion-reduce:animate-none">
                                Redirecting to your appointments...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 [animation-duration:500ms] motion-reduce:animate-none">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[32px] sm:leading-tight">
                    Confirm Appointment
                </h1>
                <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
                    Review the details below and confirm your appointment
                </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-2">
                {/* Doctor Information Card */}
                <Card className="gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_36px_-12px_rgba(15,23,42,0.14)]">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
                        <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-slate-900">
                            <User className="size-7 rounded-lg bg-blue-50 p-1.5 text-blue-600 ring-1 ring-blue-100" />
                            Doctor Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div>
                            <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{doctor.name}</p>
                            <p className="mt-1 text-sm font-medium text-slate-500">{doctor.designation}</p>
                        </div>

                        <Separator className="bg-slate-100" />

                        {doctor.doctorSpecialties &&
                            doctor.doctorSpecialties.length > 0 && (
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4 text-slate-400" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Specialties</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.doctorSpecialties.map((ds, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                                            >
                                                {ds.specialities?.title || "N/A"}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        <Separator className="bg-slate-100" />

                        <div className="space-y-2">
                            {doctor.qualification && (
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Qualification:
                                    </span>
                                    <span className="text-right text-sm font-medium text-slate-900">
                                        {doctor.qualification}
                                    </span>
                                </div>
                            )}

                            {doctor.experience !== undefined && (
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Experience:
                                    </span>
                                    <span className="text-right text-sm font-medium text-slate-900">
                                        {doctor.experience} years
                                    </span>
                                </div>
                            )}

                            {doctor.currentWorkingPlace && (
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Working at:
                                    </span>
                                    <span className="text-right text-sm font-medium text-slate-900">
                                        {doctor.currentWorkingPlace}
                                    </span>
                                </div>
                            )}
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="space-y-2">
                            {doctor.contactNumber && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm text-slate-700">{doctor.contactNumber}</span>
                                </div>
                            )}

                            {doctor.address && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm text-slate-700">{doctor.address}</span>
                                </div>
                            )}
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    Consultation Fee
                                </span>
                                <span className="text-2xl font-semibold tabular-nums tracking-tight text-blue-600">
                                    ${doctor.appointmentFee}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Information Card */}
                <Card className="gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_36px_-12px_rgba(15,23,42,0.14)]">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
                        <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-slate-900">
                            <Calendar className="size-7 rounded-lg bg-blue-50 p-1.5 text-blue-600 ring-1 ring-blue-100" />
                            Appointment Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="space-y-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6">
                            <div>
                                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date</p>
                                <p className="text-2xl font-semibold tracking-tight text-slate-900">
                                    {format(new Date(schedule.startDateTime), "EEEE")}
                                </p>
                                <p className="text-base text-slate-600">
                                    {format(new Date(schedule.startDateTime), "MMMM d, yyyy")}
                                </p>
                            </div>

                            <Separator className="bg-slate-100" />

                            <div className="flex items-center gap-3">
                                <Clock className="size-9 rounded-lg bg-white p-2 text-blue-600 shadow-sm ring-1 ring-slate-200" />
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Time</p>
                                    <p className="text-base font-semibold tabular-nums text-slate-900">
                                        {format(new Date(schedule.startDateTime), "h:mm a")} -{" "}
                                        {format(new Date(schedule.endDateTime), "h:mm a")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <h3 className="text-sm font-semibold text-slate-900">Important Information</h3>
                            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-600">
                                <li className="flex items-start gap-2.5">
                                    <span className="mt-px text-blue-400">•</span>
                                    <span>
                                        Please arrive 10 minutes before your scheduled time
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="mt-px text-blue-400">•</span>
                                    <span>
                                        Bring any relevant medical records or prescriptions
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="mt-px text-blue-400">•</span>
                                    <span>
                                        You can cancel or reschedule from your appointments page
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="mt-px text-blue-400">•</span>
                                    <span>
                                        A confirmation will be sent to your registered email
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="space-y-3 pt-2">
                            {/* <Button
                                onClick={handleConfirmBooking}
                                disabled={isBooking}
                                className="w-full"
                                size="lg"
                            >
                                {isPayingNow ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Pay Now & Book Appointment
                                    </>
                                )}
                            </Button> */}

                            <Button
                                onClick={handlePayLater}
                                disabled={isBooking}
                                variant="outline"
                                className="h-11 w-full rounded-xl border-blue-600 bg-blue-600 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-600/25 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
                                size="lg"
                            >
                                {isPayingLater ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Booking Appointment...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Book Now, Pay Later
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => router.back()}
                                disabled={isBooking}
                                className="h-10 w-full rounded-xl text-sm font-medium text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                            >
                                Go Back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentConfirmation;