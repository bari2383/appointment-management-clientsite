import { Clock3, Mail, MapPin, Phone } from "lucide-react";

// TODO: replace the placeholder values with the real Tarevia contact details.
export const contactInfo = [
    {
        title: "Call Us",
        value: "+880 9610-000000",
        note: "Toll-free patient line",
        href: "tel:+8809610000000",
        icon: Phone,
    },
    {
        title: "Email Us",
        value: "support@tarevia.com",
        note: "Write to us anytime",
        href: "mailto:support@tarevia.com",
        icon: Mail,
    },
    {
        title: "Visit Us",
        value: "Dhaka, Bangladesh",
        note: "Head office",
        icon: MapPin,
    },
    {
        title: "Support Hours",
        value: "24/7 Patient Line",
        note: "Round-the-clock triage",
        icon: Clock3,
    },
];

export const contactSubjects = [
    "Appointment booking",
    "Payment or refund",
    "Technical problem",
    "Doctor registration",
    "Feedback or suggestion",
    "Other",
];

export const contactFaqs = [
    {
        question: "How quickly will I get a reply?",
        answer:
            "We read every message and reply as soon as we can. For anything urgent, please use the patient line instead.",
    },
    {
        question: "I have a problem with an appointment I booked.",
        answer:
            "Choose the subject \"Appointment booking\" and include the doctor's name and the appointment date so we can find it quickly.",
    },
    {
        question: "I paid but my appointment still looks unpaid.",
        answer:
            "Select \"Payment or refund\" and share the time of payment. Please never send card numbers or passwords in the message.",
    },
    {
        question: "I am a doctor. How can I join Tarevia?",
        answer:
            "You can create a doctor account from the registration page. If you need help with the process, pick \"Doctor registration\" as the subject.",
    },
];