"use client";

import Image from "next/image";
import Link from "next/link";

import doctorPatientHome from "@/assets/Images/doctor_patient_home.png";
import doctorsImage from "@/assets/Images/doctors_image.png";
import HeroAppointmentPreview from "@/components/moduels/Home/HeroAppointmentPreview";
import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Check,
    ChevronDown,
    Clock3,
    HeartPulse,
    Laptop,
    LockKeyhole,
    MessageSquareText,
    Quote,
    MonitorSmartphone,
    Search,
    ShieldCheck,
    Sparkles,
    Star,
    Stethoscope,
    UserRound,
    UsersRound,
    Video,
    WalletCards,
} from "lucide-react";


/*                                   DATA                                     */


const specialties = [
    {
        title: "Cardiology",
        description: "Heart health, blood pressure and cardiovascular care.",
        icon: HeartPulse,
        doctors: "42 Doctors",
    },
    {
        title: "Neurology",
        description: "Expert care for brain, spine and nervous system conditions.",
        icon: Sparkles,
        doctors: "28 Doctors",
    },
    {
        title: "Dermatology",
        description: "Professional treatment for skin, hair and nail concerns.",
        icon: ShieldCheck,
        doctors: "34 Doctors",
    },
    {
        title: "Pediatrics",
        description: "Specialized healthcare for infants, children and teenagers.",
        icon: UsersRound,
        doctors: "51 Doctors",
    },
    {
        title: "Orthopedics",
        description: "Bone, joint, muscle and movement related treatment.",
        icon: UserRound,
        doctors: "31 Doctors",
    },
    {
        title: "Gynecology",
        description: "Trusted women's health and reproductive care services.",
        icon: HeartPulse,
        doctors: "25 Doctors",
    },
    {
        title: "Dentistry",
        description: "Complete oral, dental and preventive healthcare solutions.",
        icon: Sparkles,
        doctors: "38 Doctors",
    },
    {
        title: "General Medicine",
        description: "Primary medical care for common illnesses and conditions.",
        icon: Stethoscope,
        doctors: "64 Doctors",
    },
];

const appointmentSteps = [
    {
        number: "01",
        title: "Find a Doctor",
        description:
            "Search and select a trusted doctor based on specialty and experience.",
        icon: Search,
    },
    {
        number: "02",
        title: "Choose a Time",
        description:
            "Pick an available date and consultation time that works for you.",
        icon: CalendarDays,
    },
    {
        number: "03",
        title: "Book Your Appointment",
        description:
            "Confirm your appointment and connect with your doctor online.",
        icon: BadgeCheck,
    },
];

const features = [
    {
        title: "Easy Doctor Search",
        description:
            "Find experienced doctors quickly by specialty, experience and availability.",
        icon: Search,
    },
    {
        title: "Verified Doctor Profiles",
        description:
            "View doctor qualifications, expertise and professional information.",
        icon: BadgeCheck,
    },
    {
        title: "Real-Time Availability",
        description:
            "Choose from available appointment slots without unnecessary waiting.",
        icon: Clock3,
    },
    {
        title: "Easy Appointment Booking",
        description:
            "Book your consultation using a simple and straightforward process.",
        icon: CalendarDays,
    },
    {
        title: "Appointment Management",
        description:
            "View, reschedule and manage your upcoming consultations in one place.",
        icon: Laptop,
    },
    {
        title: "Secure Online Payment",
        description:
            "Complete your appointment payment through a safe checkout experience.",
        icon: LockKeyhole,
    },
];

const doctorBenefits = [
    "Create and manage your professional doctor profile",
    "Set your own consultation schedules and availability",
    "Receive and manage patient appointments",
    "Consult patients through secure online sessions",
    "Maintain appointment and consultation history",
];

const consultationFeatures = [
    {
        title: "HD Video Consultation",
        description: "Connect with your doctor through a smooth online experience.",
        icon: Video,
    },
    {
        title: "Virtual Waiting Room",
        description: "Join your scheduled consultation from anywhere.",
        icon: MonitorSmartphone,
    },
    {
        title: "Secure Digital Prescription",
        description: "Access prescription information after your consultation.",
        icon: ShieldCheck,
    },
    {
        title: "Easy Payment",
        description: "Pay consultation fees securely before your appointment.",
        icon: WalletCards,
    },
];

