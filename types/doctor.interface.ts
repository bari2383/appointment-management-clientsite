export interface DoctorSpecialty {
    id: string;
    doctorId: string;
    specialitiesId: string;
    specialities: {
        id: string;
        title: string;
        description?: string | null;
    };
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface IDoctor {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        status: UserStatus;
    };
    doctorSpecialties?: DoctorSpecialty[];
    schedule?: IDoctorSchedule[];
}

export interface IDoctorSchedule {
    id: string;
    startDateTime: string;
    endDateTime: string;
    isBooked: boolean;
    doctorId: string;
    createdAt: string;
    updatedAt: string;
}