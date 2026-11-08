import DoctorRegistrationForm from "@/components/moduels/auth/DoctorRegistrationForm";
import BrandLogo from "@/components/shared/BrandLogo";
import { getSpeacialities } from "@/services/admin/specialitiesManagement";
import Link from "next/link";



const DoctorPage = async () => {

    const specialties = await getSpeacialities()

    return (
        <>
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-white/30 lg:bg-background backdrop-blur-xs">
                <Link href='/' className="flex justify-center gap-2 md:justify-start">
                    <BrandLogo />
                </Link>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xl lg:max-w-full">
                        <DoctorRegistrationForm specialties={specialties.data} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorPage;