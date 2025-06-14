
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tableData = [
  { path: '/services', users: '1,420', avgTime: '2m 15s', bounceRate: '35.2%' },
  { path: '/', users: '1,105', avgTime: '3m 05s', bounceRate: '22.8%' },
  { path: '/about', users: '987', avgTime: '1m 45s', bounceRate: '45.1%' },
  { path: '/contact', users: '654', avgTime: '0m 55s', bounceRate: '60.3%' },
  { path: '/agent', users: '321', avgTime: '4m 30s', bounceRate: '15.9%' },
];

const DataTable = () => {
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
                    {tableData.map((row, index) => (
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
