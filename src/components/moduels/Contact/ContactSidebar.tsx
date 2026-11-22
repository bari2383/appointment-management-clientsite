import Link from "next/link";
import { CalendarDays, CreditCard, HelpCircle, TriangleAlert } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const quickLinks = [
    {
        title: "Book an appointment",
        description: "Browse doctors and pick a slot.",
        href: "/consultation",
        icon: CalendarDays,
    },
    {
        title: "Manage my appointments",
        description: "View, reschedule or cancel from your dashboard.",
        href: "/dashboard/my-appointments",
        icon: HelpCircle,
    },
    {
        title: "Payments",
        description: "Check payment status in your appointment details.",
        href: "/dashboard/my-appointments",
        icon: CreditCard,
    },
];

const ContactSidebar = () => {
    return (
        <div className="space-y-5">
            <Reveal delay={80}>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-7">
                    <h3 className="text-base font-semibold tracking-tight text-slate-950">
                        Quick help
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        You may find your answer faster here.
                    </p>

                    <div className="mt-5 space-y-1.5">
                        {quickLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition duration-200 hover:border-blue-100 hover:bg-blue-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 motion-reduce:transition-none"
                                >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                                        <Icon className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {item.title}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Reveal>

            <Reveal delay={180}>
                <div className="rounded-2xl border border-red-200/80 bg-red-50/70 p-6 sm:p-7">
                    <div className="flex items-center gap-2.5 text-red-700">
                        <TriangleAlert className="size-5 shrink-0" />
                        <h3 className="text-base font-semibold tracking-tight">
                            Medical emergency?
                        </h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-red-700/90">
                        This form is not for emergencies. If someone needs urgent medical
                        help, call the national emergency number <strong>999</strong> or go to
                        the nearest hospital right away.
                    </p>
                </div>
            </Reveal>
        </div>
    );
};

export default ContactSidebar;