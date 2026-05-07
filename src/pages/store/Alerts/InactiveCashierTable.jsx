import { useSelector } from "react-redux";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";
import { Tag, Package, User, Clock } from "lucide-react";
import { formatDateTime } from "../../../utils/formateDate";
import { useDispatch } from "react-redux";

const InactiveCashierTable = () => {
  const { storeAlerts } = useSelector((state) => state.storeAnalytics);
  const dispatch = useDispatch();

  return (
    <>
      {/* ── Mobile Cards ─────────────────────────────────────────────── */}
      <div className="block sm:hidden divide-y">
        {storeAlerts?.inactiveCashiers?.map((cashier) => (
          <div key={cashier.id} className="py-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{cashier.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{cashier.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pl-10">
              <span className="flex items-center gap-1">
                <Package className="h-3.5 w-3.5" /> ID: {cashier.id}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> {cashier.branchName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {formatDateTime(cashier.lastLogin)}
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
              <TableHead>FullName</TableHead>
              <TableHead>Branch Name</TableHead>
              <TableHead className="text-right">Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeAlerts?.inactiveCashiers?.map((cashier) => (
              <TableRow key={cashier.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-gray-400" />
                    {cashier.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{cashier.fullName}</div>
                    <div className="text-sm text-muted-foreground">{cashier.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-gray-400" />
                    {cashier.branchName}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatDateTime(cashier.lastLogin)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default InactiveCashierTable;