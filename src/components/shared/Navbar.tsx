import Link from "next/link";
import {
    ArrowRight,
    LayoutDashboard,
    Menu,
    UserRound,
} from "lucide-react";

import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";

import BrandLogo from "./BrandLogo";
import LogoutButton from "./LogoutButton";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
    /* ---------------------------------------------------------------------- */
    /* Navigation                                                             */
    /* ---------------------------------------------------------------------- */

    const navItems = [
        {
            href: "/consultation/doctors",
            label: "Find Doctors",
        },
        {
            href: "/about",
            label: "About",
        },
        {
            href: "/contact",
            label: "Contact",
        },
    ];

    /* ---------------------------------------------------------------------- */
    /* Authentication                                                         */
    /* ---------------------------------------------------------------------- */

    const accessToken = await getCookie("accessToken");
    const userInfo = accessToken ? await getUserInfo() : null;

    const userName =
        userInfo?.doctor?.name ||
        userInfo?.patient?.name ||
        userInfo?.admin?.name ||
        "My Account";

    return (
        <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5">
            {/* ------------------------------------------------------------------ */}
            {/* Floating Navbar                                                    */}
            {/* ------------------------------------------------------------------ */}

            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
                <div className="flex items-center h-20 justify-between px-4 sm:px-5 lg:px-6">
                    {/* -------------------------------------------------------------- */}
                    {/* Logo                                                           */}
                    {/* -------------------------------------------------------------- */}

                    <Link
                        href="/"
                        aria-label="Home"
                        className="flex shrink-0 items-center"
                    >
                        <BrandLogo />
                    </Link>

                    {/* -------------------------------------------------------------- */}
                    {/* Desktop Navigation                                             */}
                    {/* -------------------------------------------------------------- */}

                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* -------------------------------------------------------------- */}
                    {/* Desktop Actions                                                */}
                    {/* -------------------------------------------------------------- */}

                    <div className="hidden items-center gap-3 lg:flex">
                        {accessToken && userInfo ? (
                            <UserDropdown userInfo={userInfo} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
                                >
                                    Sign in
                                </Link>

                                <Button
                                    asChild
                                    className="group h-10 rounded-lg bg-blue-600 px-5 font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                                >
                                    <Link href="/register">
                                        Get Started

                                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* -------------------------------------------------------------- */}
                    {/* Mobile Trigger                                                 */}
                    {/* -------------------------------------------------------------- */}

                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-10 rounded-xl text-slate-700 hover:bg-slate-100"
                                >
                                    <Menu className="size-5" />

                                    <span className="sr-only">
                                        Open navigation
                                    </span>
                                </Button>
                            </SheetTrigger>

                            {/* ---------------------------------------------------------- */}
                            {/* Mobile Drawer                                              */}
                            {/* ---------------------------------------------------------- */}

                            <SheetContent
                                side="right"
                                className="flex w-full max-w-sm flex-col border-l border-slate-200 bg-white p-0"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>

                                {/* ------------------------------------------------------ */}
                                {/* Drawer Header                                          */}
                                {/* ------------------------------------------------------ */}

                                <div className="flex h-20 items-center border-b border-slate-100 px-5">
                                    <BrandLogo />
                                </div>

                                {/* ------------------------------------------------------ */}
                                {/* Drawer Navigation                                      */}
                                {/* ------------------------------------------------------ */}

                                <div className="flex flex-1 flex-col px-4 py-5">
                                    <nav className="space-y-1">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                                            >
                                                {item.label}

                                                <ArrowRight className="size-4 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-600" />
                                            </Link>
                                        ))}
                                    </nav>
                                </div>

                                {/* ------------------------------------------------------ */}
                                {/* Drawer Account                                         */}
                                {/* ------------------------------------------------------ */}

                                <div className="border-t border-slate-100 p-4">
                                    {accessToken && userInfo ? (
                                        <div className="space-y-4">
                                            {/* User Card */}

                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                <p className="truncate text-sm font-semibold text-slate-950">
                                                    {userName}
                                                </p>

                                                {userInfo?.email && (
                                                    <p className="mt-1 truncate text-xs text-slate-500">
                                                        {userInfo.email}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Account Links */}

                                            <div className="space-y-1">
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                                                >
                                                    <LayoutDashboard className="size-4 text-slate-400" />

                                                    Dashboard
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                                                >
                                                    <UserRound className="size-4 text-slate-400" />

                                                    My Profile
                                                </Link>

                                                <div className="pt-2">
                                                    <LogoutButton />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="h-11 w-full rounded-xl border-slate-200 font-semibold"
                                            >
                                                <Link href="/login">
                                                    Sign in
                                                </Link>
                                            </Button>

                                            <Button
                                                asChild
                                                className="group h-11 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                                            >
                                                <Link href="/register">
                                                    Create Account

                                                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;