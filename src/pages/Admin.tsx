
import WidgetCard from "@/components/admin/WidgetCard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AdminAgent from "@/components/admin/AdminAgent";

const Admin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen bg-deep-black">
                <Loader2 className="h-16 w-16 animate-spin text-hardcore-pink" />
            </div>
        );
    }

    return (
        <div className="bg-deep-black min-h-screen p-4 md:p-8 text-white">
            <div className="container mx-auto max-w-screen-2xl">
                <header className="text-center mb-12 animate-fade-in-up">
                    <h1 className="font-heading text-5xl md:text-7xl text-white">
                        Command. Control. <span className="text-hardcore-pink animate-pulse">Conquer.</span>
                    </h1>
                    <p className="text-gray-400 mt-4 text-lg tracking-wider">Real-time ops. Instant execution. No mercy.</p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <WidgetCard title="Command Central">
                        <p className="text-gray-300">System status: <span className="text-green-400 font-bold">OPERATIONAL</span></p>
                    </WidgetCard>
                    <WidgetCard title="User Kill Zone">
                        <p className="text-gray-300">Active users: <span className="text-cyan-400 font-bold">1,204</span></p>
                    </WidgetCard>
                    <WidgetCard title="Conversion Domination">
                         <p className="text-gray-300">Conversion rate: <span className="text-hardcore-pink font-bold">2.4%</span></p>
                    </WidgetCard>
                    <WidgetCard title="AI Agent Performance">
                        <p className="text-gray-300">Avg. Response: <span className="text-cyan-400 font-bold">1.2s</span></p>
                    </WidgetCard>
                </div>

                <div className="mt-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <AdminAgent />
                </div>
            </div>
        </div>
    );
};

export default Admin;
