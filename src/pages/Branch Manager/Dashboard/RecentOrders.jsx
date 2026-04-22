import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getRecentOrdersByBranch } from "@/Redux Toolkit/features/order/orderThunks";
import { getStatusColor } from "../../../utils/getStatusColor";
import { formatDateTime } from "../../../utils/formateDate";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { recentOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (branchId) {
      dispatch(getRecentOrdersByBranch(branchId));
    }
  }, [branchId, dispatch]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400 text-sm">Loading orders...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6">

        {/* ── MOBILE: Card layout — hidden on md+ ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {(recentOrders || []).length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">No recent orders</div>
          ) : (
            (recentOrders || []).map((order) => (
              <Card key={order.id} className="border border-gray-100 shadow-none">
                <CardContent className="p-3 space-y-2">

                  {/* Order ID + Status */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">#{order.id}</p>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>

                  {/* Customer */}
                  <div className="text-sm text-gray-600">
                    <span>{order.customer?.fullName || order.customerName || "-"}</span>
                  </div>

                  {/* Amount + Time */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-base">
                      {order.amount
                        ? `₹${order.amount}`
                        : order.totalAmount
                        ? `₹${order.totalAmount}`
                        : "-"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </div>

                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* ── DESKTOP: Table layout — hidden on mobile ── */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(recentOrders || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    No recent orders
                  </TableCell>
                </TableRow>
              ) : (
                (recentOrders || []).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer?.fullName || order.customerName || "-"}</TableCell>
                    <TableCell>
                      {order.amount
                        ? `₹${order.amount}`
                        : order.totalAmount
                        ? `₹${order.totalAmount}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatDateTime(order.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      </CardContent>
    </Card>
  );
};

export default RecentOrders;