"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { Clock, DollarSign, Eye, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookAppointmentDialog from "./BookAppointmentDialog";
import { IDoctor } from "../../../../types/doctor.interface";


interface DoctorCard {
    doctor: IDoctor;
}

export default function DoctorCard({ doctor }: DoctorCard) {

    const [showScheduleModal, setShowScheduleModal] = useState(false);

    return (
        <>
            <Card className="group relative mx-auto h-full w-full max-w-[22rem] gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_28px_-20px_rgba(15,23,42,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.10),0_18px_40px_-18px_rgba(37,99,235,0.30)] before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:origin-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-500 hover:before:scale-x-100 animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:rounded-3xl sm:p-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/40 dark:hover:shadow-[0_0_0_4px_rgba(96,165,250,0.12),0_24px_50px_-18px_rgba(37,99,235,0.35)]">
                <CardHeader className="p-0">
                    <div className="flex flex-col items-stretch gap-0">
                        <Avatar className="relative isolate block aspect-[16/11] h-auto w-full shrink-0 overflow-hidden !rounded-xl border-0 bg-slate-100 shadow-none after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-slate-900/25 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-100 sm:aspect-[16/11] sm:!rounded-2xl dark:bg-slate-800">
                            <AvatarImage src={doctor.profilePhoto || ""} alt={doctor.name} className="h-full w-full scale-[1.06] object-cover object-[50%_15%] transition-transform duration-500 ease-out group-hover:scale-[1.12] motion-reduce:group-hover:scale-[1.06]" />
                            <AvatarFallback className="h-full w-full !rounded-xl bg-gradient-to-br from-slate-100 to-blue-50 text-2xl font-semibold text-slate-400 sm:!rounded-2xl sm:text-3xl dark:from-slate-800 dark:to-slate-900 dark:text-slate-500">
                                {getInitials(doctor.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1 px-2.5 pb-0.5 pt-3 sm:px-3 sm:pt-3">
                            <CardTitle className="line-clamp-1 text-base font-semibold leading-tight tracking-tight !text-slate-900 transition-colors duration-200 group-hover:!text-blue-700 sm:text-lg dark:!text-white dark:group-hover:!text-blue-300">
                                {doctor.name}
                            </CardTitle>
                            <CardDescription className="mt-0.5 line-clamp-2 text-[13px] font-medium leading-snug !text-slate-500 sm:text-sm dark:!text-slate-400">
                                {doctor.designation}
                            </CardDescription>

                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                                <div className="flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 shadow-sm dark:border-amber-400/20 dark:bg-amber-400/10">
                                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-semibold !text-slate-700 dark:!text-amber-200">
                                        {doctor.averageRating?.toFixed(1) || "N/A"}
                                    </span>
                                </div>
                                {doctor.doctorSpecialties &&
                                    doctor.doctorSpecialties.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {doctor.doctorSpecialties &&
                                                doctor.doctorSpecialties.length > 0 && (
                                                    <Badge variant="secondary" className="rounded-full border !border-blue-100 !bg-blue-50 px-2.5 py-0.5 text-xs font-medium !text-blue-700 shadow-none hover:!bg-blue-100 dark:!border-blue-400/20 dark:!bg-blue-400/10 dark:!text-blue-300 dark:hover:!bg-blue-400/15">
                                                        {doctor.doctorSpecialties[0].specialities?.title}
                                                    </Badge>
                                                )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-2 px-2.5 pb-2 pt-2 sm:px-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-2 py-1.5 text-slate-600 transition-colors duration-200 hover:border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                            <span className="truncate text-xs font-medium">{doctor.experience} years experience</span>
                        </div>
                        <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-2 py-1.5 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                            <DollarSign className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                            <span className="text-sm font-semibold tabular-nums text-blue-700 dark:text-blue-300">
                                ${doctor.appointmentFee}
                            </span>
                        </div>
                    </div>

                    {doctor.currentWorkingPlace && (
                        <div className="flex items-start gap-1.5 text-[13px] font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                            <span className="line-clamp-1">{doctor.currentWorkingPlace}</span>
                        </div>
                    )}

                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-2.5 py-2 text-sm transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50/60 dark:border-slate-700 dark:bg-slate-800/50">
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">Qualification:</p>
                        <p className="line-clamp-2 text-[13px] leading-snug text-slate-700 sm:text-sm dark:text-slate-200">
                            {doctor.qualification}
                        </p>
                    </div>

                    {doctor.doctorSpecialties && doctor.doctorSpecialties.length > 1 && (
                        <div className="flex flex-wrap gap-1.5">
                            {doctor.doctorSpecialties.slice(1, 3).map((specialty) => (
                                <Badge
                                    key={specialty.specialitiesId}
                                    variant="outline"
                                    className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-none transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                                >
                                    {specialty.specialities?.title}
                                </Badge>
                            ))}
                            {doctor.doctorSpecialties.length > 3 && (
                                <Badge variant="outline" className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-none transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                                    +{doctor.doctorSpecialties.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="mt-auto flex flex-wrap gap-2 px-2.5 pb-1.5 pt-1.5 sm:px-3">
                    <Link className="min-w-[7rem] flex-1" href={`/consultation/doctor/${doctor.id}`}>
                        <Button variant="outline" className="h-9 w-full cursor-pointer rounded-lg border-slate-200 !bg-white text-[13px] font-medium !text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:!border-blue-300 hover:!bg-blue-50 hover:!text-blue-700 active:scale-[0.98] dark:border-slate-700 dark:!bg-slate-900 dark:!text-slate-300 dark:hover:!border-blue-400/30 dark:hover:!bg-blue-400/10 dark:hover:!text-blue-300">
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            View Details
                        </Button>
                    </Link>
                    <Button onClick={() => setShowScheduleModal(true)} className="h-9 min-w-[7rem] flex-1 cursor-pointer rounded-lg !bg-blue-600 text-[13px] font-semibold !text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:!bg-blue-700 hover:shadow-[0_10px_22px_-8px_rgba(37,99,235,0.7)] active:translate-y-0 active:scale-[0.98]">
                        Book Appointment
                    </Button>
                </CardFooter>
            </Card>

            <BookAppointmentDialog
                doctor={doctor}
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
            />
        </>
    );
}