
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type PagePerformanceData = {
  path: string;
  users: string;
  avgTime: string;
  bounceRate: string;
};

const fetchPagePerformance = async (): Promise<PagePerformanceData[]> => {
  const { data, error } = await supabase.functions.invoke('airtable-fetch');
  if (error) {
    console.error("Error fetching page performance:", error);
    throw new Error(error.message);
  }
  return data;
};

const DataTable = () => {
  const { data: tableData, isLoading, error } = useQuery({
    queryKey: ['pagePerformance'],
    queryFn: fetchPagePerformance,
  });

  if (isLoading) {
    return (
      <Card className="bg-cyber-indigo/50 border-cyber-indigo/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Page Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full rounded-md bg-cyber-indigo/30" />
          <Skeleton className="h-10 w-full rounded-md bg-deep-black/50" />
          <Skeleton className="h-10 w-full rounded-md bg-cyber-indigo/20" />
          <Skeleton className="h-10 w-full rounded-md bg-deep-black/50" />
          <Skeleton className="h-10 w-full rounded-md bg-cyber-indigo/20" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-cyber-indigo/50 border-cyber-indigo/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-400">
            <p>Failed to load data from Airtable.</p>
            <p className="text-sm text-gray-400 mt-1">Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-cyber-indigo/50 border-cyber-indigo/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-white">Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-cyber-indigo/80 hover:bg-cyber-indigo/60">
                        <TableHead className="text-white font-bold">Page Path</TableHead>
                        <TableHead className="text-white font-bold">Users</TableHead>
                        <TableHead className="text-white font-bold">Avg Time on Page</TableHead>
                        <TableHead className="text-white font-bold">Bounce Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData?.map((row, index) => (
                        <TableRow key={index} className={`border-cyber-indigo/80 ${index % 2 === 0 ? 'bg-deep-black/50' : 'bg-cyber-indigo/20'} hover:bg-cyber-indigo/60`}>
                            <TableCell className="font-medium text-gray-300">{row.path}</TableCell>
                            <TableCell className="text-gray-300">{row.users}</TableCell>
                            <TableCell className="text-gray-300">{row.avgTime}</TableCell>
                            <TableCell className="text-hardcore-pink">{row.bounceRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
};

export default DataTable;
