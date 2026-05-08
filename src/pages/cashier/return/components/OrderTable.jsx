// OrderTable.jsx (Returns page)
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { SearchIcon } from "lucide-react";
import { formatDate } from "../../order/data";
import { useSelector } from "react-redux";

const OrderTable = ({ handleSelectOrder }) => {
  const { orders, loading, error } = useSelector((state) => state.order);

  return (
    <div className="w-full p-3 sm:p-4 flex flex-col">
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <span>Loading orders...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
            <span>{error}</span>
          </div>
        ) : orders.length > 0 ? (
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
                      <p className="font-bold text-sm">₹{order.totalAmount?.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{order.paymentType}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full min-h-[44px] text-sm mt-1"
                    onClick={() => handleSelectOrder(order)}
                  >
                    Select for Return
                  </Button>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{order.customer?.fullName}</TableCell>
                      <TableCell>₹{order.totalAmount?.toFixed(2)}</TableCell>
                      <TableCell>{order.paymentType}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleSelectOrder(order)}>
                          Select for Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <SearchIcon size={48} strokeWidth={1} />
            <p className="mt-4">No orders found</p>
            <p className="text-sm">Try searching by order ID or customer name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;