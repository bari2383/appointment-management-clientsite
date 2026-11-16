/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import AppointmentCountdown from "./AppointmentCountdown";
import { AppointmentStatus, IAppointment, PaymentStatus } from "../../../../../types/appintment.interface";
import { initiatePayment } from "@/services/Payment/paymentManagement";
import { changeAppointmentStatus } from "@/services/Appointment/appointmentManagement";

interface AppointmentDetailProps {
  appointment: IAppointment;
}

const AppointmentDetails = ({ appointment }: AppointmentDetailProps) => {
  const router = useRouter();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const isCompleted = appointment.status === AppointmentStatus.COMPLETED;
  const isCanceled = appointment.status === AppointmentStatus.CANCELED;
  const isScheduled = appointment.status === AppointmentStatus.SCHEDULED;
  const canReview =
    isCompleted &&
    appointment.paymentStatus === PaymentStatus.PAID;
  const canCancel = isScheduled && !isCanceled;

  const handlePayNow = async () => {
    setIsProcessingPayment(true);
    try {
      const result = await initiatePayment(appointment.id);

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
        setIsProcessingPayment(false);
      }
    } catch (error) {
      toast.error("An error occurred while initiating payment");
      setIsProcessingPayment(false);
      console.error(error);
    }
  };

  const handleCancelAppointment = async () => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    setIsCancelling(true);
    try {
      const result = await changeAppointmentStatus(
        appointment.id,
        AppointmentStatus.CANCELED
      );

      if (result.success) {
        toast.success("Appointment cancelled successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel appointment");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling appointment");
      console.error(error);
    } finally {
      setIsCancelling(false);
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
          "gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide shadow-none border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50 before:size-1.5 before:rounded-full before:content-[''] before:bg-amber-500",
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
  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-2 [animation-duration:500ms] motion-reduce:animate-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[32px] sm:leading-tight">
            Appointment Details
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
            Complete information about your appointment
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          {canCancel && (
            <Button
              variant="destructive"
              className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
              onClick={handleCancelAppointment}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Appointment"
              )}
            </Button>
          )}
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-slate-700 shadow-none transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>

      {/* Review Notification - Only show if can review (completed but no review) */}
      {canReview && (
        <Card className="gap-0 overflow-hidden rounded-2xl border-amber-200/80 bg-amber-50/70 py-0 shadow-none">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="size-9 shrink-0 rounded-lg bg-amber-100 p-2 text-amber-600" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-amber-900">
                  Review This Appointment
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-amber-700">
                  Your appointment has been completed. Share your experience by
                  leaving a review for Dr. {appointment.doctor?.name}.
                </p>
                <Button
                  onClick={() => setShowReviewDialog(true)}
                  className="mt-4 rounded-lg bg-amber-600 shadow-sm shadow-amber-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                  size="sm"
                >
                  Write a Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Required Alert - Show if completed but not paid */}
      {!isCompleted &&
        appointment.paymentStatus === PaymentStatus.UNPAID && (
          <Card className="gap-0 overflow-hidden rounded-2xl border-red-200/80 bg-red-50/70 py-0 shadow-none">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="size-9 shrink-0 rounded-lg bg-red-100 p-2 text-red-600" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold text-red-900">
                    Payment Required to Review
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-red-700">
                    Please complete the payment for this appointment before
                    leaving a review.
                  </p>
                  <Button
                    onClick={handlePayNow}
                    disabled={isProcessingPayment}
                    className="mt-4 rounded-lg bg-red-600 shadow-sm shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                    size="sm"
                  >
                    {isProcessingPayment ? (
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
                </div>
              </div>
            </CardContent>
          </Card>
        )}


      <div className="grid items-start gap-6 lg:grid-cols-2">
        {/* Doctor Information */}
        <Card className="group relative gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.25)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-500 hover:before:scale-x-100">
          <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
            <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-slate-900">
              <User className="size-7 rounded-lg bg-blue-50 p-1.5 text-blue-600 ring-1 ring-blue-100" />
              Doctor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-5">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-md ring-4 ring-white transition-all duration-300 group-hover:border-blue-300">
                <Avatar className="size-full !rounded-none">
                  <AvatarImage
                    src={appointment.doctor?.profilePhoto || ""}
                    alt={appointment.doctor?.name || "Doctor"}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <AvatarFallback className="!rounded-none bg-blue-50 text-2xl font-semibold text-blue-600">
                    {getInitials(appointment.doctor?.name || "Doctor")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {appointment.doctor?.name || "N/A"}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                  {appointment.doctor?.designation || "Doctor"}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {appointment.doctor?.doctorSpecialties &&
              appointment.doctor.doctorSpecialties.length > 0 && (
                <>
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {appointment.doctor.doctorSpecialties.map((ds, idx) => (
                        <Badge key={idx} variant="secondary" className="rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100/70">
                          {ds.specialities?.title || "N/A"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator className="bg-slate-100" />
                </>
              )}

            <div className="-mx-3 space-y-0.5">
              {appointment.doctor?.qualification && (
                <div className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-slate-50">
                  <span className="text-slate-500">Qualification:</span>
                  <span className="text-right font-medium text-slate-900">
                    {appointment.doctor.qualification}
                  </span>
                </div>
              )}

              {appointment.doctor?.experience !== undefined && (
                <div className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-slate-50">
                  <span className="text-slate-500">Experience:</span>
                  <span className="text-right font-medium text-slate-900">
                    {appointment.doctor.experience} years
                  </span>
                </div>
              )}

              {appointment.doctor?.currentWorkingPlace && (
                <div className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-slate-50">
                  <span className="text-slate-500">Working at:</span>
                  <span className="text-right font-medium text-slate-900">
                    {appointment.doctor.currentWorkingPlace}
                  </span>
                </div>
              )}
            </div>

            <Separator className="bg-slate-100" />

            <div className="-mx-3 space-y-0.5">
              {appointment.doctor?.contactNumber && (
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-colors duration-200 hover:bg-blue-50/70">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span>{appointment.doctor.contactNumber}</span>
                </div>
              )}

              {appointment.doctor?.address && (
                <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-colors duration-200 hover:bg-blue-50/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <span>{appointment.doctor.address}</span>
                </div>
              )}
            </div>

            {appointment.doctor?.appointmentFee !== undefined && (
              <>
                <Separator className="bg-slate-100" />
                <div className="rounded-xl border border-blue-700/20 bg-blue-600 p-5 shadow-lg shadow-blue-600/20 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-100">
                      Consultation Fee
                    </span>
                    <span className="text-3xl font-semibold tabular-nums tracking-tight text-white">
                      ${appointment.doctor.appointmentFee}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <div className="space-y-6 lg:col-span-1">
          {/* Status */}
          <Card className="group relative gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.25)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-500 hover:before:scale-x-100">
            <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight text-slate-900">Appointment Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Current Status
                </span>
                {getStatusBadge(appointment.status)}
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          {appointment.schedule && (
            <Card className="group relative gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.25)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-500 hover:before:scale-x-100">
              <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
                <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-slate-900">
                  <Calendar className="size-7 rounded-lg bg-blue-50 p-1.5 text-blue-600 ring-1 ring-blue-100" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date</p>
                    <p className="text-3xl font-semibold tracking-tight text-slate-900">
                      {format(
                        new Date(appointment.schedule.startDateTime),
                        "EEEE"
                      )}
                    </p>
                    <p className="text-sm text-slate-600">
                      {format(
                        new Date(appointment.schedule.startDateTime),
                        "MMMM d, yyyy"
                      )}
                    </p>
                  </div>

                  <Separator className="bg-blue-100" />

                  <div className="flex items-center gap-3">
                    <Clock className="size-9 rounded-lg bg-white p-2 text-blue-600 shadow-sm ring-1 ring-slate-200" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Time</p>
                      <p className="text-lg font-semibold tabular-nums text-slate-900">
                        {format(
                          new Date(appointment.schedule.startDateTime),
                          "h:mm a"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(appointment.schedule.endDateTime),
                          "h:mm a"
                        )}
                      </p>
                    </div>
                  </div>

                  {appointment.status === AppointmentStatus.SCHEDULED &&
                    appointment.schedule.startDateTime && (
                      <>
                        <Separator className="bg-blue-100" />
                        <div className="pt-2">
                          <AppointmentCountdown
                            appointmentDateTime={
                              appointment.schedule.startDateTime
                            }
                            className="text-blue-700"
                          />
                        </div>
                      </>
                    )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prescription */}
          {appointment.prescription && (
            <Card className="gap-0 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(16,185,129,0.18)]">
              <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-6 py-4 [.border-b]:pb-4">
                <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-emerald-700">
                  <CheckCircle2 className="size-7 rounded-lg bg-emerald-100 p-1.5 text-emerald-600" />
                  Prescription Available
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Instructions:
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-700">
                      {appointment.prescription.instructions}
                    </p>
                  </div>

                  {appointment.prescription.followUpDate && (
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                        Follow-up Date:
                      </span>
                      <p className="mt-1 text-sm text-emerald-700">
                        {format(
                          new Date(appointment.prescription.followUpDate),
                          "MMMM d, yyyy"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

    </div>
  );
};

export default AppointmentDetails;