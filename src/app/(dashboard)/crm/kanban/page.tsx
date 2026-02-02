"use client"
import PageHeader from "@/components/common/PageHeader"
import KanbanViewTab from "@/components/crm/KanbanViewTab"
import ListViewTab from "@/components/crm/ListViewTab"
import SearchBar from "@/components/searchbar/searchbar"
import { Button } from "@/components/ui/button"
import { ChevronDown, PlusCircle } from "lucide-react"
import { useState } from "react"

type TabKey = "kanbanView" | "listView";
const TABS: { key: TabKey; label: string }[] = [
    { key: "kanbanView", label: "Kanban" },
    { key: "listView", label: "List" }
]
const page = () => {

    const [activeTab, setActiveTab] = useState<TabKey>('kanbanView');

    const handleTabChange = (tab: TabKey) => {
        setActiveTab(tab)
    }

    return (
        <div className='flex flex-col px-4'>
            <div className="flex flex-col w-full gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6 ">
                    <PageHeader name="crm" />
                    <div className="h-5 w-px bg-white/20" />
                    <Button
                        variant="secondary"
                        className="flex justify-center mx-auto bg-white text-[#0b2a4a] hover:bg-white/90"
                        onClick={() => alert("Upload CSV clicked")}
                    >
                        <span>General</span>
                        <ChevronDown />
                    </Button>

                    <SearchBar SearchIconClassName="text-white" inputText="text-white" className="bg-transparent! text-white rounded-md" />
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        className="rounded-full bg-white text-[#0b2a4a] hover:bg-white/90"
                    >
                        Import Data
                    </Button>
                    <Button className="rounded-full bg-[#1d4ed8] hover:bg-[#1b46c8]">
                        Run Campaign
                    </Button>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <div className="w-fit rounded-md border overflow-hidden" role="tablist">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => handleTabChange(tab.key)}
                                className={[
                                    "px-4 py-2 w-25 text-sm font-medium transition",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    isActive ? "bg-[#E0E7F9]" : "bg-white hover:bg-gray-50",
                                ].join(" ")}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {activeTab === "listView" && (
                    <Button className="ms-4 rounded-full w-40 bg-[#1d4ed8] hover:bg-[#1b46c8]">
                        <PlusCircle className="text-white  w-4 h-4" />
                        Add Company
                    </Button>
                )}
            </div>


            {activeTab === "kanbanView" && <div className="mt-4">
                <KanbanViewTab />
            </div>}
            {activeTab === "listView" && <div className="mt-4">
                <ListViewTab />
            </div>
            }
        </div>
    )
}

export default page