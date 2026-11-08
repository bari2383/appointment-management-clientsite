export interface ISchedule {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
}

export interface IScheduleFormData {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

export interface IDoctorSchedule {
    id: string;
    startDateTime: string;
    endDateTime: string;
    isBooked: boolean;
    createdAt: string;
    updatedAt: string;
    doctorScheduleId: string;
}

