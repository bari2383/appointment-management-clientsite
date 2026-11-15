/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";


// API: GET /schedule/:id
export async function getScheduleById(id: string) {
    try {
        const response = await serverFetch.get(`/doctor-schedule/${id}`, {
            next: {
                tags: [`schedule-${id}`, "schedules-list"],
                revalidate: 180,
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
