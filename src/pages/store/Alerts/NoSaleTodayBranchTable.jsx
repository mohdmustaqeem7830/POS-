import { useSelector } from 'react-redux';
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";
import { MapPin } from "lucide-react";

const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span className="text-sm text-muted-foreground">Loading...</span>
  </div>
);

const NoSaleTodayBranchTable = () => {
  const { storeAlerts, loading } = useSelector((state) => state.storeAnalytics);

  console.log("noSalesToday", storeAlerts);

  if (loading) return <Spinner />;

  return (
    <>
      {/* ── Mobile Cards ─────────────────────────────────────────────── */}
      <div className="block sm:hidden divide-y">
        {storeAlerts?.noSalesToday?.map((branch) => (
          <div key={branch.id} className="py-3 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{branch.name}</p>
              <span className="text-xs text-muted-foreground">ID: {branch.id}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{branch.address}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table ─────────────────────────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Branch Name</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeAlerts?.noSalesToday?.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{branch.name}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {branch.address}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default NoSaleTodayBranchTable;