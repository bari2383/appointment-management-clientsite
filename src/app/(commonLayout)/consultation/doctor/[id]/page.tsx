import DoctorProfileContent from "@/components/moduels/DoctorDetails/portfolioContent";
import { getDoctorById } from "@/services/admin/doctorManagement";

const DoctorDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const result = await getDoctorById(id);
    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <DoctorProfileContent doctor={result.data} />
        </div>
    );
};

export default DoctorDetailPage;