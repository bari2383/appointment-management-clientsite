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

            <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white text-slate-950">
                {/* Background image: kept subtle so the content stays readable. */}
                <div aria-hidden className="absolute inset-0 -z-20">
                    <Image
                        src={doctorPatientHome}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[65%_center]"
                    />
                </div>
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-white/55 sm:bg-white/45 lg:bg-gradient-to-r lg:from-white/90 lg:via-white/55 lg:to-white/15"
                />

                <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:gap-12 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-20">
                    {/* Hero content */}
                    <div className="mx-auto w-full max-w-2xl min-w-0 lg:mx-0">
                        <div className={`mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700 sm:mb-6 sm:px-3.5 sm:text-xs ${enter}`}>
                            <ShieldCheck className="size-4 shrink-0 text-blue-600" />
                            <span>Safe and convenient online healthcare</span>
                        </div>

                        <h1
                            style={{ animationDelay: "100ms" }}
                            className={`max-w-2xl text-balance font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl ${enter}`}
                        >
                            Book a Doctor Online.
                            <span className="mt-2 block text-blue-600">
                                Consult from Anywhere with Confidence.
                            </span>
                        </h1>

                        <p
                            style={{ animationDelay: "200ms" }}
                            className={`mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg ${enter}`}
                        >
                            Connect with qualified medical professionals through a simple
                            online healthcare experience. Find doctors, select an available
                            time and manage your appointments from one place.
                        </p>

                        <div
                            style={{ animationDelay: "300ms" }}
                            className={`mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${enter}`}
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

                        <div
                            style={{ animationDelay: "400ms" }}
                            className={`mt-9 grid max-w-xl grid-cols-3 divide-x divide-slate-200/90 border-t border-slate-200/90 pt-5 sm:mt-12 sm:pt-7 ${enter}`}
                        >
                            <div className="min-w-0 pr-2 sm:pr-4">
                                <p className="font-heading text-xl font-extrabold text-slate-950 sm:text-2xl lg:text-3xl">500+</p>
                                <p className="mt-1 text-[11px] text-slate-500 sm:text-sm">Doctors</p>
                            </div>
                            <div className="min-w-0 px-2 sm:px-4">
                                <p className="font-heading text-xl font-extrabold text-slate-950 sm:text-2xl lg:text-3xl">100%</p>
                                <p className="mt-1 text-[11px] text-slate-500 sm:text-sm">Online</p>
                            </div>
                            <div className="min-w-0 pl-2 sm:pl-4">
                                <p className="font-heading text-xl font-extrabold text-blue-600 sm:text-2xl lg:text-3xl">Secure</p>
                                <p className="mt-1 text-[11px] text-slate-500 sm:text-sm">Healthcare</p>
                            </div>
                        </div>
                    </div>

                    {/* Existing appointment preview component */}
                    <div
                        style={{ animationDelay: "250ms" }}
                        className={`mx-auto w-full min-w-0 max-w-xl lg:max-w-none ${enter}`}
                    >
                        <HeroAppointmentPreview className="w-full [&>div]:mx-auto [&>div]:w-full [&>div]:max-w-full [&>div]:border-slate-200 [&>div]:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)]" />
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

            <section className="border-y border-slate-100 bg-slate-50 py-14 sm:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Simple Process"
                        title="Book an Appointment in 3 Simple Steps"
                        description="Getting medical advice online should be simple, clear and convenient."
                    />

                    <div className="relative grid gap-6 md:grid-cols-3 md:gap-8">
                        {/* dashed connector behind the cards (desktop) */}
                        <div
                            aria-hidden
                            className="absolute left-[16.67%] right-[16.67%] top-14 hidden border-t-2 border-dashed border-blue-200 md:block"
                        />

                        {appointmentSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center sm:rounded-3xl sm:p-8 transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
                                >
                                    <div className="absolute right-5 top-3 font-heading text-6xl font-extrabold leading-none text-slate-100 transition-colors duration-300 group-hover:text-blue-100">
                                        {step.number}
                                    </div>

                                    <div className="relative mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/30 ring-8 ring-white transition duration-300 group-hover:scale-110">
                                        <Icon className="size-6" />
                                    </div>

                                    <h3 className="relative font-heading text-lg font-bold text-slate-900">
                                        {step.title}
                                    </h3>

                                    <p className="relative mt-3 text-sm leading-6 text-slate-500">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
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