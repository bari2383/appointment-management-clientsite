import { IDoctor } from "../../../../types/doctor.interface";
import DoctorCard from "./DoctorCard";

interface DoctorGridProps {
  doctors: IDoctor[];
}

export default function DoctorGrid({ doctors }: DoctorGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center animate-in fade-in zoom-in-95 [animation-duration:500ms] motion-reduce:animate-none dark:border-slate-700 dark:bg-slate-900">
        <p className="text-base font-semibold text-slate-900 dark:text-white">
          No doctors found matching your criteria.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(2)]:[animation-delay:80ms] [&>*:nth-child(3)]:[animation-delay:160ms] [&>*:nth-child(4)]:[animation-delay:240ms] [&>*:nth-child(5)]:[animation-delay:320ms] [&>*:nth-child(6)]:[animation-delay:400ms]">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}