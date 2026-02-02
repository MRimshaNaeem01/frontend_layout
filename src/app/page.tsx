import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50">
          <Header />
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>

    </div>
  );
}
