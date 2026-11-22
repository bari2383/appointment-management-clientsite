import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import AboutHighlights from "@/components/moduels/About/AboutHighlights";
import AboutStory from "@/components/moduels/About/AboutStory";
import MissionVision from "@/components/moduels/About/MissionVision";
import CoreValues from "@/components/moduels/About/CoreValues";
import ForPatientsAndDoctors from "@/components/moduels/About/ForPatientsAndDoctors";
import AboutCta from "@/components/moduels/About/AboutCta";
import aboutHeroImage from "../../../assets/Images/about us.png";

export const metadata: Metadata = {
    title: "About Us | Tarevia Health Care",
    description:
        "Learn about Tarevia, an online platform connecting patients with qualified doctors for easy appointment booking and consultation.",
};

const AboutUsPage = () => {
    return (
        <main className="overflow-x-clip bg-white text-slate-950">
            <PageHero
                eyebrow="About Tarevia"
                title="Connecting Patients with"
                highlight="Doctors They Can Trust"
                description="Tarevia is an online healthcare platform that makes it simple to find a qualified doctor, book an appointment and consult from wherever you are."
                currentPage="About Us"
                image={aboutHeroImage}
                imageAlt="Healthcare illustration with a shield, clipboard and stethoscope"
            />
            <AboutHighlights />
            <AboutStory />
            <MissionVision />
            <CoreValues />
            <ForPatientsAndDoctors />
            <AboutCta />
        </main>
    );
};

export default AboutUsPage;