import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorCardSkeleton() {
    return (
        <Card className="gap-0 overflow-hidden mx-auto w-full max-w-[22rem] rounded-3xl border border-slate-100 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="p-0">
                <div className="flex flex-col gap-3">
                    {/* Avatar Skeleton */}
                    <Skeleton className="aspect-[16/11] w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />

                    <div className="flex-1 space-y-2 px-3 pt-1">
                        {/* Name Skeleton */}
                        <Skeleton className="h-5 w-3/4 rounded-md bg-slate-100 dark:bg-slate-800" />
                        {/* Designation Skeleton */}
                        <Skeleton className="h-4 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800" />
                        {/* Rating Skeleton */}
                        <Skeleton className="mt-2 h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex min-h-40 flex-col space-y-3 px-3 pb-3 pt-1">
                {/* Experience and Fee */}
                <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-8 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                    <Skeleton className="h-8 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* Specialties */}
                <div className="min-h-14 space-y-2">
                    <Skeleton className="h-3 w-20 bg-slate-100 dark:bg-slate-800" />
                    <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-6 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
                        <Skeleton className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
                        <Skeleton className="h-6 w-28 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                </div>

                {/* Location */}
                <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-800" />

                {/* Qualification */}
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-slate-800" />
                    <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800" />
                </div>
            </CardContent>

            <CardFooter className="flex gap-2 px-3 pb-2 pt-1">
                <Skeleton className="h-9 flex-1 rounded-lg bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-9 flex-1 rounded-lg bg-blue-100 dark:bg-blue-950" />
            </CardFooter>
        </Card>
    );
}