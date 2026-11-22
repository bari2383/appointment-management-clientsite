import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SectionIntro from "@/components/shared/SectionIntro";
import Reveal from "@/components/shared/Reveal";
import { contactFaqs } from "./contact.data";

const ContactFaq = () => {
    return (
        <section className="border-t border-slate-100 bg-slate-50/80">
            <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <SectionIntro
                    eyebrow="FAQ"
                    title="Before you write to us"
                    description="Quick answers to the questions we hear most often."
                />

                <Reveal delay={100}>
                    <Accordion
                        type="single"
                        collapsible
                        className="rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm shadow-slate-900/[0.03] sm:px-8"
                    >
                        {contactFaqs.map((faq, index) => (
                            <AccordionItem
                                key={faq.question}
                                value={`faq-${index}`}
                                className="border-slate-100"
                            >
                                <AccordionTrigger className="py-5 text-left text-sm font-semibold leading-6 text-slate-900 transition-colors duration-200 hover:text-blue-700 hover:no-underline focus-visible:ring-blue-500/40 motion-reduce:transition-none sm:text-base [&[data-state=open]]:text-blue-700 [&>svg]:text-slate-400 [&[data-state=open]>svg]:text-blue-600">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 pr-6 text-sm leading-7 text-slate-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Reveal>
            </div>
        </section>
    );
};

export default ContactFaq;