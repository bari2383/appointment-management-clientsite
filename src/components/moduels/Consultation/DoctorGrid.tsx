import { IDoctor } from "../../../../types/doctor.interface";
import DoctorCard from "./DoctorCard";

interface DoctorGridProps {
  doctors: IDoctor[];
}

export default function DoctorGrid({ doctors }: DoctorGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-emerald-50/50 px-6 py-16 text-center shadow-lg shadow-blue-900/5 dark:border-slate-700 dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-800/40">
        <p className="text-lg font-bold text-[#12326b] dark:text-white">
          No doctors found matching your criteria.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}