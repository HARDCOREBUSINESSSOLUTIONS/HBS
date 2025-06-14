
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Download, FileChartColumn, FileChartLine } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-60 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-deep-black/80 backdrop-blur-lg border-r border-cyber-indigo/20 p-4 flex flex-col space-y-6 text-gray-300 overflow-y-auto">
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 px-2">Date Range</h3>
        <Button variant="outline" className="w-full justify-between bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
          Last 30 days <Calendar className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 px-2">Metrics</h3>
        <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white bg-hardcore-pink/20 hover:bg-hardcore-pink/30">Users</Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-cyber-indigo/50 text-gray-300 hover:text-white">Sessions</Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-cyber-indigo/50 text-gray-300 hover:text-white">Page Views</Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-cyber-indigo/50 text-gray-300 hover:text-white">Conversions</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 px-2">Segment Filters</h3>
        <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
                Device Type <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
                Country <ChevronDown className="h-4 w-4" />
            </Button>
        </div>
      </div>
      
      <div className="mt-auto !mb-0">
        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 px-2">Export</h3>
        <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
                <FileChartColumn className="h-4 w-4" /> Export as CSV
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
                <FileChartLine className="h-4 w-4" /> Export as PDF
            </Button>
             <Button variant="outline" className="w-full justify-start gap-2 bg-cyber-indigo/50 border-cyber-indigo/50 text-white hover:bg-cyber-indigo/80">
                <Download className="h-4 w-4" /> Export as JSON
            </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
