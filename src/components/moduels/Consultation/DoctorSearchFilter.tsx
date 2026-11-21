"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface DoctorSearchFiltersProps {
  specialties: Array<{ id: string; title: string }>;
}

export default function DoctorSearchFilters({
  specialties,
}: DoctorSearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state once from URL, but don't re-sync on every searchParams change
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("searchTerm") || ""
      );
    }
    return "";
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // Reset to page 1 when filters change
      params.delete("page");

      router.push(`/consultation/doctors?${params.toString()}`);
    },
    [router]
  );

  // Trigger search when debounced value changes
  useEffect(() => {
    const urlSearchTerm =
      new URLSearchParams(window.location.search).get("searchTerm") || "";
    if (debouncedSearch !== urlSearchTerm) {
      updateFilters("searchTerm", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleClearFilters = () => {
    setSearchTerm("");
    router.push("/consultation/doctors");
  };

  const hasActiveFilters =
    searchParams.get("searchTerm") || searchParams.get("specialties");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 [animation-duration:500ms] motion-reduce:animate-none">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        {/* <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div> */}

        {/* Specialty Filter */}
        <Select
          value={searchParams.get("specialties") || "all"}
          onValueChange={(value) => updateFilters("specialties", value)}
        >
          <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white shadow-none transition-colors duration-200 hover:border-slate-300 focus-visible:border-blue-400 focus-visible:ring-blue-500/20 data-[size=default]:h-10 dark:border-slate-800 dark:bg-slate-900 md:w-62.5">
            <SelectValue placeholder="Select Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty.id} value={specialty.title}>
                {specialty.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Gender Filter */}
        <Select
          value={searchParams.get("gender") || "all"}
          onValueChange={(value) => updateFilters("gender", value)}
        >
          <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white shadow-none transition-colors duration-200 hover:border-slate-300 focus-visible:border-blue-400 focus-visible:ring-blue-500/20 data-[size=default]:h-10 dark:border-slate-800 dark:bg-slate-900 md:w-45">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="h-10 w-full rounded-xl border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-none transition-all duration-200 hover:bg-slate-50 active:scale-[0.97] animate-in fade-in zoom-in-95 [animation-duration:200ms] motion-reduce:animate-none md:w-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}