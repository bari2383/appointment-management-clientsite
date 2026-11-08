import MySchedulesFilters from "@/components/moduels/Doctor/MySchedules/MyScheduleFilters";
import MySchedulesHeader from "@/components/moduels/Doctor/MySchedules/MyScheduleHeader";
import MySchedulesTable from "@/components/moduels/Doctor/MySchedules/MyScheduleTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctorOwnSchedules } from "@/services/doctor/scheduleManagement";
import { Suspense } from "react";

interface DoctorMySchedulesPageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        isBooked?: string;
    }>;
}

const DoctorMySchedulesPage = async ({
    searchParams,
}: DoctorMySchedulesPageProps) => {
    const params = await searchParams;

    const queryString = queryStringFormatter(params);
    const doctorScheduleResult = await getDoctorOwnSchedules(queryString);


    const schedules = doctorScheduleResult?.data?.data || [];
    const meta = doctorScheduleResult?.data?.meta;
    const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

    return (
        <div className="space-y-6">
            <MySchedulesHeader />

            <MySchedulesFilters />

            <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
                <MySchedulesTable schedules={schedules} />
                <TablePagination
                    currentPage={meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default DoctorMySchedulesPage;