/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";
import { revalidateTag } from "next/cache";


// Get Doctor Schedules
export async function getDoctorOwnSchedules(queryString?: string) {
    try {
        const response = await serverFetch.get(`/doctor-schedule/my-schedule${queryString ? `?${queryString}` : ''}`, {
            next: {
                tags: ["my-schedules", "doctor-schedules-list"],
                revalidate: 180, // 3 minutes
            }
        });
        const result = await response.json();
        return {
            success: result.success,
            data: result.data,
            meta: result.meta,
        };

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// Get Available Schedules
// export async function getAvailableSchedules() {
//     try {
//         const response = await serverFetch.get(`/schedule`);
//         const result = await response.json();
//         if (result.success) {
//             revalidateTag('my-schedules', { expire: 0 });
//             revalidateTag('doctor-schedules-list', { expire: 0 });
//             revalidateTag('schedules-list', { expire: 0 });
//         }
//         return result;

//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// Create Doctor Own Schedules
export async function createDoctorSchedules(_prevState: any, formData: FormData) {
    const validationPayload = {
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
    };

    const validation = zodValidator(validationPayload, createScheduleZodSchema);

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.post("/doctor-schedule", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("my-schedules", { expire: 0 });
            revalidateTag("doctor-schedules-list", { expire: 0 });
            revalidateTag("schedules-list", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error("Create doctor schedule error:", error);

        return {
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to create doctor schedule",
            formData: validationPayload,
        };
    }
}

// Delete Doctor Own Schedule
export async function deleteDoctorOwnSchedules(scheduleId: string) {
    try {
        const response = await serverFetch.post(`/doctor-schedule/${scheduleId}`);
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-schedules', { expire: 0 });
            revalidateTag('doctor-schedules-list', { expire: 0 });
            revalidateTag('schedules-list', { expire: 0 });
        }
        return {
            success: result.success,
            message: result.message || 'Schedule removed successfully'
        };

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}