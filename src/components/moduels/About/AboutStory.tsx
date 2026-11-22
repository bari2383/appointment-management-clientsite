import { Check, X } from "lucide-react";
import SectionIntro from "@/components/shared/SectionIntro";
import Reveal from "@/components/shared/Reveal";

const before = [
    "Calling clinics just to ask about availability",
    "Long and unpredictable waiting queues",
    "Paper prescriptions that are easy to lose",
    "No clear record of past visits",
];

const withTarevia = [
    "Live doctor schedules in one place",
    "Book a slot and consult online",
    "Digital prescriptions in your dashboard",
    "Appointment history always available",
];

const AboutStory = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                    <SectionIntro
                        align="left"
                        eyebrow="Our Story"
                        title="Healthcare that respects your time"
                    />

                    <Reveal delay={100} className="space-y-5 text-base leading-8 text-slate-600">
                        <p>
                            Finding the right doctor should not mean long queues, unclear
                            schedules or repeated phone calls. Tarevia brings doctors and
                            patients together on one platform, where discovering a
                            specialist, choosing a time and completing a consultation
                            happen in a few clear steps.
                        </p>
                        <p>
                            For doctors, Tarevia is a practical workspace to publish a
                            professional profile, manage availability and keep appointments
                            organised. For patients, it is a single place to book, pay,
                            attend and look back at every consultation.
                        </p>
                    </Reveal>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <Reveal delay={80} className="h-full">
                        <div className="h-full rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 sm:p-7">
                            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Before
                            </p>
                            <ul className="space-y-4">
                                {before.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                                    >
                                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 ring-1 ring-red-100">
                                            <X className="size-3" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={180} className="h-full">
                        <div className="h-full rounded-2xl border border-blue-200 bg-linear-to-b from-blue-50/80 to-white p-6 shadow-lg shadow-blue-900/[0.06] sm:p-7">
                            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                                With Tarevia
                            </p>
                            <ul className="space-y-4">
                                {withTarevia.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-sm leading-7 text-slate-700"
                                    >
                                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/30">
                                            <Check className="size-3" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;