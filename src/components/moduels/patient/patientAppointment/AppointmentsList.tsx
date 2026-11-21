/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";

import { format } from "date-fns";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import AppointmentCountdown from "./AppointmentCountdown";
import { AppointmentStatus, IAppointment, PaymentStatus } from "../../../../../types/appintment.interface";
import { initiatePayment } from "@/services/Payment/paymentManagement";

interface AppointmentsListProps {
  appointments: IAppointment[];
}

const AppointmentsList = ({ appointments }: AppointmentsListProps) => {
  const [processingPaymentId, setProcessingPaymentId] = useState<string | null>(
    null
  );

  const handlePayNow = async (appointmentId: string) => {
    setProcessingPaymentId(appointmentId);
    try {
      const result = await initiatePayment(appointmentId);

      if (result.success && result.data?.paymentUrl) {
        toast.success("Redirecting to payment...");
        // Store return URL before redirecting to payment
        sessionStorage.setItem(
          "paymentReturnUrl",
          "/dashboard/my-appointments"
        );
        window.location.replace(result.data.paymentUrl);
      } else {
        toast.error(result.message || "Failed to initiate payment");
        setProcessingPaymentId(null);
      }
    } catch (error) {
      toast.error("An error occurred while initiating payment");
      setProcessingPaymentId(null);
      console.error(error);
    }
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const statusConfig: Record<
      AppointmentStatus,
      { variant: any; label: string; className?: string }
    > = {
      [AppointmentStatus.SCHEDULED]: {
        variant: "default",
        label: "Scheduled",
        className:
          "gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-blue-500",
      },
      [AppointmentStatus.INPROGRESS]: {
        variant: "secondary",
        label: "In Progress",
        className:
          "gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-amber-500 before:animate-pulse motion-reduce:before:animate-none",
      },
      [AppointmentStatus.COMPLETED]: {
        variant: "default",
        label: "Completed",
        className:
          "gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-green-200 bg-green-50 text-green-700 hover:bg-green-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-green-500",
      },
      [AppointmentStatus.CANCELED]: {
        variant: "destructive",
        label: "Canceled",
        className:
          "gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-red-200 bg-red-50 text-red-700 hover:bg-red-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-red-500",
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    if (status === PaymentStatus.PAID) {
      return (
        <Badge
          variant="default"
          className="gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-emerald-500"
        >
          Paid
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-amber-200 bg-amber-50 text-amber-700 before:size-1.5 before:rounded-full before:content-[''] before:bg-amber-500"
      >
        Payment Pending
      </Badge>
    );
  };

  if (appointments.length === 0) {
    return (
      <Card className="gap-0 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 py-0 shadow-none animate-in fade-in zoom-in-95 [animation-duration:500ms] motion-reduce:animate-none">
        <CardContent className="flex flex-col items-center justify-center px-6 py-16 sm:py-20">
          <Calendar className="mb-5 size-14 rounded-2xl border border-slate-200 bg-white p-3.5 text-blue-500 shadow-sm" />
          <h3 className="mb-1.5 text-lg font-semibold tracking-tight text-slate-900">No Appointments Yet</h3>
          <p className="max-w-sm text-center text-sm leading-relaxed text-slate-500">
            You haven&apos;t booked any appointments. Browse our doctors and
            book your first consultation.
          </p>
          <Button className="mt-7 h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 active:translate-y-0 active:scale-[0.97]" asChild>
            <a href="/consultation">Find a Doctor</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(2)]:[animation-delay:80ms] [&>*:nth-child(3)]:[animation-delay:160ms] [&>*:nth-child(4)]:[animation-delay:240ms] [&>*:nth-child(5)]:[animation-delay:320ms] [&>*:nth-child(6)]:[animation-delay:400ms]">
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          className="group relative gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_20px_44px_-14px_rgba(37,99,235,0.30)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-500 hover:before:scale-x-100 animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <CardContent className="space-y-4 p-5">
            {/* Status and Review Badge */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {getStatusBadge(appointment.status)}
                {getPaymentStatusBadge(appointment.paymentStatus)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {appointment.prescription && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-emerald-200 bg-emerald-50 text-emerald-700"
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    Prescription
                  </Badge>
                )}

              </div>
            </div>

            {/* Doctor Info */}
            <div>
              <div className="flex items-center gap-4">
                <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-sm ring-4 ring-white transition-all duration-300 group-hover:border-blue-300 group-hover:bg-blue-100/70 group-hover:shadow-md">
                  <Avatar className="size-full !rounded-none">
                    <AvatarImage
                      src={appointment.doctor?.profilePhoto || ""}
                      alt={appointment.doctor?.name || "Doctor"}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <AvatarFallback className="!rounded-none bg-blue-50 text-xl font-semibold text-blue-600">
                      {getInitials(appointment.doctor?.name || "Doctor")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
                    {appointment.doctor?.name || "N/A"}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {appointment.doctor?.designation || "Doctor"}
                  </p>
                </div>
              </div>
            </div>

            {/* Specialties */}
            {appointment.doctor?.doctorSpecialties &&
              appointment.doctor.doctorSpecialties.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Stethoscope className="h-4 w-4 text-slate-400" />
                  {appointment.doctor.doctorSpecialties
                    .slice(0, 2)
                    .map((ds, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100/70">
                        {ds.specialities?.title || "N/A"}
                      </Badge>
                    ))}
                  {appointment.doctor.doctorSpecialties.length > 2 && (
                    <Badge variant="secondary" className="rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100/70">
                      +{appointment.doctor.doctorSpecialties.length - 2} more
                    </Badge>
                  )}
                </div>
              )}

            {/* Schedule */}
            {appointment.schedule && (
              <div className="space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition-colors duration-300 group-hover:border-blue-200 group-hover:bg-blue-50/60">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-[15px] font-semibold text-slate-900">
                    {format(
                      new Date(appointment.schedule.startDateTime),
                      "EEEE, MMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-medium tabular-nums text-slate-700">
                    {format(
                      new Date(appointment.schedule.startDateTime),
                      "h:mm a"
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(appointment.schedule.endDateTime),
                      "h:mm a"
                    )}
                  </span>
                </div>
                {appointment.status === AppointmentStatus.SCHEDULED &&
                  appointment.schedule.startDateTime && (
                    <div className="border-t border-slate-200 pt-3 transition-colors duration-300 group-hover:border-blue-200">
                      <AppointmentCountdown
                        appointmentDateTime={appointment.schedule.startDateTime}
                      />
                    </div>
                  )}
              </div>
            )}

            {/* Address */}
            {appointment.doctor?.address && (
              <div className="flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span className="line-clamp-2">
                  {appointment.doctor.address}
                </span>
              </div>
            )}


          </CardContent>

          <CardFooter className="mt-auto border-t border-slate-100 bg-slate-50/60 px-5 py-4 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50/50">
            <div className="flex w-full gap-2">
              <Button variant="outline" size="sm" className="h-9 flex-1 rounded-lg border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-none transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/25 active:scale-[0.97]" asChild>
                <Link href={`/dashboard/my-appointments/${appointment.id}`}>
                  View Details
                </Link>
              </Button>
              {appointment.paymentStatus === PaymentStatus.UNPAID &&
                appointment.status !== AppointmentStatus.CANCELED && (
                  <Button
                    onClick={() => handlePayNow(appointment.id)}
                    disabled={processingPaymentId === appointment.id}
                    size="sm"
                    className="h-9 flex-1 rounded-lg bg-blue-600 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 active:translate-y-0 active:scale-[0.97] disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {processingPaymentId === appointment.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now
                      </>
                    )}
                  </Button>
                )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;