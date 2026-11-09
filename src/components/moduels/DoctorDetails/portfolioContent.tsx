import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
    Award,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    GraduationCap,
    Hospital,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Star,
    Stethoscope,
    Wallet,
} from "lucide-react";

import type { ReactNode } from "react";
import { IDoctor } from "../../../../types/doctor.interface";

interface DoctorProfileContentProps {
    doctor: IDoctor;
}

interface InfoItemProps {
    icon: ReactNode;
    label: string;
    value?: string | number | null;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
    return (
        <div className="group flex items-start gap-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border border-blue-100/70 bg-blue-50/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-sky-500/40 dark:hover:bg-slate-800/80">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-[#1f6fe5] to-[#38a6f0] text-white shadow-lg shadow-blue-600/30 transition-all duration-300 group-hover:scale-105 group-hover:from-emerald-500 group-hover:to-emerald-400 group-hover:shadow-emerald-600/30">
                {icon}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                    {label}
                </p>

                <p className="break-words text-[15px] font-semibold leading-relaxed text-[#12326b] dark:text-slate-100">
                    {value || "Not specified"}
                </p>
            </div>
        </div>
    );
};

const SectionHeader = ({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description?: string;
}) => {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-[#12326b] via-[#1f5fd0] to-[#2f8de8] text-white shadow-lg shadow-blue-700/30 ring-4 ring-blue-50 dark:ring-slate-800">
                {icon}
            </div>

            <div className="space-y-1">
                <h3 className="text-xl font-extrabold tracking-tight text-[#12326b] dark:text-white">
                    {title}
                </h3>

                {description && (
                    <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

const DoctorProfileContent = ({ doctor }: DoctorProfileContentProps) => {
    const initials = doctor.name
        .trim()
        .split(/\s+/)
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const specialties = doctor.doctorSpecialties || [];

    const rating = Number(doctor.averageRating) || 0;

    const appointmentFee = Number(doctor.appointmentFee) || 0;

    const formattedFee = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(appointmentFee);

    return (
        <div className="w-full space-y-8 lg:space-y-10">

            {/* ================= PROFILE HEADER ================= */}

            <Card className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-3xl rounded-bl-3xl border-0 bg-white py-0 shadow-[0_30px_80px_-20px_rgba(18,50,107,0.35)] ring-1 ring-blue-900/5 dark:bg-slate-900 dark:ring-white/10">

                {/* Cover Background */}

                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#0b2150] via-[#1450b8] to-[#2f8de8] [clip-path:ellipse(85%_100%_at_50%_0%)] before:absolute before:-bottom-6 before:right-24 before:h-12 before:w-44 before:rounded-full before:bg-white/10 before:content-[''] after:absolute after:-bottom-[88px] after:right-40 after:h-44 after:w-12 after:rounded-full after:bg-white/10 after:content-[''] sm:h-56">

                    <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

                    <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />

                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-950/30 backdrop-blur-md">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                        Medical Professional
                    </div>
                </div>

                <CardContent className="relative px-5 pb-8 pt-0 sm:px-10 sm:pb-12">

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">

                        {/* Avatar */}

                        <div className="-mt-16 flex shrink-0 justify-center md:-mt-20 md:justify-start">

                            <div className="relative">

                                <Avatar className="h-32 w-32 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border-[5px] border-white bg-slate-100 shadow-2xl shadow-blue-900/30 ring-2 ring-[#1f6fe5]/60 ring-offset-2 ring-offset-white sm:h-40 sm:w-40 dark:border-slate-900 dark:bg-slate-800 dark:ring-sky-500/60 dark:ring-offset-slate-900">

                                    {doctor.profilePhoto && (
                                        <AvatarImage
                                            src={
                                                typeof doctor.profilePhoto === "string"
                                                    ? doctor.profilePhoto
                                                    : undefined
                                            }
                                            alt={doctor.name}
                                            className="object-cover"
                                        />
                                    )}

                                    <AvatarFallback className="rounded-none bg-gradient-to-br from-blue-100 via-sky-50 to-emerald-50 text-4xl font-extrabold text-[#12326b] dark:from-blue-950 dark:to-slate-800 dark:text-sky-300">
                                        {initials}
                                    </AvatarFallback>

                                </Avatar>

                                <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-4 ring-emerald-400/20 dark:border-slate-900">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                            </div>

                        </div>

                        {/* Doctor Details */}

                        <div className="min-w-0 flex-1 space-y-4 pt-1 text-center md:pt-6 md:text-left">

                            <div className="space-y-2.5">

                                <h1 className="bg-gradient-to-r from-[#12326b] to-[#1f6fe5] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl dark:from-white dark:to-sky-300">
                                    {doctor.name}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">

                                    <Stethoscope className="h-5 w-5 text-[#1f6fe5] dark:text-sky-400" />

                                    <p className="text-lg font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                                        {doctor.designation || "Medical Professional"}
                                    </p>

                                </div>

                                <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 md:justify-start dark:text-slate-400">
                                    <Hospital className="h-4 w-4 shrink-0 text-emerald-500" />
                                    <span>{doctor.currentWorkingPlace}</span>
                                </div>

                            </div>

                            {/* Specialties */}

                            {specialties.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 md:justify-start">

                                    {specialties.map((specialty) => (
                                        <Badge
                                            key={specialty.specialitiesId}
                                            variant="secondary"
                                            className="rounded-full border-0 bg-[#12326b] px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-md shadow-blue-900/25 transition-colors duration-200 hover:bg-[#1f5fd0] dark:border dark:border-sky-400/20 dark:bg-sky-500/15 dark:text-sky-200"
                                        >
                                            {specialty.specialities?.title || "Specialty"}
                                        </Badge>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Divider */}

                    <div className="my-8 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent dark:via-sky-700/60" />

                    {/* Stats */}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Rating */}

                        <div className="group relative flex items-center gap-4 overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-5 pl-6 shadow-lg shadow-blue-900/5 transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-gradient-to-b before:from-[#1f6fe5] before:to-sky-400 before:content-[''] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-blue-900/40 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-[#1f6fe5] to-[#38a6f0] text-amber-300 shadow-lg shadow-blue-600/30">
                                <Star className="h-6 w-6 fill-current" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-4xl font-black tracking-tight text-[#12326b] dark:text-white">
                                    {rating > 0 ? rating.toFixed(1) : "N/A"}
                                </p>

                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                                    Patient Rating
                                </p>
                            </div>

                        </div>

                        {/* Experience */}

                        <div className="group relative flex items-center gap-4 overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white p-5 pl-6 shadow-lg shadow-slate-900/5 transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-gradient-to-b before:from-[#12326b] before:to-[#1f5fd0] before:content-[''] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:border-slate-700 dark:from-slate-800/60 dark:via-slate-900 dark:to-slate-900">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-[#12326b] to-[#1f5fd0] text-white shadow-lg shadow-blue-900/30">
                                <BriefcaseBusiness className="h-6 w-6" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-4xl font-black tracking-tight text-[#12326b] dark:text-white">
                                    {doctor.experience ?? 0}
                                    <span className="ml-1.5 text-sm font-semibold text-slate-500">
                                        Years
                                    </span>
                                </p>

                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                                    Experience
                                </p>
                            </div>

                        </div>

                        {/* Appointment Fee */}

                        <div className="group relative flex items-center gap-4 overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 pl-6 shadow-lg shadow-emerald-900/5 transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-gradient-to-b before:from-emerald-500 before:to-emerald-300 before:content-[''] hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-emerald-900/40 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-600/30">
                                <Wallet className="h-6 w-6" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-4xl font-black tracking-tight text-[#12326b] dark:text-white">
                                    {formattedFee}
                                </p>

                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                                    Consultation Fee
                                </p>
                            </div>

                        </div>

                    </div>

                </CardContent>
            </Card>

            {/* ================= DETAILS GRID ================= */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                {/* Contact Information */}

                <Card className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-blue-100/80 bg-white py-0 shadow-xl shadow-blue-900/10 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#1f6fe5] before:via-sky-400 before:to-transparent before:content-[''] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/15 dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-6 p-6 pt-9 sm:p-8 sm:pt-11">

                        <SectionHeader
                            icon={<Mail className="h-5 w-5" />}
                            title="Contact Information"
                            description="Professional contact and location details"
                        />

                        <div className="h-px bg-gradient-to-r from-blue-300/70 via-slate-200 to-transparent dark:from-sky-700/60 dark:via-slate-700" />

                        <div className="space-y-2.5">

                            <InfoItem
                                icon={<Mail className="h-5 w-5" />}
                                label="Email Address"
                                value={doctor.email}
                            />

                            <InfoItem
                                icon={<Phone className="h-5 w-5" />}
                                label="Phone Number"
                                value={doctor.contactNumber}
                            />

                            <InfoItem
                                icon={<MapPin className="h-5 w-5" />}
                                label="Address"
                                value={doctor.address}
                            />

                        </div>

                    </CardContent>
                </Card>

                {/* Professional Details */}

                <Card className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-blue-100/80 bg-white py-0 shadow-xl shadow-blue-900/10 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#12326b] before:via-[#1f6fe5] before:to-transparent before:content-[''] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/15 dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-6 p-6 pt-9 sm:p-8 sm:pt-11">

                        <SectionHeader
                            icon={<Award className="h-5 w-5" />}
                            title="Professional Details"
                            description="Medical credentials and professional background"
                        />

                        <div className="h-px bg-gradient-to-r from-blue-300/70 via-slate-200 to-transparent dark:from-sky-700/60 dark:via-slate-700" />

                        <div className="space-y-2.5">

                            <InfoItem
                                icon={<BriefcaseBusiness className="h-5 w-5" />}
                                label="Experience"
                                value={`${doctor.experience ?? 0} Years`}
                            />

                            <InfoItem
                                icon={<Hospital className="h-5 w-5" />}
                                label="Current Workplace"
                                value={doctor.currentWorkingPlace}
                            />

                            <InfoItem
                                icon={<ShieldCheck className="h-5 w-5" />}
                                label="Registration Number"
                                value={doctor.registrationNumber}
                            />

                        </div>

                    </CardContent>
                </Card>

            </div>

            {/* ================= QUALIFICATION ================= */}

            <Card className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-emerald-100/80 bg-white py-0 shadow-xl shadow-emerald-900/5 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-emerald-400 before:via-emerald-300 before:to-transparent before:content-[''] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/10 dark:border-slate-800 dark:bg-slate-900">

                <CardContent className="space-y-6 p-6 pt-9 sm:p-8 sm:pt-11">

                    <SectionHeader
                        icon={<GraduationCap className="h-5 w-5" />}
                        title="Qualification & Education"
                        description="Academic qualifications and medical education"
                    />

                    <div className="h-px bg-gradient-to-r from-emerald-300/70 via-slate-200 to-transparent dark:from-emerald-700/60 dark:via-slate-700" />

                    <div className="flex items-start gap-5 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/60 p-6 sm:p-7 dark:border-slate-800 dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-800/40">

                        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-600/30 sm:flex">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 space-y-2.5">

                            <div className="flex items-center gap-2">
                                <h4 className="text-lg font-extrabold tracking-tight text-[#12326b] dark:text-white">
                                    Medical Education
                                </h4>

                                <Badge
                                    variant="outline"
                                    className="rounded-full border-emerald-200 bg-emerald-50 px-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                                >
                                    Qualification
                                </Badge>
                            </div>

                            <p className="whitespace-pre-line text-lg font-semibold leading-8 text-slate-700 dark:text-slate-200">
                                {doctor.qualification || "Qualification information not available."}
                            </p>

                        </div>

                    </div>

                </CardContent>
            </Card>

        </div>
    );
};

export default DoctorProfileContent;