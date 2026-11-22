import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeroProps {
    eyebrow: string;
    title: string;
    highlight?: string;
    description: string;
    currentPage: string;
    children?: React.ReactNode;
    image?: StaticImageData;
    imageAlt?: string;
    imageClassName?: string;
}

const enter =
    "animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out [animation-fill-mode:both] motion-reduce:animate-none";

const PageHero = ({
    eyebrow,
    title,
    highlight,
    description,
    currentPage,
    children,
    image,
    imageAlt = "",
    imageClassName = "",
}: PageHeroProps) => {
    return (
        <section className="relative overflow-hidden border-b border-slate-100 bg-linear-to-b from-blue-50/80 via-white to-white">
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blue-100/60 blur-3xl sm:size-96"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-sky-100/60 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(37_99_235/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(37_99_235/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
            />

            <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
                <nav
                    aria-label="Breadcrumb"
                    className={`mb-8 flex items-center gap-1.5 text-sm text-slate-500 ${enter}`}
                >
                    <Link
                        href="/"
                        className="rounded-md px-1 py-1 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                    >
                        Home
                    </Link>
                    <ChevronRight className="size-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{currentPage}</span>
                </nav>

                <div className={image ? "grid items-center gap-10 lg:grid-cols-12 lg:gap-10" : ""}>
                <div className={image ? "max-w-3xl lg:col-span-6" : "max-w-3xl"}>
                    <div
                        style={{ animationDelay: "80ms" }}
                        className={`mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm backdrop-blur ${enter}`}
                    >
                        <Sparkles className="size-4" />
                        {eyebrow}
                    </div>

                    <h1
                        style={{ animationDelay: "160ms" }}
                        className={`text-balance text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl ${enter}`}
                    >
                        {title}
                        {highlight && (
                            <span className="mt-2 block text-blue-600">{highlight}</span>
                        )}
                    </h1>

                    <p
                        style={{ animationDelay: "240ms" }}
                        className={`mt-6 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg lg:leading-8 ${enter}`}
                    >
                        {description}
                    </p>

                    {children && (
                        <div
                            style={{ animationDelay: "320ms" }}
                            className={`mt-8 ${enter}`}
                        >
                            {children}
                        </div>
                    )}
                </div>

                {image && (
                    <div
                        style={{ animationDelay: "280ms" }}
                        className={`relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-6 lg:max-w-none ${enter}`}
                    >
                        <Image
                            src={image}
                            alt={imageAlt}
                            priority
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className={`h-auto w-full lg:ml-auto select-none object-contain drop-shadow-[0_24px_40px_rgba(37,99,235,0.18)] ${imageClassName}`}
                        />
                    </div>
                )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;