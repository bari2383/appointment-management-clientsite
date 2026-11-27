/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, LogOut } from "lucide-react"

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
                    "relative hidden h-screen min-h-0 shrink-0 flex-col bg-[#E8EEFB] p-3 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex",
                    isCollapsed ? "w-24" : "w-72"
                )}
            >
                {/* Collapse Button (sits on the card's right edge) */}
                <button
                    type="button"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="absolute -right-0.5 top-10 z-30 flex size-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-blue-700 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                    <ChevronRight
                        className={cn(
                            "size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            !isCollapsed && "rotate-180"
                        )}
                    />
                </button>

                {/* White floating card */}
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-blue-200/60 animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both motion-reduce:animate-none">
                    {/* Logo */}
                    <div className="shrink-0 px-3 pt-4">
                        <Link
                            href={dashboardHome}
                            className={cn(
                                "flex items-center justify-center overflow-hidden rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
                                isCollapsed ? "mx-auto size-14" : "h-20 w-full"
                            )}
                        >
                            {!isCollapsed ? (
                                <div className="min-w-0 scale-90 animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none">
                                    <BrandLogo />
                                </div>
                            ) : (
                                <div className="relative h-full w-full animate-in fade-in zoom-in-95 duration-500 fill-mode-both motion-reduce:animate-none">
                                    <Image
                                        src={logoImage}
                                        alt="Tarevia"
                                        fill
                                        priority
                                        sizes="56px"
                                        className="object-contain p-1.5"
                                    />
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <ScrollArea className="min-h-0 flex-1">
                        <div
                            className={cn(
                                "py-4 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                isCollapsed ? "px-3" : "px-4"
                            )}
                        >
                            <div ref={listRef} className="relative">
                                {/* Sliding solid active block */}
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
                                            "h-full rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                                            isIndicatorVisible
                                                ? "translate-x-0 opacity-100"
                                                : "translate-x-full opacity-0"
                                        )}
                                    />
                                </div>

                                <div className="space-y-5">
                                    {navItems.map((section, sectionIndex) => (
                                        <div key={sectionIndex}>
                                            {!isCollapsed && section.title && (
                                                <p className="mb-2 px-3 text-xs font-medium tracking-wide text-slate-400 animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none">
                                                    {section.title}
                                                </p>
                                            )}

                                            <div className="space-y-1.5">
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
                                                                "group relative z-10 flex h-12 items-center rounded-xl text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                                                                isCollapsed
                                                                    ? "justify-center"
                                                                    : "gap-3 px-3",
                                                                isActiveShown
                                                                    ? "text-white"
                                                                    : "text-slate-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md hover:shadow-blue-100 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                                            )}
                                                        >
                                                            <Icon
                                                                className={cn(
                                                                    "size-5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                                    isActiveShown
                                                                        ? "text-white"
                                                                        : "text-slate-500 group-hover:scale-110 group-hover:text-blue-600 motion-reduce:group-hover:scale-100"
                                                                )}
                                                            />

                                                            {!isCollapsed && (
                                                                <>
                                                                    <span
                                                                        className={cn(
                                                                            "min-w-0 flex-1 truncate transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none",
                                                                            isActiveShown
                                                                                ? "font-semibold text-white"
                                                                                : "text-slate-600 group-hover:text-blue-700"
                                                                        )}
                                                                    >
                                                                        {item.title}
                                                                    </span>

                                                                    {item.badge ? (
                                                                        <Badge
                                                                            variant="outline"
                                                                            className={cn(
                                                                                "h-5 min-w-5 justify-center rounded-full border-transparent px-1.5 text-[11px] font-semibold transition-colors duration-500",
                                                                                isActiveShown
                                                                                    ? "bg-white/25 text-white"
                                                                                    : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                                                                            )}
                                                                        >
                                                                            {item.badge}
                                                                        </Badge>
                                                                    ) : (
                                                                        <ChevronRight
                                                                            className={cn(
                                                                                "size-4 -translate-x-1 text-slate-300 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0",
                                                                                isActiveShown &&
                                                                                "translate-x-0 text-white/80 opacity-100 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
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
                                                                sideOffset={22}
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Bottom: Logout + User */}
                    <div
                        className={cn(
                            "shrink-0 border-t border-slate-100 pb-3 pt-3 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both motion-reduce:animate-none",
                            isCollapsed ? "px-3" : "px-4"
                        )}
                    >
                        {/* Logout */}
                        {isCollapsed ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="group flex h-12 w-full items-center justify-center rounded-xl text-slate-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-500 hover:shadow-md hover:shadow-red-100 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                    >
                                        <LogOut className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                                    </button>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="right"
                                    sideOffset={22}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg"
                                >
                                    Logout
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="group flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-500 hover:shadow-md hover:shadow-red-100 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                            >
                                <LogOut className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                                <span>Logout</span>
                            </button>
                        )}

                        {/* User box */}
                        {isCollapsed ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="group mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-blue-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-blue-100 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                                    >
                                        <div className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:group-hover:scale-100">
                                            {initial}
                                        </div>
                                    </button>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="right"
                                    sideOffset={22}
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
                        ) : (
                            <div className="mt-2 flex items-center gap-3 rounded-2xl bg-blue-50 p-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-blue-100/70 hover:shadow-md hover:shadow-blue-100 motion-reduce:hover:translate-y-0">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white ring-2 ring-white">
                                    {initial}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {displayName}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-slate-500">
                                        {userInfo?.email}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-medium capitalize text-blue-700 shadow-sm">
                                    {userInfo?.role?.toLowerCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </TooltipProvider>
    )
}

export default DashboardSidebarContent