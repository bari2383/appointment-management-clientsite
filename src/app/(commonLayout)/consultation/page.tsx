import DoctorGrid from "@/components/moduels/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/moduels/Consultation/DoctorSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpeacialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

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
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-3xl rounded-bl-3xl bg-gradient-to-br from-[#0b2150] via-[#1450b8] to-[#2f8de8] px-6 py-10 shadow-[0_30px_80px_-20px_rgba(18,50,107,0.45)] ring-1 ring-blue-900/10 before:pointer-events-none before:absolute before:right-16 before:top-1/2 before:h-10 before:w-36 before:-translate-y-1/2 before:rounded-full before:bg-white/10 before:content-[''] after:pointer-events-none after:absolute after:right-[7.25rem] after:top-1/2 after:h-36 after:w-10 after:-translate-y-1/2 after:rounded-full after:bg-white/10 after:content-[''] sm:px-12 sm:py-14">
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Find a Doctor</h1>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-sky-100/90 sm:text-lg">
                        Search and book appointments with our qualified healthcare
                        professionals
                    </p>
                </div>


                {/* Filters */}
                <DoctorSearchFilters specialties={specialties} />

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
    );
};

export default ConsultationPage;