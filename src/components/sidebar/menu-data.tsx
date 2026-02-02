import {
    LayoutDashboard,
    Settings,
    User,
    ContainerIcon,
} from "lucide-react";

export const menu = [
    {
        id: 1,
        label: "CRM",
        href: "/crm",
        icon: ContainerIcon,
    },

    {
        id: 2,
        label: "Categories",
        icon: LayoutDashboard,
        children: [
            { id: 1, icon: ContainerIcon, label: "Add Category", href: "/categories" },
            { id: 2, icon: ContainerIcon, label: "All Categories", href: "/categories" },
        ],
    },

    {
        id: 3,
        label: "Employees",
        icon: User,
        children: [
            { id: 1, icon: ContainerIcon, label: "Add Employee", href: "/employees" },
            { id: 2, icon: ContainerIcon, label: "Employee List", href: "/employees" },
        ],
    },

    {
        id: 4,
        label: "More Options",
        icon: Settings,
        children: [
            { id: 1, icon: ContainerIcon, label: "Settings", href: "/settings" },
            { id: 2, icon: ContainerIcon, label: "Logs", href: "/logs" },
        ],
    },
];
