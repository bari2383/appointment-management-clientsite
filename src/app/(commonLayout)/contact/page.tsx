import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactInfoCards from "@/components/moduels/Contact/ContactInfoCards";
import ContactForm from "@/components/moduels/Contact/ContactForm";
import ContactSidebar from "@/components/moduels/Contact/ContactSidebar";
import ContactFaq from "@/components/moduels/Contact/ContactFaq";
import Reveal from "@/components/shared/Reveal";
import contactHeroImage from "../../../assets/Images/Contact us.png";

export const metadata: Metadata = {
    title: "Contact Us | Tarevia Health Care",
    description:
        "Get in touch with the Tarevia team for help with appointments, payments, doctor registration or any other question.",
};

const ContactPage = () => {
    return (
        <main className="overflow-x-clip bg-white text-slate-950">
            <PageHero
                eyebrow="Contact Tarevia"
                title="We're Here to"
                highlight="Help You"
                description="Have a question about an appointment, a payment or joining as a doctor? Send us a message and our team will get back to you."
                currentPage="Contact"
                image={contactHeroImage}
                imageAlt="Illustration of a phone, envelope and chat bubble"
                imageClassName="lg:max-w-xl"
            />

            <ContactInfoCards />

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
                    <Reveal className="lg:col-span-7">
                        <ContactForm />
                    </Reveal>
                    <div className="lg:sticky lg:top-28 lg:col-span-5">
                        <ContactSidebar />
                    </div>
                </div>
            </section>

            <ContactFaq />
        </main>
    );
};

export default ContactPage;