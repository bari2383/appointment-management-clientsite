/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, LogOut, PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { getIconComponent } from "@/lib/icon-mapper"
import { logoutUser } from "@/services/auth/logout"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import BrandLogo from "@/components/shared/BrandLogo"
import { UserInfo } from "../../../../types/user.interface"
import { NavSection } from "../../../../types/dashboard.interface"
import Image from "next/image"
import logoImage from "../../../assets/logo/Tarevia.png";


interface DashboardSidebarContentProps {
    userInfo: UserInfo
    navItems: NavSection[]
    dashboardHome: string
}

// Distance of an element from the top of the container (ignores CSS transforms)
const getOffsetTop = (el: HTMLElement, container: HTMLElement) => {
    let top = 0
    let node: HTMLElement | null = el

    while (node && node !== container) {
        top += node.offsetTop
        node = node.offsetParent as HTMLElement | null
    }

    return top
}

const DashboardSidebarContent = ({
    userInfo,
    navItems,
    dashboardHome,
}: DashboardSidebarContentProps) => {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    // Sliding active indicator
    const listRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
    const isIndicatorVisibleRef = useRef(false)
    const collapsedRef = useRef(false)
    const [indicator, setIndicator] = useState({ top: 0, height: 48 })
    const [isIndicatorVisible, setIsIndicatorVisible] = useState(false)
    const [skipMove, setSkipMove] = useState(true)
    const [pendingHref, setPendingHref] = useState<string | null>(null)

    const handleLogout = async () => {
        await logoutUser()
    }

    const displayName = userInfo?.admin?.name || userInfo?.doctor?.name || userInfo?.patient?.name || "User"

    const initial = displayName.charAt(0).toUpperCase()

    const isRouteActive = (href: string) =>
        pathname === href ||
        (href !== dashboardHome && pathname.startsWith(`${href}/`))

    let routeActiveHref: string | null = null
    for (const section of navItems) {
        const found = section.items.find((item: any) => isRouteActive(item.href))
        if (found) {
            routeActiveHref = (found as any).href
            break
        }
    }

    // Clicked item becomes active instantly, so the indicator starts moving right away
    const activeHref = pendingHref ?? routeActiveHref

    useEffect(() => {
        setPendingHref(null)
    }, [pathname])

    useEffect(() => {
        const list = listRef.current
        const activeEl = activeHref ? itemRefs.current[activeHref] : null

        // No active item: slide the indicator out to the right
        if (!list || !activeEl) {
            isIndicatorVisibleRef.current = false
            setSkipMove(true)
            setIsIndicatorVisible(false)
            return
        }

        const next = {
            top: getOffsetTop(activeEl, list),
            height: activeEl.offsetHeight,
        }

        let raf1 = 0
        let raf2 = 0

        if (!isIndicatorVisibleRef.current) {
            // Entering: place it instantly, then slide in from right to left
            setSkipMove(true)
            setIndicator(next)

            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => {
                    isIndicatorVisibleRef.current = true
                    setSkipMove(false)
                    setIsIndicatorVisible(true)
                })
            })
        } else if (collapsedRef.current !== isCollapsed) {
            // Sidebar collapsed/expanded: re-measure without gliding
            collapsedRef.current = isCollapsed
            setSkipMove(true)
            setIndicator(next)

            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => setSkipMove(false))
            })
        } else {
            // Moving between items: smooth glide up/down
            setSkipMove(false)
            setIndicator(next)
        }

        collapsedRef.current = isCollapsed

        return () => {
            cancelAnimationFrame(raf1)
            cancelAnimationFrame(raf2)
        }
    }, [activeHref, isCollapsed, navItems])

    return (
        <TooltipProvider delayDuration={100}>
            <aside
                className={cn(
                    "relative hidden h-screen min-h-0 flex-col bg-blue-600 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
                </div>

                {/* Collapse Button */}
                <button
                    type="button"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="absolute -right-3.5 top-9 z-30 flex size-7 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-blue-50 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                    <PanelLeft
                        className={cn(
                            "size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isCollapsed && "rotate-180"
                        )}
                    />
                </button>

                {/* Logo */}
                <div className="relative z-10 shrink-0 px-4 pt-5 animate-in fade-in slide-in-from-top-2 duration-700 fill-mode-both motion-reduce:animate-none">
                    <Link
                        href={dashboardHome}
                        className={cn(
                            "flex items-center justify-center overflow-hidden bg-white shadow-lg shadow-blue-900/20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/25 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
                            isCollapsed
                                ? "mx-auto size-12 rounded-2xl"
                                : "h-20 w-full rounded-2xl"
                        )}
                    >
                        {!isCollapsed ? (
                            <div className="min-w-0 scale-90 animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none">
                                <BrandLogo />
                            </div>
                        ) : (
                            <div className="relative h-full w-full p-1.5 animate-in fade-in zoom-in-95 duration-500 fill-mode-both motion-reduce:animate-none">
                                <Image
                                    src={logoImage}
                                    alt="Tarevia"
                                    fill
                                    priority
                                    sizes="48px"
                                    className="object-contain p-1.5"
                                />
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="relative z-10 min-h-0 flex-1">
                    <div
                        className={cn(
                            "py-7 pr-0 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isCollapsed ? "pl-3" : "pl-4"
                        )}
                    >
                        <div ref={listRef} className="relative">
                            {/* Sliding white active tab */}
                            <div
                                aria-hidden="true"
                                className={cn(
                                    "pointer-events-none absolute inset-x-0 top-0 z-0",
                                    skipMove
                                        ? "transition-none"
                                        : "transition-[transform,height] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                                )}
                                style={{
                                    height: indicator.height,
                                    transform: `translateY(${indicator.top}px)`,
                                }}
                            >
                                <div
                                    className={cn(
                                        "relative h-full rounded-l-2xl bg-white shadow-md shadow-blue-900/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                                        "before:pointer-events-none before:absolute before:-top-5 before:right-0 before:size-5 before:rounded-br-[20px] before:shadow-[6px_6px_0_6px_#fff]",
                                        "after:pointer-events-none after:absolute after:-bottom-5 after:right-0 after:size-5 after:rounded-tr-[20px] after:shadow-[6px_-6px_0_6px_#fff]",
                                        isIndicatorVisible
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-full opacity-0"
                                    )}
                                />
                            </div>

                            <div className="space-y-6">
                                {navItems.map((section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                        {!isCollapsed && section.title && (
                                            <p className="mb-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none">
                                                {section.title}
                                            </p>
                                        )}

                                        <div className="space-y-2.5">
                                            {section.items.map((item: any, itemIndex: number) => {
                                                const isActive = item.href === activeHref
                                                const isActiveShown = isActive && isIndicatorVisible

                                                const Icon = getIconComponent(
                                                    item.icon
                                                )

                                                const animationDelay = `${Math.min(
                                                    (sectionIndex * 3 + itemIndex) * 70,
                                                    700
                                                )}ms`

                                                const navLink = (
                                                    <Link
                                                        ref={(el) => {
                                                            itemRefs.current[item.href] = el
                                                        }}
                                                        href={item.href}
                                                        aria-current={isActive ? "page" : undefined}
                                                        onClick={(e) => {
                                                            if (
                                                                e.button === 0 &&
                                                                !e.metaKey &&
                                                                !e.ctrlKey &&
                                                                !e.shiftKey &&
                                                                !e.altKey
                                                            ) {
                                                                setPendingHref(item.href)
                                                            }
                                                        }}
                                                        className={cn(
                                                            "group relative z-10 flex h-12 items-center rounded-l-2xl text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                                                            isCollapsed
                                                                ? "justify-center"
                                                                : "gap-3 pl-3 pr-4",
                                                            isActiveShown
                                                                ? "text-blue-700"
                                                                : "text-white/90 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white hover:shadow-lg hover:shadow-blue-900/20 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                                isActiveShown
                                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                                                                    : "text-white group-hover:scale-105 group-hover:bg-white/20 motion-reduce:group-hover:scale-100"
                                                            )}
                                                        >
                                                            <Icon className="size-[18px]" />
                                                        </div>

                                                        {!isCollapsed && (
                                                            <>
                                                                <span
                                                                    className={cn(
                                                                        "min-w-0 flex-1 truncate transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none",
                                                                        isActiveShown
                                                                            ? "font-semibold text-blue-700"
                                                                            : "text-white/90 group-hover:text-white"
                                                                    )}
                                                                >
                                                                    {item.title}
                                                                </span>

                                                                {item.badge ? (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={cn(
                                                                            "rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors duration-500",
                                                                            isActiveShown
                                                                                ? "border-blue-100 bg-blue-50 text-blue-600"
                                                                                : "border-white/20 bg-white/10 text-white group-hover:bg-white/25"
                                                                        )}
                                                                    >
                                                                        {item.badge}
                                                                    </Badge>
                                                                ) : (
                                                                    <ChevronRight
                                                                        className={cn(
                                                                            "size-4 -translate-x-1 text-white/80 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0",
                                                                            isActiveShown &&
                                                                            "translate-x-0 text-blue-400 opacity-100 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                                                                        )}
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                    </Link>
                                                )

                                                const itemContent = isCollapsed ? (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            {navLink}
                                                        </TooltipTrigger>

                                                        <TooltipContent
                                                            side="right"
                                                            sideOffset={10}
                                                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg"
                                                        >
                                                            {item.title}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : (
                                                    navLink
                                                )

                                                return (
                                                    <div
                                                        key={item.href}
                                                        style={{ animationDelay }}
                                                        className="animate-in fade-in slide-in-from-left-2 duration-700 fill-mode-both motion-reduce:animate-none"
                                                    >
                                                        {itemContent}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {sectionIndex <
                                            navItems.length - 1 && (
                                                <div
                                                    className={cn(
                                                        "mt-6 h-px bg-white/15",
                                                        isCollapsed
                                                            ? "mr-3"
                                                            : "mr-4 ml-4"
                                                    )}
                                                />
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* User Section */}
                <div
                    className={cn(
                        "relative z-10 shrink-0 border-t border-white/10 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both motion-reduce:animate-none",
                        isCollapsed ? "p-3" : "p-4"
                    )}
                >
                    {isCollapsed ? (
                        <div className="space-y-2 animate-in fade-in duration-500 fill-mode-both motion-reduce:animate-none">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-blue-700 ring-2 ring-white/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:ring-white/60 motion-reduce:group-hover:scale-100">
                                            {initial}
                                        </div>
                                    </button>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="right"
                                    sideOffset={10}
                                    className="w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
                                >
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {displayName}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {userInfo?.email}
                                    </p>

                                    <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium capitalize text-blue-700">
                                        {userInfo?.role?.toLowerCase()}
                                    </span>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex h-10 w-full items-center justify-center rounded-xl text-white/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white hover:text-red-500 hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                    >
                                        <LogOut className="size-4" />
                                    </button>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="right"
                                    sideOffset={10}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg"
                                >
                                    Logout
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in duration-700 fill-mode-both hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 hover:shadow-lg hover:shadow-blue-900/15 motion-reduce:animate-none motion-reduce:hover:translate-y-0">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-blue-700 ring-2 ring-white/30">
                                    {initial}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-white">
                                        {displayName}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-blue-100/80">
                                        {userInfo?.email}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-white/20 px-2 py-1 text-xs font-medium capitalize text-white">
                                    {userInfo?.role?.toLowerCase()}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="group/logout mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-semibold text-blue-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-500 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                            >
                                <LogOut className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logout:translate-x-0.5 motion-reduce:group-hover/logout:translate-x-0" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </TooltipProvider>
    )
}

export default DashboardSidebarContent