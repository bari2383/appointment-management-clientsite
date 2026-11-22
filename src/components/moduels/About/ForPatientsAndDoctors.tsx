import Link from "next/link";
import { ArrowRight, Check, Stethoscope, UserRound } from "lucide-react";
import SectionIntro from "@/components/shared/SectionIntro";
import Reveal from "@/components/shared/Reveal";

const audiences = [
    {
        title: "For Patients",
        icon: UserRound,
        points: [
            "Search doctors by specialty and availability",
            "Book an appointment slot in a few steps",
            "Pay securely before your consultation",
            "Access prescriptions and appointment history",
        ],
        href: "/register/patient",
        cta: "Create Patient Account",
    },
    {
        title: "For Doctors",
        icon: Stethoscope,
        points: [
            "Build a professional doctor profile",
            "Set your own consultation schedules",
            "Receive and manage patient appointments",
            "Write prescriptions after each consultation",
        ],
        href: "/register/doctor",
        cta: "Join as Doctor",
    },
];

const ForPatientsAndDoctors = () => {
    return (
        <section className="border-t border-slate-100 bg-slate-50/80">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <SectionIntro
                    eyebrow="Who We Serve"
                    title="One platform, two sides of care"
                    description="Tarevia is built to work well for the people seeking care and the professionals providing it."
                />

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    {audiences.map((audience, index) => {
                        const Icon = audience.icon;

                        return (
                            <Reveal
                                key={audience.title}
                                delay={index * 120}
                                className="h-full"
                            >
                                <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[0.03] transition duration-300 ease-out hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06] motion-reduce:transition-none sm:p-9">
                                    <div className="mb-6 flex items-center gap-3.5">
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                            <Icon className="size-5" />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight text-slate-950">
                                            {audience.title}
                                        </h3>
                                    </div>

                                    <ul className="flex-1 space-y-4">
                                        {audience.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                                            >
                                                <Check className="mt-1 size-5 shrink-0 rounded-full bg-blue-50 p-1 text-blue-600" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={audience.href}
                                        className="group/btn mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-fit"
                                    >
                                        {audience.cta}
                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 motion-reduce:transition-none" />
                                    </Link>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ForPatientsAndDoctors;