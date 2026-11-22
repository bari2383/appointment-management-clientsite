import { HeartPulse, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import SectionIntro from "@/components/shared/SectionIntro";
import Reveal from "@/components/shared/Reveal";

const values = [
    {
        title: "Trust & Verification",
        description:
            "We encourage transparency by showing professional information patients can rely on.",
        icon: ShieldCheck,
    },
    {
        title: "Patient First",
        description:
            "Every feature is designed around saving the patient's time and reducing stress.",
        icon: HeartPulse,
    },
    {
        title: "Simplicity",
        description:
            "Clear steps and clean screens so anyone can book and consult without a learning curve.",
        icon: Sparkles,
    },
    {
        title: "Privacy & Security",
        description:
            "Account access and payments are handled with care, because health information is personal.",
        icon: LockKeyhole,
    },
];

const CoreValues = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionIntro
                eyebrow="Core Values"
                title="What we stand for"
                description="The principles that guide how we build Tarevia and serve our community."
            />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {values.map((value, index) => {
                    const Icon = value.icon;

                    return (
                        <Reveal key={value.title} delay={index * 80} className="h-full">
                            <div className="group h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03] transition duration-300 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0 p-6 sm:p-7">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="text-base font-semibold tracking-tight text-slate-950">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-500">
                                    {value.description}
                                </p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
};

export default CoreValues;