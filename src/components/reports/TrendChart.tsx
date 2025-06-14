
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartData = [
    { date: 'Jan', users: 4000 },
    { date: 'Feb', users: 3000 },
    { date: 'Mar', users: 2000 },
    { date: 'Apr', users: 2780 },
    { date: 'May', users: 1890 },
    { date: 'Jun', users: 2390 },
    { date: 'Jul', users: 3490 },
];

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--primary))',
  },
};

const TrendChart = () => {
    return (
        <Card className="bg-cyber-indigo/50 border-cyber-indigo/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white">User Trends</CardTitle>
                <CardDescription>Last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            stroke="rgba(255, 255, 255, 0.5)"
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          stroke="rgba(255, 255, 255, 0.5)"
                        />
                        <Tooltip
                            cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                            content={<ChartTooltipContent indicator="dot" />}
                            wrapperStyle={{ backgroundColor: '#0D0D0D', border: '1px solid #1E1E2F' }}
                        />
                         <Legend content={<ChartLegendContent />} />
                        <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={true} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default TrendChart;
