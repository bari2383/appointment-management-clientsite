import DoctorGrid from "@/components/moduels/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/moduels/Consultation/DoctorSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpeacialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";
import Image from "next/image";
import { HeartPulse, Plus } from "lucide-react";
import consultationImage from "../../../assets/Images/consultaion.png";

// ISR: Revalidate every 10 minutes for doctor listings
export const revalidate = 600;

const ConsultationPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    // Fetch doctors and specialties in parallel
    const [doctorsResponse,
        specialtiesResponse
    ] = await Promise.all([
        getDoctors(queryString),
        getSpeacialities(),
    ]);

    const doctors = doctorsResponse?.data || [];
    const specialties = specialtiesResponse?.data || [];
    console.log(doctors)
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="space-y-8">
                {/* Header */}
                <section className="relative overflow-hidden rounded-[2rem] border border-blue-100/70 bg-linear-to-br from-blue-50 via-white to-sky-50 shadow-[0_24px_60px_-30px_rgba(30,64,175,0.3)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-blue-100/70 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-sky-100/70 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(37_99_235/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(37_99_235/0.05)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
                    />

                    <div className="relative grid items-center gap-6 px-6 py-8 sm:px-12 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-10">
                        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out [animation-fill-mode:both] motion-reduce:animate-none lg:col-span-7">
                            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Find a <span className="text-blue-600">Doctor</span>
                            </h1>
                            <span
                                aria-hidden
                                className="mt-5 block h-1.5 w-16 rounded-full bg-blue-600/80"
                            />
                            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 lg:text-lg">
                                Search and book appointments with our qualified healthcare
                                professionals
                            </p>
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-3 delay-150 duration-700 ease-out [animation-fill-mode:both] motion-reduce:animate-none lg:col-span-5">
                            <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-xs lg:ml-auto lg:mr-0 lg:max-w-sm">
                                <div
                                    aria-hidden
                                    className="absolute inset-x-6 bottom-0 top-8 rounded-full bg-blue-100/70"
                                />
                                <Image
                                    src={consultationImage}
                                    alt="Doctor reviewing a doctor profile on a tablet"
                                    priority
                                    sizes="(min-width: 1024px) 30vw, 70vw"
                                    className="relative h-auto w-full select-none object-contain drop-shadow-[0_18px_32px_rgba(37,99,235,0.2)]"
                                />
                                <div
                                    aria-hidden
                                    className="absolute left-0 top-10 flex size-11 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-blue-100 sm:size-12"
                                >
                                    <HeartPulse className="size-5 text-blue-600 sm:size-6" />
                                </div>
                                <div
                                    aria-hidden
                                    className="absolute right-2 top-3 flex size-8 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-blue-100"
                                >
                                    <Plus className="size-4 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sidebar filters + doctor list */}
                <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
                    <aside className="lg:sticky lg:top-28 lg:col-span-3">
                        <DoctorSearchFilters specialties={specialties} />
                    </aside>

                    <div className="space-y-8 lg:col-span-9">
                        {/* Doctor Grid */}
                        <Suspense fallback={<TableSkeleton columns={3} />}>
                            <DoctorGrid doctors={doctors} />
                        </Suspense>

                        {/* Pagination */}
                        <TablePagination
                            currentPage={doctorsResponse?.meta?.page || 1}
                            totalPages={doctorsResponse?.meta?.totalPage || 1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;