"use client";

import {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";
import {
    CalendarDays,
    Check,
    CheckCircle2,
    Clock,
    Clock3,
    Lock,
    Search,
    Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Content (edit freely)                                                      */
/* -------------------------------------------------------------------------- */

const DOCTOR = {
    name: "Dr. Sarah Ahmed",
    initials: "SA",
    designation: "Consultant, General Medicine",
    specialty: "General Medicine",
    rating: "4.9",
    experience: "8 years experience",
    fee: "৳800",
};

const SLOTS = ["3:00 PM", "4:30 PM", "6:15 PM"] as const;
const CHOSEN_SLOT = "4:30 PM";

const STEPS = ["Book Doctor", "Confirmed", "Appointments"] as const;

type Scene = "doctors" | "dialog" | "confirm" | "success" | "list";
type ClickState = "idle" | "down" | "release";

/** Which of the three step pills a scene belongs to. */
const PHASE_OF: Record<Scene, number> = {
    doctors: 0,
    dialog: 0,
    confirm: 1,
    success: 1,
    list: 2,
};

const URL_OF: Record<Scene, string> = {
    doctors: "/consultation",
    dialog: "/consultation",
    confirm: "/dashboard/book-appointment",
    success: "/dashboard/book-appointment",
    list: "/dashboard/my-appointments",
};

/* -------------------------------------------------------------------------- */
/* Today's date (client only, so the demo never looks stale)                  */
/* -------------------------------------------------------------------------- */

const noopSubscribe = () => () => {};

function useToday() {
    const long = useSyncExternalStore(
        noopSubscribe,
        () =>
            new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            }).format(new Date()),
        () => "Today",
    );
    const short = useSyncExternalStore(
        noopSubscribe,
        () =>
            new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }).format(new Date()),
        () => "Today",
    );
    return { long, short };
}

/* -------------------------------------------------------------------------- */
/* Tiny presentational parts (look-alikes of your real components)            */
/* -------------------------------------------------------------------------- */

function StatusBadge({
    tone,
    children,
}: {
    tone: "blue" | "amber" | "emerald";
    children: ReactNode;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium",
                tone === "blue" && "border-blue-200 bg-blue-50 text-blue-700",
                tone === "amber" && "border-amber-200 bg-amber-50 text-amber-700",
                tone === "emerald" &&
                    "border-emerald-200 bg-emerald-50 text-emerald-700",
            )}
        >
            <span
                className={cn(
                    "size-1.5 rounded-full",
                    tone === "blue" && "bg-blue-500",
                    tone === "amber" && "bg-amber-500",
                    tone === "emerald" && "bg-emerald-500",
                )}
            />
            {children}
        </span>
    );
}

function Initials({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 font-semibold text-blue-600",
                className,
            )}
        >
            {children}
        </div>
    );
}

/** A scene stacked over the others; only the current one is visible. */
function Layer({
    show,
    children,
}: {
    show: boolean;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                "absolute inset-0 transition-all duration-500 ease-out",
                show
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-3 opacity-0",
            )}
        >
            {children}
        </div>
    );
}

