import { contactInfo } from "./contact.data";
import Reveal from "@/components/shared/Reveal";

const ContactInfoCards = () => {
    return (
        <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {contactInfo.map((item, index) => {
                    const Icon = item.icon;

                    const content = (
                        <>
                            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                <Icon className="size-5" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">{item.title}</p>
                            <p className="mt-1.5 break-words text-base font-semibold tracking-tight text-slate-950">
                                {item.value}
                            </p>
                            <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.note}</p>
                        </>
                    );

                    const className =
                        "group block h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.03] transition duration-300 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

                    return (
                        <Reveal key={item.title} delay={index * 80} className="h-full">
                            {item.href ? (
                                <a href={item.href} className={className}>
                                    {content}
                                </a>
                            ) : (
                                <div className={className}>{content}</div>
                            )}
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
};

export default ContactInfoCards;