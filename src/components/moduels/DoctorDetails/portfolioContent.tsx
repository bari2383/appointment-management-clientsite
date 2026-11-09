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
        <div className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
                {icon}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">
                    {label}
                </p>

                <p className="break-words text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
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
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                {icon}
            </div>

            <div className="space-y-1">
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h3>

                {description && (
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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
        <div className="w-full space-y-6">

            {/* ================= PROFILE HEADER ================= */}

            <Card className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {/* Cover Background */}

                <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 sm:h-40">

                    <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl" />

                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Medical Professional
                    </div>
                </div>

                <CardContent className="relative px-5 pb-6 pt-0 sm:px-8 sm:pb-8">

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-7">

                        {/* Avatar */}

                        <div className="-mt-14 flex shrink-0 justify-center md:-mt-16 md:justify-start">

                            <div className="relative">

                                <Avatar className="h-28 w-28 border-[5px] border-white bg-slate-100 shadow-lg ring-1 ring-slate-200/60 sm:h-32 sm:w-32 dark:border-slate-900 dark:bg-slate-800 dark:ring-slate-700">

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

                                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-cyan-100 text-3xl font-bold text-blue-700 dark:from-blue-950 dark:to-slate-800 dark:text-blue-300">
                                        {initials}
                                    </AvatarFallback>

                                </Avatar>

                                <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-blue-600 text-white shadow-sm dark:border-slate-900">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>

                            </div>

                        </div>

                        {/* Doctor Details */}

                        <div className="min-w-0 flex-1 space-y-4 pt-1 text-center md:pt-5 md:text-left">

                            <div className="space-y-2">

                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                    {doctor.name}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">

                                    <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {doctor.designation || "Medical Professional"}
                                    </p>

                                </div>

                                <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 md:justify-start dark:text-slate-400">
                                    <Hospital className="h-4 w-4 shrink-0" />
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
                                            className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-none hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300"
                                        >
                                            {specialty.specialities?.title || "Specialty"}
                                        </Badge>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Divider */}

                    <div className="my-6 h-px bg-slate-100 dark:bg-slate-800" />

                    {/* Stats */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                        {/* Rating */}

                        <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                <Star className="h-5 w-5 fill-current" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {rating > 0 ? rating.toFixed(1) : "N/A"}
                                </p>

                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Patient Rating
                                </p>
                            </div>

                        </div>

                        {/* Experience */}

                        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {doctor.experience ?? 0}
                                    <span className="ml-1 text-sm font-medium text-slate-500">
                                        Years
                                    </span>
                                </p>

                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Experience
                                </p>
                            </div>

                        </div>

                        {/* Appointment Fee */}

                        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <Wallet className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {formattedFee}
                                </p>

                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Consultation Fee
                                </p>
                            </div>

                        </div>

                    </div>

                </CardContent>
            </Card>

            {/* ================= DETAILS GRID ================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Contact Information */}

                <Card className="rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-5 p-5 sm:p-6">

                        <SectionHeader
                            icon={<Mail className="h-5 w-5" />}
                            title="Contact Information"
                            description="Professional contact and location details"
                        />

                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                        <div className="space-y-1">

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

                <Card className="rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-5 p-5 sm:p-6">

                        <SectionHeader
                            icon={<Award className="h-5 w-5" />}
                            title="Professional Details"
                            description="Medical credentials and professional background"
                        />

                        <div className="h-px bg-slate-100 dark:bg-slate-800" />

                        <div className="space-y-1">

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

            <Card className="rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

                <CardContent className="space-y-5 p-5 sm:p-6">

                    <SectionHeader
                        icon={<GraduationCap className="h-5 w-5" />}
                        title="Qualification & Education"
                        description="Academic qualifications and medical education"
                    />

                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">

                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm sm:flex dark:bg-slate-800 dark:text-blue-400">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 space-y-2">

                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                    Medical Education
                                </h4>

                                <Badge
                                    variant="outline"
                                    className="rounded-full border-blue-200 bg-blue-50 text-[10px] font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
                                >
                                    Qualification
                                </Badge>
                            </div>

                            <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
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