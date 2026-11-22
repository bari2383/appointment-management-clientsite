import { Eye, Target } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const items = [
    {
        title: "Our Mission",
        description:
            "To make quality healthcare easier to reach by connecting patients with qualified doctors through a transparent, convenient and secure online experience.",
        icon: Target,
    },
    {
        title: "Our Vision",
        description:
            "A healthcare experience where booking a trusted doctor is as simple as a few taps, available to every patient across Bangladesh and beyond.",
        icon: Eye,
    },
];

const MissionVision = () => {
    return (
        <section className="border-y border-slate-100 bg-slate-50/80">
            <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-6 lg:px-8 lg:py-24">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <Reveal key={item.title} delay={index * 120} className="h-full">
                            <div className="group h-full rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[0.03] transition duration-300 ease-out hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06] motion-reduce:transition-none sm:p-9">
                                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                                    <Icon className="size-6" />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                                    {item.title}
                                </h2>
                                <p className="mt-4 text-base leading-8 text-slate-600">
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

export default MissionVision;