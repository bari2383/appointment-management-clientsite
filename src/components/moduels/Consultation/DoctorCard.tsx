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
            <Card className="relative h-full gap-0 overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-blue-100/80 bg-white py-0 shadow-xl shadow-blue-900/10 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#1f6fe5] before:via-sky-400 before:to-emerald-400 before:content-[''] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 dark:border-slate-800 dark:bg-slate-900">
                <CardHeader className="px-6 pb-4 pt-8">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 rounded-tl-[1.75rem] rounded-br-[1.75rem] rounded-tr-xl rounded-bl-xl border-4 border-white shadow-xl shadow-blue-900/25 ring-2 ring-[#1f6fe5]/50 md:h-24 md:w-24 dark:border-slate-900 dark:ring-sky-500/50">
                            <AvatarImage src={doctor.profilePhoto || ""} alt={doctor.name} className="object-cover" />
                            <AvatarFallback className="rounded-none bg-gradient-to-br from-blue-100 via-sky-50 to-emerald-50 text-lg font-extrabold text-[#12326b] dark:from-blue-950 dark:to-slate-800 dark:text-sky-300">
                                {getInitials(doctor.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <CardTitle className="line-clamp-1 text-xl font-extrabold tracking-tight text-[#12326b] dark:text-white">
                                {doctor.name}
                            </CardTitle>
                            <CardDescription className="mt-1 line-clamp-1 font-medium text-slate-500 dark:text-slate-400">
                                {doctor.designation}
                            </CardDescription>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:ring-amber-900/50">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                                        {doctor.averageRating?.toFixed(1) || "N/A"}
                                    </span>
                                </div>
                                {doctor.doctorSpecialties &&
                                    doctor.doctorSpecialties.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {doctor.doctorSpecialties &&
                                                doctor.doctorSpecialties.length > 0 && (
                                                    <Badge variant="secondary" className="rounded-full border-0 bg-[#12326b] px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-md shadow-blue-900/20 hover:bg-[#1f5fd0] dark:bg-sky-500/15 dark:text-sky-200">
                                                        {doctor.doctorSpecialties[0].specialities?.title}
                                                    </Badge>
                                                )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3.5 px-6 pb-5">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 rounded-xl bg-blue-50/70 px-3 py-2.5 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                            <Clock className="h-4 w-4 shrink-0 text-[#1f6fe5] dark:text-sky-400" />
                            <span className="truncate font-medium">{doctor.experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50/70 px-3 py-2.5 text-slate-600 dark:bg-emerald-950/20 dark:text-slate-300">
                            <DollarSign className="h-4 w-4 shrink-0 text-emerald-500" />
                            <span className="font-extrabold text-[#12326b] dark:text-white">
                                ${doctor.appointmentFee}
                            </span>
                        </div>
                    </div>

                    {doctor.currentWorkingPlace && (
                        <div className="flex items-start gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span className="line-clamp-1">{doctor.currentWorkingPlace}</span>
                        </div>
                    )}

                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-white to-blue-50/50 p-3.5 text-sm dark:border-slate-800 dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-800/40">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Qualification:</p>
                        <p className="line-clamp-2 font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                            {doctor.qualification}
                        </p>
                    </div>

                    {doctor.doctorSpecialties && doctor.doctorSpecialties.length > 1 && (
                        <div className="flex flex-wrap gap-1.5">
                            {doctor.doctorSpecialties.slice(1, 3).map((specialty) => (
                                <Badge
                                    key={specialty.specialitiesId}
                                    variant="outline"
                                    className="rounded-full border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
                                >
                                    {specialty.specialities?.title}
                                </Badge>
                            ))}
                            {doctor.doctorSpecialties.length > 3 && (
                                <Badge variant="outline" className="rounded-full border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                                    +{doctor.doctorSpecialties.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="mt-auto flex flex-wrap gap-3 border-t border-blue-100/80 bg-slate-50/70 px-6 pb-6 pt-3 dark:border-slate-800 dark:bg-slate-800/30">
                    <Link className="flex-1" href={`/consultation/doctors/${doctor.id}`}>
                        <Button variant="outline" className="h-11 w-full cursor-pointer rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border-2 border-[#1f6fe5]/30 bg-white font-bold text-[#12326b] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1f6fe5] hover:bg-blue-50 hover:text-[#12326b] hover:shadow-md hover:shadow-blue-900/10 dark:border-sky-500/30 dark:bg-slate-900 dark:text-sky-200 dark:hover:bg-slate-800 dark:hover:text-sky-100">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>
                    </Link>
                    <Button onClick={() => setShowScheduleModal(true)} className="h-11 flex-1 cursor-pointer rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border-0 bg-gradient-to-r from-[#12326b] via-[#1f5fd0] to-[#2f8de8] font-bold text-white shadow-lg shadow-blue-700/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/40 hover:brightness-110">
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