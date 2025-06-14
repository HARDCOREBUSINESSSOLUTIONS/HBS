
import KpiCard from '@/components/reports/KpiCard';
import TrendChart from '@/components/reports/TrendChart';
import DataTable from '@/components/reports/DataTable';
import Sidebar from '@/components/reports/Sidebar';
import { Download, FileChartColumn, FileChartLine, Grid2x2 } from 'lucide-react';

const Reports = () => {
    return (
        <div className="flex bg-deep-black">
            <Sidebar />
            <main className="flex-1 ml-60 p-8 min-h-screen">
                <div className="container mx-auto max-w-7xl">
                    <h1 className="font-heading text-4xl text-white mb-8 animate-fade-in-up">Analytics Dashboard</h1>
                    
                    <div className="space-y-8">
                        {/* First Row – KPI Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <KpiCard title="Users" value="12,403" icon={<Grid2x2 className="h-5 w-5 text-gray-400" />} />
                            <KpiCard title="Sessions" value="15,921" icon={<FileChartColumn className="h-5 w-5 text-gray-400" />} />
                            <KpiCard title="Page Views" value="45,123" icon={<FileChartLine className="h-5 w-5 text-gray-400" />} />
                            <KpiCard title="Conversions" value="874" icon={<Download className="h-5 w-5 text-gray-400" />} />
                        </div>

                        {/* Second Row – Trends */}
                        <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <TrendChart />
                        </div>
                        
                        {/* Fourth Row – Table */}
                        <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                            <DataTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reports;
