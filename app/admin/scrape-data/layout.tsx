import { Sidebar } from "@/app/components/admin/sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="bg-[#f5f5fe] flex">
            <Sidebar/>
            <section className="flex flex-1 flex-col">
                <div className="h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3">
                    <h1 className="text-5xl">Scrape Data</h1>
                    <p>The scraping engine is powered by bright data</p>
                </div>
                {children}
            </section>
        </section>
    )
}

export default AdminLayout;