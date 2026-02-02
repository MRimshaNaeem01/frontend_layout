"use client"

import React, { useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search, Upload, ChevronDown, Bell, MessageCircle } from "lucide-react"

type Row = {
    company: string
    location: string
    platform: string
    category: string
    date: string
    status: "Active" | "Inactive"
}

const SAMPLE: Row[] = [
    {
        company: "Cognitive IT Solutions",
        location: "New York, USA",
        platform: "LinkedIn",
        category: "Food & Beverages",
        date: "24-05-2026",
        status: "Active",
    },
    {
        company: "Soft-tech Cube",
        location: "Montreal, Canada",
        platform: "Glassdoor",
        category: "Construction",
        date: "24-05-2026",
        status: "Active",
    },
    {
        company: "CodeNexus Labs",
        location: "Lahore, PK",
        platform: "LinkedIn",
        category: "IT Services",
        date: "23-05-2026",
        status: "Inactive",
    },
]

export default function Page() {
    const fileRef = useRef<HTMLInputElement | null>(null)

    const [fileName, setFileName] = useState<string>("")
    const [query, setQuery] = useState("")
    const [pageSize, setPageSize] = useState(10)

    const rows = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return SAMPLE
        return SAMPLE.filter((r) =>
            `${r.company} ${r.location} ${r.platform} ${r.category} ${r.date} ${r.status}`
                .toLowerCase()
                .includes(q)
        )
    }, [query])

    function onPickFile() {
        fileRef.current?.click()
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]
        if (!f) return
        setFileName(f.name)
    }

    function onImport() {
        console.log("Import clicked:", fileName)
    }

    return (
        <div className="min-h-screen w-full  text-white">
            {/* <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=2400&q=70)",
                }}
            /> */}
            {/* <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-[#031a33]/65 to-[#021226]/85" /> */}

            <div className=" bg-transparent ">
                {/* Top bar */}
                <div className="flex flex-col gap- md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-6">
                        <div className="text-xl font-semibold tracking-wide">Fetch Data</div>
                        <div className="h-5 w-px bg-white/20" />
                        <button className="text-sm text-white/80 hover:text-white transition">
                            Fetch via API
                        </button>

                        <Button
                            variant="secondary"
                            className="h-9 bg-white text-[#0b2a4a] hover:bg-white/90"
                            onClick={() => alert("Upload CSV clicked")}
                        >
                            Upload CSV
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="secondary"
                            className="h-9 rounded-full bg-white text-[#0b2a4a] hover:bg-white/90"
                        >
                            Import Data
                        </Button>
                        <Button className="h-9 rounded-full bg-[#1d4ed8] hover:bg-[#1b46c8]">
                            Run Campaign
                        </Button>
                    </div>
                </div>

                {/* Main card */}
                <Card className="mt-6 border-white/10 bg-card  backdrop-blur-xl">
                    <div className="relative p-6 md:p-3">
                        {/* Right floating icons */}
                        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
                            <button className="grid h-10 w-10 place-items-center rounded-full bg-[#0b2a4a]/70 ring-1 ring-white/15 hover:bg-[#0b2a4a]/90 transition">
                                <Bell className="h-4 w-4" />
                            </button>
                            <button className="grid h-10 w-10 place-items-center rounded-full bg-[#0b2a4a]/70 ring-1 ring-white/15 hover:bg-[#0b2a4a]/90 transition">
                                <MessageCircle className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="text-white/85">
                            Upload a CSV file to import and manage your data.
                        </div>

                        {/* Upload drop area */}
                        <div className="mt-5 flex flex-col justify-center items-center rounded-lg border border-[#2cc1ff]/35 bg-[#071f38]/55 p-5 md:p-6">
                            <div className="mb-2 flex items-center gap-2 text-white/90">
                                <Upload className="h-4 w-4" />
                                <span className="text-sm">Choose File</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    className="h-10 bg-[#1d4ed8] hover:bg-[#1b46c8]"
                                    onClick={onPickFile}
                                >
                                    <span className="mr-2 text-lg leading-none">+</span>
                                    Choose CSV File
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-90" />
                                </Button>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={onFileChange}
                                />
                            </div>

                            <div className="mt-3 text-xs text-white/55">
                                Drag & drop or browse your file.
                            </div>

                            {fileName ? (
                                <div className="mt-3 text-sm text-white/80">
                                    Selected: <span className="font-medium">{fileName}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-4">
                            <Button
                                onClick={onImport}
                                className="h-10 bg-[#1d4ed8] hover:bg-[#1b46c8]"
                            >
                                Import Data
                            </Button>
                        </div>

                        {/* Data Preview */}
                        <div className="mt-8">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="text-lg font-semibold text-white/90">
                                    Data Preview
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                                        <Input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search..."
                                            className="h-9 border-white/15 bg-white/5 pl-9 text-white placeholder:text-white/45"
                                        />
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="h-9 border-white/15 bg-white/5 text-white hover:bg-white/10"
                                            >
                                                {pageSize}
                                                <ChevronDown className="ml-2 h-4 w-4 opacity-80" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="border-white/10 bg-[#061a2f] text-white">
                                            {[10, 25, 50].map((n) => (
                                                <DropdownMenuItem
                                                    key={n}
                                                    className="cursor-pointer focus:bg-white/10 focus:text-white"
                                                    onClick={() => setPageSize(n)}
                                                >
                                                    {n}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/10 bg-white/5 hover:bg-white/5">
                                            <TableHead className="text-white/70">Company Name</TableHead>
                                            <TableHead className="text-white/70">Location</TableHead>
                                            <TableHead className="text-white/70">Platform</TableHead>
                                            <TableHead className="text-white/70">Category</TableHead>
                                            <TableHead className="text-white/70">Date</TableHead>
                                            <TableHead className="text-white/70">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {rows.slice(0, pageSize).map((r, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="border-white/10 hover:bg-white/5"
                                            >
                                                <TableCell className="text-white/85">
                                                    {r.company}
                                                </TableCell>
                                                <TableCell className="text-white/75">
                                                    {r.location}
                                                </TableCell>
                                                <TableCell className="text-white/75">
                                                    {r.platform}
                                                </TableCell>
                                                <TableCell className="text-white/75">
                                                    {r.category}
                                                </TableCell>
                                                <TableCell className="text-white/75">{r.date}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={[
                                                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1",
                                                            r.status === "Active"
                                                                ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25"
                                                                : "bg-rose-500/15 text-rose-200 ring-rose-400/25",
                                                        ].join(" ")}
                                                    >
                                                        {r.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {rows.length === 0 ? (
                                            <TableRow className="border-white/10">
                                                <TableCell
                                                    colSpan={6}
                                                    className="py-10 text-center text-white/60"
                                                >
                                                    No results found.
                                                </TableCell>
                                            </TableRow>
                                        ) : null}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
