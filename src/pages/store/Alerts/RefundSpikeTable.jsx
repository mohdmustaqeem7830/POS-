import React from "react";
import { useSelector } from "react-redux";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";
import { DollarSign, User, FileText } from "lucide-react";

const RefundSpikeTable = () => {
  const { storeAlerts } = useSelector((state) => state.storeAnalytics);

  return (
    <>
      {/* ── Mobile Cards ─────────────────────────────────────────────── */}
      <div className="block sm:hidden divide-y">
        {storeAlerts?.refundSpikeAlerts?.map((branch) => (
          <div key={branch.id} className="py-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <User className="h-3.5 w-3.5 text-red-400" />
                </div>
                <p className="font-medium text-sm">{branch.cashierName}</p>
              </div>
              <span className="text-xs text-muted-foreground">ID: {branch.id}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pl-9">
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" /> {branch.amount}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span className="truncate max-w-[180px]">{branch.reason}</span>
              </span>
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
              <TableHead>Cashier Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeAlerts?.refundSpikeAlerts?.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{branch.cashierName}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    {branch.amount}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <p>{branch.reason}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RefundSpikeTable;