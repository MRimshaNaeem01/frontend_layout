"use client"

import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import AddCompnayMdal from "../common/modal/AddCompnayMdal"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Column = {
    id: string
    name: string
    leads: {
        id: string
        company: string
        email: string
        phone: string
        timeAgo: string
    }[]
}

const STAGES = ["New", "In-progress", "Follow Up", "Semi-Positive", "Positive"] as const

function stageIndex(stage: string) {
    const idx = STAGES.indexOf(stage as any)
    return idx === -1 ? 0 : idx
}

function StageBar({ stage }: { stage: string }) {
    const idx = stageIndex(stage)

    return (
        <div className="flex flex-col items-center gap-2 min-w-[260px]">
            <div className="flex w-[260px] h-4 overflow-hidden rounded-full border border-white/50">
                {Array.from({ length: 6 }).map((_, i) => {
                    const active = i <= idx // fill as per stage (simple logic)
                    return (
                        <div
                            key={i}
                            className={[
                                "flex-1 border-r last:border-r-0 border-white/30",
                                active ? "bg-cyan-400/90" : "bg-transparent",
                            ].join(" ")}
                        />
                    )
                })}
            </div>

            <div className="text-xs text-white/90">{stage}</div>
        </div>
    )
}

export default function ListViewTab() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeColumn, setActiveColumn] = useState<{ id: string; name: string } | null>(null)

    const allColumns: Column[] = [
        {
            id: "1",
            name: "New",
            leads: [
                { id: "001", company: "Ossols Pvt LTD", email: "abc@gmail.com", phone: "03197894521", timeAgo: "15 minutes ago" },
                { id: "002", company: "TechNova Solutions", email: "info@technova.com", phone: "03001234567", timeAgo: "30 minutes ago" },
            ],
        },
        {
            id: "2",
            name: "In-progress",
            leads: [
                { id: "003", company: "Skyline Pvt Ltd", email: "contact@skyline.com", phone: "03219876543", timeAgo: "1 hour ago" },
            ],
        },
        {
            id: "3",
            name: "Follow Up",
            leads: [
                { id: "004", company: "Alpha Traders", email: "hello@alpha.com", phone: "03331234567", timeAgo: "2 hours ago" },
                { id: "005", company: "Zenith Group", email: "sales@zenith.com", phone: "03456789012", timeAgo: "Yesterday" },
            ],
        },
        { id: "4", name: "Semi-Positive", leads: [] },
        {
            id: "5",
            name: "Positive",
            leads: [
                { id: "006", company: "Positive Corp", email: "positive@skyline.com", phone: "03009998877", timeAgo: "2 days ago" },
                { id: "007", company: "Positive Corp", email: "positive@skyline.com", phone: "03009998877", timeAgo: "2 days ago" },
                { id: "008", company: "Positive Corp", email: "positive@skyline.com", phone: "03009998877", timeAgo: "2 days ago" },
            ],
        },
    ]

    const rows = useMemo(() => {
        return allColumns.flatMap((col) =>
            col.leads.map((lead) => ({
                ...lead,
                stage: col.name,
                columnId: col.id,
            }))
        )
    }, [allColumns])

    const openAddCompanyModal = () => {
        setActiveColumn({ id: "1", name: "New" })
        setIsOpen(true)
    }

    return (
        <div className="w-full h-screen overflow-auto p-6">
            <div className="">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 bg-gray-200/20  hover:bg-transparent">
                            <TableHead className="w-10 text-white py-6">
                                <Checkbox />
                            </TableHead>
                            <TableHead className="text-white py-6">ID</TableHead>
                            <TableHead className="text-white py-6">Company Name</TableHead>
                            <TableHead className="text-white py-6">Email</TableHead>
                            <TableHead className="text-white py-6">Phone</TableHead>
                            <TableHead className="text-white py-6 text-center">Stage</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((r) => (
                            <TableRow key={`${r.stage}-${r.id}`} className="border-white/10 hover:bg-transparent">
                                <TableCell className="py-4 text-white">
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="py-4 text-white/90">{r.id}</TableCell>
                                <TableCell className="py-4 text-white/90">{r.company}</TableCell>
                                <TableCell className="py-4 text-white/90">{r.email}</TableCell>
                                <TableCell className="py-4 text-white/90">{r.phone}</TableCell>
                                <TableCell className="py-4 text-white/90">
                                    <div className="flex justify-center">
                                        <StageBar stage={r.stage} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-white/70 py-10">
                                    No leads
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </div>

            <AddCompnayMdal
                open={isOpen}
                onOpenChange={setIsOpen}
                activeColumn={activeColumn}
                onCancel={() => setActiveColumn(null)}
                onSave={(values: any) => {
                    console.log("Save clicked", values)
                    setActiveColumn(null)
                }}
            />
        </div>
    )
}
