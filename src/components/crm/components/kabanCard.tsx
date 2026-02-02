import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

type KanbanCardProps = {
    id?: string;
    company?: string;
    email?: string;
    phone?: string;
    timeAgo?: string;
};

export default function KanbanCard({
    id = "001",
    company = "Ossols Pvt LTD",

    email = "abc@gmail.com",
    phone = "03197894521",
    timeAgo = "15 minutes ago",
}: KanbanCardProps) {
    return (
        <Card className="w-full  rounded-xl  bg-white shadow-sm">
            <CardContent className="p-0">
                <div className="space-y-0">
                    <p className="text-sm text-slate-900">{id}</p>

                    <a
                        href="#"
                        className="text-sm font-medium text-blue-600 underline underline-offset-2"
                    >
                        {company}
                    </a>

                    <div className="flex items-center justify-between gap-3">
                        <p className="min-w-0 truncate text-sm text-slate-700">{email}</p>
                        <button
                            type="button"
                            className="shrink-0 rounded-md p-1 text-slate-700 hover:bg-slate-100"
                            aria-label="Email"
                        >
                            <Mail className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <p className="min-w-0 truncate text-sm text-slate-700">{phone}</p>
                        <button
                            type="button"
                            className="shrink-0 rounded-md p-1 text-slate-700 hover:bg-slate-100"
                            aria-label="Call"
                        >
                            <Phone className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span><User className="text-xs font-normal w-4 h-4" /></span>
                    </div>
                    <p className="text-xs italic text-slate-500">{timeAgo}</p>
                </div>
            </CardContent>
        </Card>
    );
}
