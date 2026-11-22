"use server";

import { zodValidator } from "@/lib/zodValidator";
import { contactSchema, ContactFormState } from "@/zod/contact.validation";

export const sendContactMessage = async (
    _currentState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> => {
    // Honeypot field: real users never see or fill this input.
    if (formData.get("website")) {
        return { success: true, message: "Thank you! Your message has been sent." };
    }

    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: (formData.get("phone") as string) || undefined,
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    const validated = zodValidator(payload, contactSchema);

    if (!validated.success) {
        return {
            success: false,
            message: "Please fix the highlighted fields.",
            errors: validated.errors?.map((error) => ({
                field: String(error.field),
                message: error.message,
            })),
            // Keep what the user typed, because the form resets after submit.
            values: {
                name: String(payload.name ?? ""),
                email: String(payload.email ?? ""),
                phone: String(payload.phone ?? ""),
                subject: String(payload.subject ?? ""),
                message: String(payload.message ?? ""),
            },
        };
    }

    // TODO: the backend has no contact endpoint yet. When it does, send the data here:
    //
    // const res = await serverFetch.post("/contact", {
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(validated.data),
    // });
    // const result = await res.json();
    // if (!res.ok) {
    //     return { success: false, message: result?.message || "Something went wrong." };
    // }

    return {
        success: true,
        message: "Thank you! Your message has been sent. We will get back to you soon.",
    };
};