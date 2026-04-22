import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, ArrowUpDown } from "lucide-react";

const OrdersTable = ({
  orders,
  loading,
  onViewDetails,
  onPrintInvoice,
  getStatusColor,
  getPaymentIcon,
}) => {

  // Reusable action buttons
  const ActionButtons = ({ order }) => (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewDetails(order.id)}
        title="View Details"
      >
        <Search className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPrintInvoice(order.id)}
        title="Print Invoice"
      >
        <FileText className="h-4 w-4" />
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-400">Loading orders...</div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No orders found matching your criteria
      </div>
    );
  }

  return (
    <>
      {/* ── MOBILE: Card layout — hidden on md+ ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4 space-y-2">

              {/* Top row: Order ID + Status */}
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">#{order.id}</p>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="secondary"
                >
                  {order.status || "COMPLETE"}
                </Badge>
              </div>

              {/* Customer + Cashier */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{order.customer?.fullName || "-"}</span>
                <span className="text-gray-400">{order.cashierId || "-"}</span>
              </div>

              {/* Date + Amount */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {order.createdAt ? order.createdAt.slice(0, 10) : "-"}
                </span>
                <span className="font-semibold">
                  {order.totalAmount ? `₹${order.totalAmount}` : "-"}
                </span>
              </div>

              {/* Payment + Actions */}
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  {getPaymentIcon(order.paymentType)}
                  <span>{order.paymentType || "-"}</span>
                </div>
                <ActionButtons order={order} />
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── DESKTOP: Table layout — hidden on mobile ── */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-1">
                  Order ID <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Cashier</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Date <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Amount <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer?.fullName || "-"}</TableCell>
                <TableCell>{order.cashierId || "-"}</TableCell>
                <TableCell>
                  {order.createdAt ? order.createdAt.slice(0, 10) : "-"}
                </TableCell>
                <TableCell>
                  {order.totalAmount ? `₹${order.totalAmount}` : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(order.paymentType)}{" "}
                    {order.paymentType || "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(order.status)}
                    variant="secondary"
                  >
                    {order.status || "COMPLETE"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ActionButtons order={order} />
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

export default OrdersTable;