/** The animated mouse pointer plus its click ripple. */
function Cursor({
    x,
    y,
    visible,
    instant,
    click,
}: {
    x: number;
    y: number;
    visible: boolean;
    instant: boolean;
    click: ClickState;
}) {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-50"
            style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                opacity: visible ? 1 : 0,
                transitionProperty: instant ? "none" : "transform, opacity",
                transitionDuration: "800ms, 300ms",
                transitionTimingFunction: "cubic-bezier(0.45, 0, 0.2, 1), ease-out",
            }}
        >
            <span
                className={cn(
                    "absolute -left-3.5 -top-3.5 size-7 rounded-full bg-blue-500/30 ring-2 ring-blue-500/60 transition-all",
                    click === "idle" && "scale-50 opacity-0 duration-0",
                    click === "down" && "scale-75 opacity-100 duration-100",
                    click === "release" && "scale-[2.2] opacity-0 duration-500",
                )}
            />
            <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                className={cn(
                    "relative -left-px -top-px origin-top-left drop-shadow-md transition-transform duration-100",
                    click === "down" && "scale-90",
                )}
            >
                <path
                    d="M1.5 1.5 L1.5 18.5 L6 14.6 L9 21.8 L11.8 20.6 L8.8 13.6 L14.8 13.6 Z"
                    fill="#0f172a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function HeroAppointmentPreview({
    className,
}: {
    className?: string;
}) {
    const today = useToday();

    const [scene, setScene] = useState<Scene>("doctors");
    const [picked, setPicked] = useState(false);
    const [hover, setHover] = useState<string | null>(null);
    const [pressed, setPressed] = useState<string | null>(null);
    const [clickState, setClickState] = useState<ClickState>("idle");
    const [cursor, setCursor] = useState({
        x: 0,
        y: 0,
        visible: false,
        instant: true,
    });
    /** Bumping `id` restarts the story from `phase` (used by the step pills). */
    const [start, setStart] = useState({ phase: 0, id: 0 });

    const rootRef = useRef<HTMLDivElement>(null);
    const targets = useRef<Record<string, HTMLElement | null>>({});
    const reg = (name: string) => (el: HTMLElement | null) => {
        targets.current[name] = el;
    };

    /* ---------------------------------------------------------------------- */
    /* The story: pointer moves, hovers, clicks — then the screen reacts      */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
        let stopped = false;
        const timers = new Set<number>();

        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                if (stopped) return; // never resolves once stopped
                const id = window.setTimeout(() => {
                    timers.delete(id);
                    resolve();
                }, ms);
                timers.add(id);
            });

        const later = (ms: number, fn: () => void) => {
            const id = window.setTimeout(() => {
                timers.delete(id);
                fn();
            }, ms);
            timers.add(id);
        };

        /** Centre (or fx/fy fraction) of a named element, in stage coordinates. */
        const point = (name: string, fx = 0.5, fy = 0.5) => {
            const root = rootRef.current;
            const el = targets.current[name];
            if (!root || !el) return null;
            const r = root.getBoundingClientRect();
            const b = el.getBoundingClientRect();
            return {
                x: b.left - r.left + b.width * fx,
                y: b.top - r.top + b.height * fy,
            };
        };

        const moveTo = async (name: string, fx = 0.5, fy = 0.5) => {
            const p = point(name, fx, fy);
            if (p) setCursor((c) => ({ ...c, ...p, visible: true, instant: false }));
            await wait(850);
        };

        const click = async (name: string) => {
            setPressed(name);
            setClickState("down");
            await wait(140);
            setClickState("release");
            setPressed(null);
            later(560, () => setClickState("idle"));
            await wait(220);
        };

        /** Park the pointer (invisible) somewhere sensible, then fade it in. */
        const park = async (fx: number, fy: number) => {
            const root = rootRef.current;
            const w = root?.clientWidth ?? 400;
            const h = root?.clientHeight ?? 300;
            setCursor({ x: w * fx, y: h * fy, visible: false, instant: true });
            await wait(80);
            setCursor((c) => ({ ...c, visible: true, instant: false }));
            await wait(350);
        };

        const phase0 = async () => {
            setScene("doctors");
            setPicked(false);
            setHover(null);
            await park(0.86, 0.9);

            // 1) Find Doctors → click "Book Appointment"
            await moveTo("book");
            setHover("book");
            await wait(350);
            await click("book");
            setHover(null);
            setScene("dialog");
            await wait(1000);

            // 2) Dialog → pick 4:30 PM
            await moveTo("slot");
            setHover("slot");
            await wait(350);
            await click("slot");
            setPicked(true);
            setHover(null);
            await wait(700);

            // 3) Continue
            await moveTo("continue");
            setHover("continue");
            await wait(350);
            await click("continue");
            setHover(null);
            setScene("confirm");
            await wait(1000);
        };

        const phase1 = async () => {
            // 4) Confirm Appointment → "Book Now, Pay Later"
            await moveTo("later");
            setHover("later");
            await wait(350);
            await click("later");
            setHover(null);
            setScene("success");
            await wait(2300);
        };

        const phase2 = async () => {
            // 5) My Appointments → the new booking shows up
            setScene("list");
            await wait(1100);
            await moveTo("newCard", 0.55, 0.5);
            setHover("newCard");
            await wait(2600);
            setHover(null);
            setCursor((c) => ({ ...c, visible: false }));
            await wait(700);
        };

        const main = async () => {
            await wait(0);

            let p = start.phase;
            if (p === 1) {
                setScene("confirm");
                setPicked(true);
                setHover(null);
                await park(0.8, 0.85);
                await wait(500);
            } else if (p === 2) {
                setScene("list");
                setPicked(true);
                setHover(null);
                await park(0.8, 0.85);
            }

            while (!stopped) {
                if (p <= 0) await phase0();
                if (p <= 1) await phase1();
                if (p <= 2) await phase2();
                p = 0;
            }
        };

        void main();

        return () => {
            stopped = true;
            timers.forEach((id) => window.clearTimeout(id));
        };
    }, [start]);

    const activePhase = PHASE_OF[scene];
    const isHover = (name: string) => hover === name;
    const isPressed = (name: string) => pressed === name;

    return (
        <div
            role="region"
            aria-label="Animated preview: choose a doctor, pick a time, confirm, then see your appointments"
            className={cn("relative mx-auto w-full max-w-xl", className)}
        >
            <div className="rounded-3xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-200">
                {/* Browser window */}
                <div
                    aria-hidden
                    className="@container relative select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                >
                    {/* Address bar */}
                    <div className="flex h-8 items-center gap-2 border-b border-slate-200 bg-white px-3">
                        <div className="flex gap-1">
                            <span className="size-2 rounded-full bg-slate-200" />
                            <span className="size-2 rounded-full bg-slate-200" />
                            <span className="size-2 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex h-5 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-slate-100 px-2 text-[10px] text-slate-500">
                            <Lock className="size-2.5 shrink-0" />
                            <span className="truncate">{URL_OF[scene]}</span>
                        </div>
                    </div>

                    {/* Page area */}
                    <div
                        ref={rootRef}
                        className="relative h-[19.5rem] overflow-hidden"
                    >
                        {/* ------------------------------------------------ */}
                        {/* Find Doctors  (+ Book Appointment dialog)         */}
                        {/* ------------------------------------------------ */}
                        <Layer show={scene === "doctors" || scene === "dialog"}>
                            <div className="p-3">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-bold text-slate-900">
                                        Find Doctors
                                    </p>
                                    <div className="flex h-7 w-36 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-400">
                                        <Search className="size-3" />
                                        Search doctors
                                    </div>
                                </div>

                                {/* Doctor card */}
                                <div
                                    ref={reg("card")}
                                    className={cn(
                                        "relative mt-2.5 overflow-hidden rounded-2xl border bg-white p-2 transition-all duration-300 ease-out",
                                        isHover("book")
                                            ? "-translate-y-0.5 border-blue-300 shadow-lg shadow-blue-500/15"
                                            : "border-slate-200 shadow-sm",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "absolute inset-x-0 top-0 h-1 origin-left bg-blue-500 transition-transform duration-500",
                                            isHover("book") ? "scale-x-100" : "scale-x-0",
                                        )}
                                    />

                                    <div className="flex gap-3 pt-1">
                                        <Initials className="size-16 text-lg">
                                            {DOCTOR.initials}
                                        </Initials>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p
                                                    className={cn(
                                                        "truncate text-sm font-semibold transition-colors duration-200",
                                                        isHover("book")
                                                            ? "text-blue-700"
                                                            : "text-slate-900",
                                                    )}
                                                >
                                                    {DOCTOR.name}
                                                </p>
                                                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                                    Available
                                                </span>
                                            </div>
                                            <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                                                {DOCTOR.designation}
                                            </p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                                                    <Star className="size-3 fill-amber-400 text-amber-400" />
                                                    {DOCTOR.rating}
                                                </span>
                                                <span className="truncate rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                                                    {DOCTOR.specialty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-2 py-1.5 text-[11px] font-medium text-slate-600">
                                            <Clock className="size-3 shrink-0 text-blue-500" />
                                            <span className="truncate">{DOCTOR.experience}</span>
                                        </div>
                                        <div className="flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-2 py-1.5 text-xs font-semibold tabular-nums text-blue-700">
                                            {DOCTOR.fee}
                                        </div>
                                    </div>

                                    <div className="mt-2 flex gap-2">
                                        <div className="flex h-8 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600">
                                            View Details
                                        </div>
                                        <div
                                            ref={reg("book")}
                                            className={cn(
                                                "flex h-8 flex-1 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white transition-all duration-200",
                                                isHover("book") &&
                                                    "-translate-y-0.5 bg-blue-700 shadow-lg shadow-blue-600/40",
                                                isPressed("book") && "scale-95",
                                            )}
                                        >
                                            Book Appointment
                                        </div>
                                    </div>
                                </div>

                                {/* Next card peeking in, like the real doctor grid */}
                                <div className="mt-2.5 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                                    <div className="flex gap-3">
                                        <Initials className="size-12 text-sm">RK</Initials>
                                        <div className="min-w-0 flex-1 pt-1">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                Dr. Rahim Khan
                                            </p>
                                            <div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Book an Appointment dialog */}
                            <div
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center bg-slate-900/40 p-3 transition-opacity duration-300",
                                    scene === "dialog" ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out",
                                        scene === "dialog"
                                            ? "translate-y-0 scale-100 opacity-100"
                                            : "translate-y-3 scale-95 opacity-0",
                                    )}
                                >
                                    <div className="border-b border-slate-100 px-3.5 py-2.5">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Book an Appointment
                                        </p>
                                        <p className="mt-0.5 truncate text-[11px] text-slate-500">
                                            Select an available consultation time with{" "}
                                            <span className="font-medium text-slate-900">
                                                {DOCTOR.name}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="space-y-2.5 px-3.5 py-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-slate-900">
                                                    Available Time Slots
                                                </p>
                                                <p className="truncate text-[10px] text-slate-500">
                                                    Choose your preferred date and time
                                                </p>
                                            </div>
                                            <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                                                3 Available
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays className="size-3.5 shrink-0 text-blue-600" />
                                            <p className="truncate text-xs font-semibold text-slate-900">
                                                {today.long}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            {SLOTS.map((time) => {
                                                const isChosen = time === CHOSEN_SLOT;
                                                const selected = isChosen && picked;
                                                const slotRef = isChosen ? reg("slot") : undefined;

                                                return (
                                                    <div
                                                        key={time}
                                                        ref={slotRef}
                                                        className={cn(
                                                            "flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-all duration-200",
                                                            selected
                                                                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                                                : isChosen && isHover("slot")
                                                                  ? "border-blue-300 bg-blue-50 text-blue-700"
                                                                  : "border-slate-200 bg-white text-slate-700",
                                                            isChosen && isPressed("slot") && "scale-95",
                                                        )}
                                                    >
                                                        {selected ? (
                                                            <Check className="size-3.5 shrink-0" />
                                                        ) : (
                                                            <Clock3 className="size-3.5 shrink-0" />
                                                        )}
                                                        {time}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
                                        <p className="min-w-0 truncate text-[11px] text-slate-500">
                                            {picked ? (
                                                <>
                                                    <span className="font-medium text-slate-900">
                                                        Selected:{" "}
                                                    </span>
                                                    {today.short} at {CHOSEN_SLOT}
                                                </>
                                            ) : (
                                                "No time slot selected"
                                            )}
                                        </p>
                                        <div className="flex shrink-0 gap-1.5">
                                            <div className="flex h-7 items-center rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700">
                                                Cancel
                                            </div>
                                            <div
                                                ref={reg("continue")}
                                                className={cn(
                                                    "flex h-7 items-center rounded-lg px-3 text-[11px] font-medium transition-all duration-200",
                                                    picked
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-slate-200 text-slate-400",
                                                    picked &&
                                                        isHover("continue") &&
                                                        "bg-blue-700 shadow-md shadow-blue-600/30",
                                                    isPressed("continue") && "scale-95",
                                                )}
                                            >
                                                Continue
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Layer>

                        {/* ------------------------------------------------ */}
                        {/* Confirm Appointment  (+ success slide-up)         */}
                        {/* ------------------------------------------------ */}
                        <Layer show={scene === "confirm" || scene === "success"}>
                            <div className="p-3">
                                <p className="text-sm font-bold text-slate-900">
                                    Confirm Appointment
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-500">
                                    Review your booking details
                                </p>

                                <div className="mt-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <Initials className="size-10 text-sm">
                                            {DOCTOR.initials}
                                        </Initials>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {DOCTOR.name}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                {DOCTOR.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-2.5 h-px bg-slate-100" />

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <p className="text-[10px] text-slate-500">Date</p>
                                            <p className="font-medium text-slate-900">
                                                {today.short}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500">Time</p>
                                            <p className="font-medium text-slate-900">
                                                {CHOSEN_SLOT}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2">
                                        <span className="text-xs font-medium text-slate-700">
                                            Consultation Fee
                                        </span>
                                        <span className="text-base font-semibold tabular-nums text-blue-600">
                                            {DOCTOR.fee}
                                        </span>
                                    </div>

                                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                                        <div className="flex h-8 items-center justify-center rounded-lg bg-blue-600 px-2 text-[11px] font-semibold text-white">
                                            <span className="truncate">Pay Now &amp; Book</span>
                                        </div>
                                        <div
                                            ref={reg("later")}
                                            className={cn(
                                                "flex h-8 items-center justify-center rounded-lg border px-2 text-[11px] font-semibold transition-all duration-200",
                                                isHover("later")
                                                    ? "border-blue-300 bg-blue-50 text-blue-700 shadow-md shadow-blue-500/15"
                                                    : "border-slate-200 bg-white text-slate-700",
                                                isPressed("later") && "scale-95",
                                            )}
                                        >
                                            <span className="truncate">Book Now, Pay Later</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Confirmed — slides up from the bottom */}
                            <div
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center bg-slate-900/20 p-3 transition-opacity duration-300",
                                    scene === "success" ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-full max-w-sm rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-xl shadow-emerald-900/10 transition-all duration-700 ease-out",
                                        scene === "success"
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-40 opacity-0",
                                    )}
                                >
                                    <CheckCircle2
                                        className={cn(
                                            "mx-auto size-12 rounded-full bg-emerald-100 p-2.5 text-emerald-600 ring-4 ring-emerald-50 transition-all delay-300 duration-500",
                                            scene === "success" ? "scale-100" : "scale-50",
                                        )}
                                    />
                                    <p className="mt-2.5 text-base font-semibold text-emerald-900">
                                        Appointment Confirmed!
                                    </p>
                                    <p className="mt-1 text-xs text-emerald-700">
                                        {DOCTOR.name} · {today.short} at {CHOSEN_SLOT}
                                    </p>
                                    <p className="mt-2 animate-pulse text-[11px] text-emerald-600">
                                        Redirecting to your appointments…
                                    </p>
                                </div>
                            </div>
                        </Layer>

                        {/* ------------------------------------------------ */}
                        {/* My Appointments                                   */}
                        {/* ------------------------------------------------ */}
                        <Layer show={scene === "list"}>
                            <div className="p-3">
                                <p className="text-sm font-bold text-slate-900">
                                    My Appointments
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-500">
                                    View and manage your scheduled appointments
                                </p>

                                <div className="mt-2.5 grid gap-2.5 @lg:grid-cols-2">
                                    {/* The booking we just made */}
                                    <div
                                        ref={reg("newCard")}
                                        className={cn(
                                            "relative overflow-hidden rounded-2xl border bg-white p-3 transition-all duration-500 ease-out",
                                            scene === "list"
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-4 opacity-0",
                                            isHover("newCard")
                                                ? "-translate-y-1 border-blue-300 shadow-lg shadow-blue-500/20"
                                                : "border-slate-200 shadow-sm",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute inset-x-0 top-0 h-1 origin-left bg-blue-500 transition-transform duration-500",
                                                isHover("newCard") ? "scale-x-100" : "scale-x-0",
                                            )}
                                        />
                                        <div className="flex flex-wrap gap-1.5">
                                            <StatusBadge tone="blue">Scheduled</StatusBadge>
                                            <StatusBadge tone="amber">Payment Pending</StatusBadge>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-3">
                                            <Initials className="size-11 text-sm">
                                                {DOCTOR.initials}
                                            </Initials>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {DOCTOR.name}
                                                </p>
                                                <p className="truncate text-xs text-slate-500">
                                                    {DOCTOR.designation}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-600">
                                            <span className="flex items-center gap-1">
                                                <CalendarDays className="size-3 text-blue-500" />
                                                {today.short}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3 text-blue-500" />
                                                {CHOSEN_SLOT}
                                            </span>
                                        </div>
                                    </div>

                                    {/* An older booking */}
                                    <div
                                        style={{ transitionDelay: scene === "list" ? "150ms" : "0ms" }}
                                        className={cn(
                                            "rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-500 ease-out",
                                            scene === "list"
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-4 opacity-0",
                                        )}
                                    >
                                        <div className="flex flex-wrap gap-1.5">
                                            <StatusBadge tone="blue">Scheduled</StatusBadge>
                                            <StatusBadge tone="emerald">Paid</StatusBadge>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-3">
                                            <Initials className="size-11 text-sm">RK</Initials>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    Dr. Rahim Khan
                                                </p>
                                                <p className="truncate text-xs text-slate-500">
                                                    Consultant, Cardiology
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-600">
                                            <span className="flex items-center gap-1">
                                                <CalendarDays className="size-3 text-blue-500" />
                                                Tomorrow
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3 text-blue-500" />
                                                11:00 AM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Layer>

                        <Cursor
                            x={cursor.x}
                            y={cursor.y}
                            visible={cursor.visible}
                            instant={cursor.instant}
                            click={clickState}
                        />
                    </div>
                </div>

                {/* Step pills: jump to a step and replay from there */}
                <div
                    className="mt-2.5 flex h-8 items-center justify-center gap-2"
                    role="group"
                    aria-label="Preview steps"
                >
                    {STEPS.map((label, index) => {
                        const isActive = index === activePhase;

                        return (
                            <button
                                key={label}
                                type="button"
                                aria-label={`Step ${index + 1}: ${label}`}
                                aria-current={isActive ? "step" : undefined}
                                onClick={() =>
                                    setStart((s) => ({ phase: index, id: s.id + 1 }))
                                }
                                className={cn(
                                    "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all duration-300",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                    isActive
                                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex size-4 items-center justify-center rounded-full text-[10px] leading-none",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 text-slate-500",
                                    )}
                                >
                                    {index + 1}
                                </span>
                                <span className="hidden min-[400px]:inline">{label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}