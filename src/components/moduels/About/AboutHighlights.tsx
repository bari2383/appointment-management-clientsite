import { BadgeCheck, CalendarDays, FileText, Video } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const highlights = [
    {
        title: "Verified Doctors",
        description:
            "Doctor profiles carry professional credentials so you can book with confidence.",
        icon: BadgeCheck,
    },
    {
        title: "Online Consultation",
        description:
            "Meet your doctor through a simple and secure online session.",
        icon: Video,
    },
    {
        title: "Real-Time Schedules",
        description:
            "See genuine availability and pick a slot that suits your day.",
        icon: CalendarDays,
    },
    {
        title: "Digital Prescriptions",
        description:
            "Access your prescription from your dashboard after the consultation.",
        icon: FileText,
    },
];

const AboutHighlights = () => {
    return (
        <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {highlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <Reveal key={item.title} delay={index * 80} className="h-full">
                            <div className="group h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03] transition duration-300 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0 p-6">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="text-base font-semibold tracking-tight text-slate-950">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
};

export default AboutHighlights;