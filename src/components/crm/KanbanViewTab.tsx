"use client"
import { Pencil, Plus, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import KanbanCard from "./components/kabanCard";
import { useState } from "react";
import AddCompnayMdal from "../common/modal/AddCompnayMdal";

const KanbanViewTab = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeColumn, setActiveColumn] = useState<{ id: string; name: string } | null>(null)


    const allColumns = [
        {
            id: "1",
            name: "New",
            leads: [
                {
                    id: "001",
                    company: "Ossols Pvt LTD",
                    email: "abc@gmail.com",
                    phone: "03197894521",
                    timeAgo: "15 minutes ago",
                },
                {
                    id: "002",
                    company: "TechNova Solutions",
                    email: "info@technova.com",
                    phone: "03001234567",
                    timeAgo: "30 minutes ago",
                },
            ],
        },
        {
            id: "2",
            name: "In-progress",
            leads: [
                {
                    id: "003",
                    company: "Skyline Pvt Ltd",
                    email: "contact@skyline.com",
                    phone: "03219876543",
                    timeAgo: "1 hour ago",
                },
            ],
        },
        {
            id: "3",
            name: "Follow Up",
            leads: [
                {
                    id: "004",
                    company: "Alpha Traders",
                    email: "hello@alpha.com",
                    phone: "03331234567",
                    timeAgo: "2 hours ago",
                },
                {
                    id: "005",
                    company: "Zenith Group",
                    email: "sales@zenith.com",
                    phone: "03456789012",
                    timeAgo: "Yesterday",
                },
            ],
        },
        {
            id: "4",
            name: "Semi-Positive",
            leads: [],
        },
        {
            id: "5",
            name: "Positive",
            leads: [
                {
                    id: "006",
                    company: "Positive Corp",
                    email: "positive@skyline.com",
                    phone: "03009998877",
                    timeAgo: "2 days ago",
                },
                {
                    id: "006",
                    company: "Positive Corp",
                    email: "positive@skyline.com",
                    phone: "03009998877",
                    timeAgo: "2 days ago",
                },
                {
                    id: "006",
                    company: "Positive Corp",
                    email: "positive@skyline.com",
                    phone: "03009998877",
                    timeAgo: "2 days ago",
                },
            ],
        },
    ];

    const handleOpenModal = (col: { id: string; name: string }) => {
        setActiveColumn({ id: col.id, name: col.name })
        setIsOpen(true)
    }


    return (
        <div className="w-full h-screen overflow-auto">
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden h-full p-4">
                {allColumns.map((col) => (
                    <div key={col.id} className="shrink-0">
                        <div className="text-white border border-[#729BC8] w-64 flex flex-col h-full">

                            <div className="relative bg-purple-400 py-4 flex justify-between items-center px-6">
                                <span className="font-medium">{col.name}</span>
                                <Pencil className="w-4 h-4 cursor-pointer" />
                                <Plus className="absolute -right-3 bg-white rounded-full text-black w-6 h-6 p-1 cursor-pointer" />
                            </div>

                            <div className="flex flex-col flex-1 px-3 pb-4 h-full overflow-auto">

                                <Button onClick={() => handleOpenModal(col)} className="w-full my-4 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center">
                                    <PlusCircle className="text-black w-4 h-4" />
                                </Button>

                                <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                                    {col.leads.length === 0 ? (
                                        <p className="text-xs text-white text-center italic">
                                            No leads
                                        </p>
                                    ) : (
                                        col.leads.map((lead) => (
                                            <KanbanCard
                                                key={lead.id}
                                                {...lead}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>


            <AddCompnayMdal
                open={isOpen}
                onOpenChange={setIsOpen}
                activeColumn={activeColumn}
                onCancel={() => setActiveColumn(null)}
                onSave={() => {
                    console.log("Save clicked")
                    setActiveColumn(null)
                }}
            />
        </div>
    );

};

export default KanbanViewTab;
