"use client";

import { useActionState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/services/public/contactManagement";
import { contactSubjects } from "./contact.data";

const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(sendContactMessage, null);

    const getFieldError = (fieldName: string) =>
        state?.errors?.find((error) => error.field === fieldName)?.message ?? null;

    useEffect(() => {
        if (!state?.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            noValidate
            className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-9"
        >
            <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Send us a message
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in the form and our team will get back to you.
                </p>
            </div>

            {/* Honeypot: hidden from real users, bots tend to fill it. */}
            <div className="hidden" aria-hidden>
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <Field>
                    <FieldLabel htmlFor="name" className="text-sm font-medium text-slate-700">Full name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        defaultValue={state?.values?.name}
                        aria-invalid={!!getFieldError("name")}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 px-4 text-sm transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-blue-500/20 motion-reduce:transition-none"
                    />
                    {getFieldError("name") && (
                        <FieldDescription className="text-xs text-red-600">
                            {getFieldError("name")}
                        </FieldDescription>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="email" className="text-sm font-medium text-slate-700">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        defaultValue={state?.values?.email}
                        aria-invalid={!!getFieldError("email")}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 px-4 text-sm transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-blue-500/20 motion-reduce:transition-none"
                    />
                    {getFieldError("email") && (
                        <FieldDescription className="text-xs text-red-600">
                            {getFieldError("email")}
                        </FieldDescription>
                    )}
                </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <Field>
                    <FieldLabel htmlFor="phone" className="text-sm font-medium text-slate-700">Phone (optional)</FieldLabel>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        defaultValue={state?.values?.phone}
                        aria-invalid={!!getFieldError("phone")}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 px-4 text-sm transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-blue-500/20 motion-reduce:transition-none"
                    />
                    {getFieldError("phone") && (
                        <FieldDescription className="text-xs text-red-600">
                            {getFieldError("phone")}
                        </FieldDescription>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</FieldLabel>
                    <select
                        id="subject"
                        name="subject"
                        defaultValue={state?.values?.subject ?? ""}
                        aria-invalid={!!getFieldError("subject")}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 shadow-xs outline-none transition duration-200 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-[3px] focus-visible:ring-blue-500/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20 motion-reduce:transition-none"
                    >
                        <option value="" disabled>
                            Select a subject
                        </option>
                        {contactSubjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                    {getFieldError("subject") && (
                        <FieldDescription className="text-xs text-red-600">
                            {getFieldError("subject")}
                        </FieldDescription>
                    )}
                </Field>
            </div>

            <Field>
                <FieldLabel htmlFor="message" className="text-sm font-medium text-slate-700">Message</FieldLabel>
                <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={1000}
                    placeholder="How can we help you?"
                    defaultValue={state?.values?.message}
                    aria-invalid={!!getFieldError("message")}
                    className="min-h-40 rounded-xl border-slate-200 bg-slate-50/60 px-4 py-3 text-sm leading-7 transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-blue-500/20 motion-reduce:transition-none"
                />
                {getFieldError("message") && (
                    <FieldDescription className="text-xs text-red-600">
                        {getFieldError("message")}
                    </FieldDescription>
                )}
            </Field>

            <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
                {isPending ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="size-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
};

export default ContactForm;