const testimonials = [
    {
        name: "Farhan Ahmed",
        role: "Verified Patient",
        quote:
            "Booking a specialist was simple and fast. I found the right doctor and completed my consultation without leaving home.",
    },
    {
        name: "Nusrat Jahan",
        role: "Verified Patient",
        quote:
            "The appointment process was clear and convenient. Everything from selecting a doctor to consultation was easy.",
    },
    {
        name: "Shafiq Hasan",
        role: "Verified Patient",
        quote:
            "A very smooth platform for online doctor appointments. The dashboard and consultation process were straightforward.",
    },
];

const faqs = [
    {
        question: "How do I book an appointment?",
        answer:
            "Search for a doctor, open the doctor's profile, choose an available appointment slot and complete the booking process.",
    },
    {
        question: "Can I reschedule my appointment?",
        answer:
            "Yes. Eligible appointments can be rescheduled from your patient dashboard based on the doctor's available schedule.",
    },
    {
        question: "Can I cancel an appointment?",
        answer:
            "Yes. You can cancel an eligible upcoming appointment from your dashboard.",
    },
    {
        question: "How do online consultations work?",
        answer:
            "After booking your appointment, you can access the consultation information from your dashboard and join at the scheduled time.",
    },
    {
        question: "How can I find doctors by specialization?",
        answer:
            "Use the specialty section or doctor search filters to browse doctors according to their medical specialization.",
    },
    {
        question: "Can I see my appointment history?",
        answer:
            "Yes. Your patient dashboard keeps your upcoming, completed and previous appointment information organized.",
    },
];


/*                            REUSABLE COMPONENTS                              */


function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <Sparkles className="size-3.5 text-blue-500" />
                {eyebrow}
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
                {title}
            </h2>

            <span
                aria-hidden
                className="mx-auto mt-5 block h-1 w-14 rounded-full bg-linear-to-r from-blue-600 to-blue-400"
            />

            {description && (
                <p className="mt-5 text-base leading-7 text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
}

function PrimaryButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 sm:w-auto"
        >
            {children}
        </Link>
    );
}

