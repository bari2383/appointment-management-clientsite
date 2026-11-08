import { getDoctorById } from "@/services/admin/doctorManagement";

const DoctorDetailPage = async ({
    params
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const result = await getDoctorById(id);

    console.log(result)

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">

        </div>
    );
};

export default DoctorDetailPage;