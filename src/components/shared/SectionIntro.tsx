import { Sparkles } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

interface SectionIntroProps {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "center" | "left";
}

const SectionIntro = ({
    eyebrow,
    title,
    description,
    align = "center",
}: SectionIntroProps) => {
    const isCenter = align === "center";

    return (
        <Reveal
            className={
                isCenter ? "mx-auto mb-12 max-w-2xl text-center md:mb-14" : "mb-8 max-w-xl"
            }
        >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <Sparkles className="size-3" />
                {eyebrow}
            </div>

            <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                {title}
            </h2>

            {description && (
                <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base sm:leading-7">
                    {description}
                </p>
            )}
        </Reveal>
    );
};

export default SectionIntro;