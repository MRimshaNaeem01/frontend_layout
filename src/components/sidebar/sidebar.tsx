"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { menu } from "./menu-data";

export default function Sidebar() {
    const pathname = usePathname();

    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [collapsed, setCollapsed] = useState(false);

    const toggleMenu = (id: number) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    return (
        <aside
            className={`h-screen bg-sidebar items-center text-white transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Header */}
            <div className="h-20 flex items-center px-4 border-b border-white/10">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-md hover:bg-white/10"
                >
                    <Menu size={20} />
                </button>

                {!collapsed && (
                    <span className="ml-3 text-lg font-semibold">Company Logo</span>
                )}
            </div>

            <nav className="p-3 space-y-1">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = !!item.children;

                    const isParentActive =
                        item.href === pathname ||
                        item.children?.some((child) =>
                            pathname.startsWith(child.href)
                        );

                    return (
                        <div key={item.id} className="group relative">
                            {hasChildren ? (
                                <button
                                    onClick={() => !collapsed && toggleMenu(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-sm transition
                    ${isParentActive ? "bg-[#173AFB]" : "hover:bg-[#173AFB]"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} />
                                        {!collapsed && item.label}
                                    </div>

                                    {!collapsed && (
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${openMenu === item.id || isParentActive
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm transition
                    ${isParentActive ? "bg-[#173AFB]" : "hover:bg-[#173AFB]"}`}
                                >
                                    <Icon size={18} />
                                    {!collapsed && item.label}
                                </Link>
                            )}

                            {hasChildren && (
                                <div
                                    className={`overflow-hidden transition-all
                    ${collapsed
                                            ? "absolute left-20 top-0 hidden group-hover:block bg-[#1c3996] rounded-md p-2 z-50 w-56"
                                            : openMenu === item.id || isParentActive
                                                ? "block mt-1"
                                                : "hidden"
                                        }`}
                                >
                                    <div className="space-y-1  rounded-md mx-2 py-2">
                                        {item.children!.map((child) => {
                                            const isChildActive = pathname === child.href;

                                            return (
                                                <Link
                                                    key={child.id}
                                                    href={child.href}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm transition
                            ${isChildActive
                                                            ? "bg-[#173AFB40]"
                                                            : "hover:bg-[#173AFB40]"
                                                        }`}
                                                >
                                                    <div className="bg-white border h-2 w-2 rounded-full"></div>
                                                    {child.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
