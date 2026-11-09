import { getMyAppointments } from "@/services/Appointment/appointmentManagement";
import { Suspense } from "react";
import { IAppointment } from "../../../../../../types/appintment.interface";
import DoctorAppointmentsTable from "@/components/moduels/Doctor/DoctorAppointments/DoctorAppointmentTable";

async function AppointmentsContent() {
    const response = await getMyAppointments();
    const appointments: IAppointment[] = response?.data || [];
    console.log(response)
    return <DoctorAppointmentsTable appointments={appointments} />;
}

export default async function DoctorAppointmentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your patient appointments and prescriptions
                </p>
            </div>

            <Suspense fallback={<div>Loading appointments...</div>}>
                <AppointmentsContent />
            </Suspense>
        </div>
    );
}