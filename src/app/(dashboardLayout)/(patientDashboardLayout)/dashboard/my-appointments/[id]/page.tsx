
import { getAppointmentById } from "@/services/Appointment/appointmentManagement";
import { notFound } from "next/navigation";
import { IAppointment } from "../../../../../../../types/appintment.interface";
import AppointmentDetails from "@/components/moduels/patient/patientAppointment/AppointmentDetails";

interface AppointmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AppointmentDetailPage({
  params,
}: AppointmentDetailPageProps) {
  const { id } = await params;

  const response = await getAppointmentById(id);
  console.log({ response });

  if (!response?.success || !response?.data) {
    notFound();
  }

  const appointment: IAppointment = response.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentDetails appointment={appointment} />
    </div>
  );
}