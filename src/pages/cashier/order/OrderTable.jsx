// OrderTable.jsx
import React from "react";
import { formatDate, getPaymentModeLabel, getStatusBadgeVariant } from "./data";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { EyeIcon, PrinterIcon, RotateCcwIcon } from "lucide-react";

const OrderTable = ({ orders, handleViewOrder, handlePrintInvoice, handleInitiateReturn }) => {
  return (
    <>
      {/* Mobile card list */}
      <div className="sm:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl p-3 bg-card shadow-sm">
            <div className="flex justify-between items-start gap-2 mb-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm">#{order.id}</p>
                <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {order.customer?.fullName || "Walk-in Customer"}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm">₹{order.totalAmount?.toFixed(2) || "0.00"}</p>
                <Badge
                  variant={getStatusBadgeVariant(order.status)}
                  className="capitalize text-xs mt-1"
                >
                  {order.status || "COMPLETE"}
                </Badge>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Payment: {order.paymentType}
            </div>
            <div className="flex gap-2 border-t pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px] text-xs"
                onClick={() => handleViewOrder(order)}
              >
                <EyeIcon className="h-3 w-3 mr-1" /> View
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px] text-xs"
                onClick={() => handlePrintInvoice(order)}
              >
                <PrinterIcon className="h-3 w-3 mr-1" /> Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px] text-xs"
                onClick={() => handleInitiateReturn(order)}
              >
                <RotateCcwIcon className="h-3 w-3 mr-1" /> Return
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.customer?.fullName || "Walk-in Customer"}</TableCell>
                <TableCell>₹{order.totalAmount?.toFixed(2) || "0.00"}</TableCell>
                <TableCell>{order.paymentType}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                    {order.status || "COMPLETE"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handlePrintInvoice(order)}>
                      <PrinterIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleInitiateReturn(order)}>
                      <RotateCcwIcon className="h-4 w-4" />
                    </Button>
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

export default OrderTable;