function SecondaryButton({
    href,
    children,
    onDark = false,
}: {
    href: string;
    children: React.ReactNode;
    onDark?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition duration-200 active:translate-y-0 sm:w-auto ${onDark
                ? "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
        >
            {children}
        </Link>
    );
}

/** Entrance animation (tw-animate-css, same recipe PageHero already uses). */
const enter =
    "animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out [animation-fill-mode:both] motion-reduce:animate-none";


/*                                HOME PAGE                                   */


export default function HomePage() {
    return (
        <main className="overflow-hidden bg-white text-slate-950">
            {/* HERO SECTION */}
            <section className="relative isolate overflow-hidden bg-slate-50 text-slate-950">
                {/* Full-width healthcare photo background */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
                    <Image
                        src={doctorPatientHome}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>
                {/* Keep the healthcare photo visible, with a soft contrast layer for readability. */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-white/55" />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/35 via-white/55 to-slate-50/90" />
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.52)_76%)]" />
                <div aria-hidden className="pointer-events-none absolute -right-32 top-24 -z-10 size-[28rem] rounded-full bg-blue-200/35 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -left-32 bottom-10 -z-10 size-[24rem] rounded-full bg-sky-200/35 blur-3xl" />

                <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
                    {/* Centered hero introduction */}
                    <div className="mx-auto w-full max-w-6xl text-center">
                        <div className={`mx-auto mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200/90 bg-white/85 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md sm:text-sm ${enter}`}>
                            <ShieldCheck className="size-4 shrink-0 text-blue-600" />
                            <span>Safe and convenient online healthcare</span>
                        </div>

                        <h1
                            style={{ animationDelay: "100ms" }}
                            className={`mx-auto w-full max-w-none text-balance font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-6xl xl:text-[4.25rem] ${enter}`}
                        >
                            <span className="block">Healthcare that fits your life.</span>
                            <span className="mt-2 block text-blue-600">
                                Expert care, just a few clicks away.
                            </span>
                        </h1>

                        <p
                            style={{ animationDelay: "200ms" }}
                            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-700 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg ${enter}`}
                        >
                            Find trusted doctors, choose a convenient consultation time and
                            manage your appointments through one simple online platform.
                        </p>

                        <div
                            style={{ animationDelay: "300ms" }}
                            className={`mt-7 flex w-full flex-col justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row ${enter}`}
                        >
                            <PrimaryButton href="/doctors">
                                <Search className="size-4" />
                                Find a Doctor
                            </PrimaryButton>
                            <SecondaryButton href="/how-it-works">
                                <Video className="size-4" />
                                How It Works
                            </SecondaryButton>
                        </div>
                    </div>

                    {/* Trust points */}
                    <div
                        style={{ animationDelay: "450ms" }}
                        className={`mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-slate-200/80 pt-6 ${enter}`}
                    >
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <span className="flex size-8 items-center justify-center rounded-full bg-blue-100/90 text-blue-700"><BadgeCheck className="size-4" /></span>
                            Verified doctors
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <span className="flex size-8 items-center justify-center rounded-full bg-blue-100/90 text-blue-700"><CalendarDays className="size-4" /></span>
                            Easy booking
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <span className="flex size-8 items-center justify-center rounded-full bg-blue-100/90 text-blue-700"><LockKeyhole className="size-4" /></span>
                            Secure care
                        </div>
                    </div>
                </div>
            </section>

            {/* SPECIALTIES SECTION */}

            <section className="bg-white py-14 sm:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Medical Specialties"
                        title="Browse by Specialty"
                        description="Find the right doctor based on the care and expertise you need."
                    />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {specialties.map((specialty, index) => {
                            const Icon = specialty.icon;

                            return (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-2xl border bg-linear-to-b from-white to-slate-50 p-5 sm:p-6 transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 ${index === 0
                                        ? "border-blue-400 shadow-md shadow-blue-500/10"
                                        : "border-slate-200"
                                        }`}
                                >
                                    <span
                                        aria-hidden
                                        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-blue-600 to-blue-400 transition-transform duration-500 group-hover:scale-x-100"
                                    />

                                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 group-hover:-rotate-6 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                        <Icon className="size-5" />
                                    </div>

                                    <h3 className="font-heading text-base font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                                        {specialty.title}
                                    </h3>

                                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                                        {specialty.description}
                                    </p>

                                    {/* <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-xs font-medium text-slate-500">
                                            {specialty.doctors}
                                        </span>

                                        <ArrowRight className="size-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                                    </div> */}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-10 text-center">
                        <SecondaryButton href="/doctors">
                            View All Specialties
                            <ArrowRight className="size-4" />
                        </SecondaryButton>
                    </div>
                </div>
            </section>

            {/* APPOINTMENT STEPS SECTION */}

            <section className="relative isolate overflow-hidden border-y border-slate-100 bg-slate-50 py-14 sm:py-16 lg:py-24">
                <div aria-hidden className="pointer-events-none absolute -right-40 top-20 -z-10 size-[30rem] rounded-full bg-blue-100/70 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[24rem] rounded-full bg-sky-100/70 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Simple Process"
                        title="Book an Appointment in 3 Simple Steps"
                        description="Getting medical advice online should be simple, clear and convenient."
                    />

                    {/* The three steps sit beside the animated booking walkthrough on wide screens. */}
                    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-14">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {appointmentSteps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className={`group relative flex min-h-[148px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 sm:p-6 ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                                    >
                                        <span className="absolute right-4 top-2 font-heading text-5xl font-extrabold leading-none text-slate-100 transition-colors duration-300 group-hover:text-blue-100">
                                            {step.number}
                                        </span>
                                        <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:scale-105 sm:size-14 sm:rounded-2xl">
                                            <Icon className="size-5 sm:size-6" />
                                        </div>
                                        <div className="relative min-w-0">
                                            <h3 className="font-heading text-base font-bold text-slate-900 sm:text-lg">
                                                {step.title}
                                            </h3>
                                            <p className="mt-1.5 text-sm leading-6 text-slate-500">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative min-w-0">
                            <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200/70 via-white/30 to-sky-200/70 blur-2xl sm:-inset-6" />
                            <div aria-hidden className="pointer-events-none absolute -right-4 -top-5 size-24 rounded-full border border-blue-200/70 bg-blue-100/20 motion-safe:animate-[pulse_5s_ease-in-out_infinite] sm:-right-6 sm:size-32" />
                            <div aria-hidden className="pointer-events-none absolute -bottom-4 -left-4 size-20 rounded-full border border-sky-200/70 bg-sky-100/20 motion-safe:animate-[pulse_6s_ease-in-out_infinite] sm:-bottom-6 sm:-left-6 sm:size-28" />
                            <div className={`relative min-w-0 rounded-[1.5rem] border border-white/90 bg-white/85 p-2 shadow-[0_28px_80px_-32px_rgba(37,99,235,0.35)] backdrop-blur-md sm:rounded-[2rem] sm:p-3 lg:p-4 ${enter}`} style={{ animationDelay: "250ms" }}>
                                <HeroAppointmentPreview className="w-full min-w-0 [&>div]:mx-auto [&>div]:w-full [&>div]:max-w-full [&>div]:border-slate-200 [&>div]:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.22)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HEALTHCARE FEATURES SECTION */}

            <section className="bg-white py-14 sm:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Built for Everyone"
                        title="Healthcare Made Simple"
                        description="Everything you need to find doctors, book consultations and manage your healthcare online."
                    />

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50/70 hover:to-white hover:shadow-lg hover:shadow-blue-500/10"
                                >
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                        <Icon className="size-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-heading font-bold text-slate-900">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* DOCTOR REGISTRATION SECTION */}

            <section className="relative isolate overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-blue-900 py-20 text-white lg:py-28">
                <div
                    aria-hidden
                    className="absolute -left-24 -top-24 -z-10 size-100 rounded-full bg-blue-500/25 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -bottom-32 -right-20 -z-10 size-100 rounded-full bg-blue-400/15 blur-3xl"
                />

                <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur">
                            <Stethoscope className="size-3.5" />
                            For Healthcare Professionals
                        </div>

                        <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                            Are You a Doctor?
                        </h2>

                        <p className="mt-4 max-w-xl leading-7 text-blue-100/75">
                            Join our healthcare platform and make your medical services more
                            accessible to patients while managing appointments online.
                        </p>

                        <div className="mt-8 space-y-3.5">
                            {doctorBenefits.map((benefit) => (
                                <div key={benefit} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-400/15 text-blue-300 ring-1 ring-blue-300/30">
                                        <Check className="size-3.5" />
                                    </div>

                                    <p className="text-sm leading-6 text-blue-50/90">{benefit}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href="/register/doctor"
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-blue-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 active:translate-y-0"
                            >
                                Register as a Doctor
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>

                            <Link
                                href="/doctor-info"
                                className="inline-flex h-12 items-center justify-center px-4 text-sm font-medium text-blue-100/80 underline-offset-4 transition hover:text-white hover:underline"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30 backdrop-blur">
                        <Image
                            src={doctorsImage}
                            alt="Doctor consulting with patient online"
                            width={900}
                            height={700}
                            className="aspect-video w-full rounded-2xl object-cover"
                        />

                        <div className="p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Manage your consultations
                                    </p>

                                    <p className="mt-1 text-xs text-blue-100/70">
                                        Appointments, patients and schedules in one place.
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-blue-300">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-70 motion-reduce:animate-none" />
                                        <span className="relative inline-flex size-2 rounded-full bg-blue-400" />
                                    </span>
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL SECTION */}

            <section className="border-y border-slate-100 bg-slate-50 py-14 sm:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Patient Reviews"
                        title="Trusted by Thousands of Patients"
                        description="See what patients say about their healthcare experience."
                    />

                    <div className="grid gap-5 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => {
                            const featured = index === 0;

                            return (
                                <div
                                    key={testimonial.name}
                                    className={`relative overflow-hidden rounded-2xl border p-5 transition sm:rounded-3xl sm:p-7 duration-300 hover:-translate-y-1.5 ${featured
                                        ? "border-blue-900 bg-linear-to-br from-blue-950 to-blue-800 text-white shadow-xl shadow-blue-900/20"
                                        : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
                                        }`}
                                >
                                    <Quote
                                        aria-hidden
                                        className={`absolute -right-3 -top-3 size-24 ${featured ? "text-white/5" : "text-slate-100"
                                            }`}
                                    />

                                    <div className="relative flex items-center gap-1 text-amber-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="size-4 fill-current" />
                                        ))}
                                    </div>

                                    <p
                                        className={`relative mt-5 text-sm leading-7 ${featured ? "text-blue-50/90" : "text-slate-600"
                                            }`}
                                    >
                                        “{testimonial.quote}”
                                    </p>

                                    <div
                                        className={`relative mt-6 flex items-center gap-3 border-t pt-5 ${featured ? "border-white/10" : "border-slate-100"
                                            }`}
                                    >
                                        <div
                                            className={`flex size-10 items-center justify-center rounded-full font-heading text-sm font-bold ${featured
                                                ? "bg-white/10 text-blue-300 ring-1 ring-white/20"
                                                : "bg-blue-50 text-blue-600"
                                                }`}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </div>

                                        <div>
                                            <p
                                                className={`text-sm font-semibold ${featured ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {testimonial.name}
                                            </p>

                                            <p
                                                className={`text-xs ${featured ? "text-blue-100/70" : "text-slate-500"
                                                    }`}
                                            >
                                                {testimonial.role}
                                            </p>
                                        </div>

                                        <span
                                            className={`ml-auto rounded-full px-2.5 py-1 text-xs font-medium ${featured
                                                ? "bg-blue-400/15 text-blue-300 ring-1 ring-blue-300/30"
                                                : "bg-blue-50 text-blue-700"
                                                }`}
                                        >
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}

            <section className="bg-white py-14 sm:py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Got Questions?"
                        title="Frequently Asked Questions"
                        description="Find answers to common questions about appointments and online consultations."
                    />

                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-blue-200 open:border-blue-300 open:bg-linear-to-b open:from-blue-50/60 open:to-white open:shadow-lg open:shadow-blue-500/10"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 [&::-webkit-details-marker]:hidden">
                                    <span className="font-heading text-sm font-bold text-slate-900 transition-colors group-open:text-blue-700 sm:text-base">
                                        {faq.question}
                                    </span>

                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-600">
                                        <ChevronDown className="size-4" />
                                    </div>
                                </summary>

                                <div className="animate-in fade-in slide-in-from-top-1 px-5 pb-5 duration-300 motion-reduce:animate-none">
                                    <p className="border-t border-slate-100 pt-4 text-sm leading-7 text-slate-500">
                                        {faq.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}

            <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-linear-to-br from-slate-950 via-blue-950 to-blue-900 px-4 py-10 text-center text-white shadow-2xl shadow-blue-900/30 sm:px-8 sm:py-14">
                    <div
                        aria-hidden
                        className="absolute -top-24 left-1/2 -z-10 size-100 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="absolute -bottom-32 -right-24 -z-10 size-87.5 rounded-full bg-blue-400/15 blur-3xl"
                    />

                    <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300 ring-1 ring-white/20 backdrop-blur">
                        <HeartPulse className="size-7" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        Start Your Healthcare Journey
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                        Your Healthcare Journey Starts Here
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/75 sm:text-base">
                        Find the right doctor, choose a convenient appointment and manage
                        your healthcare online with confidence.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/doctors"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0"
                        >
                            <Search className="size-4" />
                            Find a Doctor
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-blue-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 active:translate-y-0"
                        >
                            <UserRound className="size-4" />
                            Create Account
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-7 text-xs text-blue-100/70">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5 text-blue-300" />
                            Secure Platform
                        </span>

                        <span className="flex items-center gap-1.5">
                            <BadgeCheck className="size-3.5 text-blue-300" />
                            Verified Doctors
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Video className="size-3.5 text-blue-300" />
                            Online Consultation
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}