
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type KpiCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

const KpiCard = ({ title, value, icon }: KpiCardProps) => {
  return (
    <Card className="bg-cyber-indigo/50 border-cyber-indigo/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase text-gray-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
