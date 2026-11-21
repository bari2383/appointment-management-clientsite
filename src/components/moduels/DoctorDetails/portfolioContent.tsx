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
        <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-blue-300/70 hover:bg-blue-50/40 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08),0_8px_24px_-16px_rgba(37,99,235,0.35)] dark:border-slate-700/70 dark:bg-slate-800/40 dark:hover:border-slate-600 dark:hover:bg-slate-800/80">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200/80 bg-white text-blue-600 shadow-sm transition-colors duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
                {icon}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
                    {label}
                </p>

                <p className="break-words text-[15px] font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
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
        <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white ring-4 ring-blue-50 shadow-[0_10px_20px_-8px_rgba(37,99,235,0.6)] dark:ring-blue-500/10">
                {icon}
            </div>

            <div className="space-y-0.5">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
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
        <div className="w-full space-y-6 rounded-[2rem] border border-slate-200/70 bg-slate-50/80 p-3 sm:p-5 lg:space-y-7 lg:p-6 dark:border-slate-800 dark:bg-slate-950/40">

            {/* ================= PROFILE HEADER ================= */}

            <Card className="gap-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white py-0 shadow-[0_18px_55px_-28px_rgba(15,23,42,0.22)] animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-900">

                {/* Cover Background */}

                <div className="relative h-24 overflow-hidden border-b border-blue-100/80 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-100/70 before:absolute before:inset-0 before:bg-[radial-gradient(rgba(37,99,235,0.14)_1px,transparent_1px)] before:[background-size:20px_20px] before:content-[''] after:absolute after:-right-12 after:-top-20 after:h-56 after:w-56 after:rounded-full after:bg-blue-200/60 after:blur-3xl after:content-[''] sm:h-32 dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 dark:after:bg-blue-500/10">

                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/85 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        Medical Professional
                    </div>
                </div>

                <CardContent className="relative px-5 pb-6 pt-0 sm:px-8 sm:pb-8">

                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-7">

                        {/* Avatar */}

                        <div className="-mt-14 flex shrink-0 justify-center sm:-mt-16 md:justify-start">

                            <div className="relative animate-in fade-in zoom-in-90 [animation-duration:500ms] fill-mode-backwards [animation-delay:150ms] motion-reduce:animate-none">

                                <Avatar className="isolate h-28 w-28 overflow-hidden !rounded-[1.75rem] border-[5px] border-white bg-slate-100 ring-1 ring-blue-200/70 shadow-[0_18px_40px_-16px_rgba(37,99,235,0.35)] sm:h-36 sm:w-36 dark:border-slate-900 dark:bg-slate-800 dark:ring-slate-700">

                                    {doctor.profilePhoto && (
                                        <AvatarImage
                                            src={
                                                typeof doctor.profilePhoto === "string"
                                                    ? doctor.profilePhoto
                                                    : undefined
                                            }
                                            alt={doctor.name}
                                            className="h-full w-full scale-[1.08] object-cover object-top"
                                        />
                                    )}

                                    <AvatarFallback className="!rounded-none bg-gradient-to-br from-slate-100 to-blue-50 text-3xl font-semibold text-slate-500 dark:from-slate-800 dark:to-slate-900 dark:text-slate-300">
                                        {initials}
                                    </AvatarFallback>

                                </Avatar>

                                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white animate-in zoom-in-0 duration-300 fill-mode-backwards [animation-delay:500ms] motion-reduce:animate-none dark:border-slate-900">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>

                            </div>

                        </div>

                        {/* Doctor Details */}

                        <div className="min-w-0 flex-1 space-y-3 pb-1 text-center md:text-left">

                            <div className="space-y-2">

                                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.125rem] dark:text-white">
                                    {doctor.name}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">

                                    <Stethoscope className="h-5 w-5 text-blue-600" />

                                    <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                                        {doctor.designation || "Medical Professional"}
                                    </p>

                                </div>

                                <div className="flex items-center justify-center gap-2 text-[15px] text-slate-500 md:justify-start dark:text-slate-400">
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
                                            className="rounded-full border !border-blue-200 !bg-blue-50 px-3.5 py-1 text-sm font-medium !text-blue-700 shadow-none hover:!bg-blue-100 animate-in fade-in zoom-in-90 duration-300 fill-mode-backwards [animation-delay:300ms] motion-reduce:animate-none dark:!border-sky-500/30 dark:!bg-sky-500/10 dark:!text-sky-300"
                                        >
                                            {specialty.specialities?.title || "Specialty"}
                                        </Badge>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Divider */}

                    <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700" />

                    {/* Stats */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                        {/* Rating */}

                        <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-300/80 hover:shadow-[0_14px_30px_-18px_rgba(245,158,11,0.45)] animate-in fade-in slide-in-from-bottom-2 [animation-duration:500ms] fill-mode-backwards [animation-delay:250ms] motion-reduce:animate-none motion-reduce:hover:translate-y-0 dark:border-slate-700/70 dark:bg-slate-800/40">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-200 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-white dark:bg-amber-400/10 dark:ring-amber-400/30">
                                <Star className="h-5 w-5 fill-current" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                                    {rating > 0 ? rating.toFixed(1) : "N/A"}
                                </p>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Patient rating
                                </p>
                            </div>

                        </div>

                        {/* Experience */}

                        <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-300/80 hover:shadow-[0_14px_30px_-18px_rgba(37,99,235,0.45)] animate-in fade-in slide-in-from-bottom-2 [animation-duration:500ms] fill-mode-backwards [animation-delay:330ms] motion-reduce:animate-none motion-reduce:hover:translate-y-0 dark:border-slate-700/70 dark:bg-slate-800/40">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-200 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-400/10 dark:ring-blue-400/30">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                                    {doctor.experience ?? 0}
                                    <span className="ml-1.5 text-base font-medium text-slate-500">
                                        Years
                                    </span>
                                </p>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Experience
                                </p>
                            </div>

                        </div>

                        {/* Appointment Fee */}

                        <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-300/80 hover:shadow-[0_14px_30px_-18px_rgba(16,185,129,0.45)] animate-in fade-in slide-in-from-bottom-2 [animation-duration:500ms] fill-mode-backwards [animation-delay:410ms] motion-reduce:animate-none motion-reduce:hover:translate-y-0 dark:border-slate-700/70 dark:bg-slate-800/40">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-400/10 dark:ring-emerald-400/30">
                                <Wallet className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                                    {formattedFee}
                                </p>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Consultation fee
                                </p>
                            </div>

                        </div>

                    </div>

                </CardContent>
            </Card>

            {/* ================= DETAILS GRID ================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Contact Information */}

                <Card className="gap-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white py-0 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.2)] transition-[box-shadow,border-color] duration-300 ease-out hover:border-blue-300/70 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08),0_24px_60px_-28px_rgba(37,99,235,0.28)] animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards [animation-delay:150ms] motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-6 p-6 sm:p-7">

                        <SectionHeader
                            icon={<Mail className="h-5 w-5" />}
                            title="Contact Information"
                            description="Professional contact and location details"
                        />

                        <div className="h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700" />

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

                <Card className="gap-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white py-0 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.2)] transition-[box-shadow,border-color] duration-300 ease-out hover:border-blue-300/70 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08),0_24px_60px_-28px_rgba(37,99,235,0.28)] animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards [animation-delay:250ms] motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-900">

                    <CardContent className="space-y-6 p-6 sm:p-7">

                        <SectionHeader
                            icon={<Award className="h-5 w-5" />}
                            title="Professional Details"
                            description="Medical credentials and professional background"
                        />

                        <div className="h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700" />

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

            <Card className="gap-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white py-0 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.2)] transition-[box-shadow,border-color] duration-300 ease-out hover:border-blue-300/70 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08),0_24px_60px_-28px_rgba(37,99,235,0.28)] animate-in fade-in slide-in-from-bottom-3 [animation-duration:500ms] fill-mode-backwards [animation-delay:350ms] motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-900">

                <CardContent className="space-y-6 p-6 sm:p-7">

                    <SectionHeader
                        icon={<GraduationCap className="h-5 w-5" />}
                        title="Qualification & Education"
                        description="Academic qualifications and medical education"
                    />

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-700" />

                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 sm:p-6 dark:border-slate-700/70 dark:bg-slate-800/40">

                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 sm:flex dark:bg-emerald-400/10 dark:ring-emerald-400/30">
                            <GraduationCap className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 space-y-2">

                            <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Medical Education
                                </h4>

                                <Badge
                                    variant="outline"
                                    className="gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 shadow-none before:size-1.5 before:rounded-full before:bg-green-500 before:content-[''] dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                                >
                                    Qualification
                                </Badge>
                            </div>

                            <p className="whitespace-pre-line text-base leading-8 text-slate-700 dark:text-slate-200">
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