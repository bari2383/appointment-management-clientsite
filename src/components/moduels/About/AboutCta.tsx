import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const AboutCta = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-700 px-6 py-14 text-center shadow-xl shadow-blue-600/20 sm:px-12 lg:py-20">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-sky-300/20 blur-2xl"
                    />

                    <div className="relative mx-auto max-w-2xl">
                        <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Ready to find the right doctor?
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                            Browse verified doctors, pick a time that suits you and start your
                            consultation today.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                            <Link
                                href="/consultation"
                                className="group/btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-blue-700 shadow-sm transition duration-300 hover:bg-blue-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto"
                            >
                                Find a Doctor
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 motion-reduce:transition-none" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/40 px-6 text-sm font-semibold text-white transition duration-300 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default AboutCta;