import DoctorsFilters from "@/components/moduels/admin/DoctorManagement/DoctorsFilters";
import DoctorsManagementHeader from "@/components/moduels/admin/DoctorManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/moduels/admin/DoctorManagement/DoctorsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpeacialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";


const DoctorsManagementPage = async ({
    searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj)

    const specialitiesResult = await getSpeacialities()
    const doctorsResult = await getDoctors(queryString)

    const totalPages = Math.ceil((doctorsResult.meta?.total || 1) / (doctorsResult.meta?.limit || 1));



    return (
        <div className="space-y-6">
            <DoctorsManagementHeader />
            <DoctorsFilters specialties={specialitiesResult?.data || []} />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable
                    doctors={doctorsResult.data}
                    specialities={specialitiesResult.data}
                />
                <TablePagination
                    currentPage={doctorsResult.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default DoctorsManagementPage;