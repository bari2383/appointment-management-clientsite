"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ScheduleFormDialog from "./ScheduleFormDialog";

const MySchedulesHeader = () => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefreshing, startTransition] = useTransition();

  const handleSuccess = () => {
    setIsDialogOpen(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <ManagementPageHeader
        title="My Schedules"
        description="Manage your availability and consultation time slots"
        action={{
          label: isRefreshing ? "Refreshing..." : "Create Schedule",
          icon: Plus,
          onClick: () => setIsDialogOpen(true)
        }}
      />

      {isDialogOpen && (
        <ScheduleFormDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default MySchedulesHeader;