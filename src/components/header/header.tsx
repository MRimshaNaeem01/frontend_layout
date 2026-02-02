'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "../searchbar/searchbar";
import { useState } from "react";

export default function Header() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <header className="gap-20 h-20  bg-header backdrop-blur px-6 flex items-center justify-end">
            <div className="flex items-center justify-center">
                <SearchBar
                    placeholder="Search by blog title..."
                    onSearch={(value) => {
                        setSearchTerm(value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="flex items-center gap-2">
                <Avatar className="h-12 w-12">
                    <AvatarFallback>RH</AvatarFallback>
                </Avatar>

                <div className="leading-tight">
                    <p className="text-white text-[16px] font-normal">
                        Rimsha Hamza
                    </p>
                    <p className="text-[#8C94B3] text-sm font-normal">
                        Super Admin
                    </p>
                </div>
            </div>

        </header>
    );
}
