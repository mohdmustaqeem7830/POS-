// RecentOrdersCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatTime } from '../../../../utils/formateDate';
import { getPaymentIcon } from '../../../../utils/getPaymentIcon';
import { getPaymentMethodLabel } from '../../../../utils/paymentMethodLable';

const RecentOrdersCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Recent Orders</h2>

        {/* Mobile card list */}
        <div className="sm:hidden space-y-2">
          {shiftData.recentOrders?.map(order => (
            <div key={order.id} className="border rounded-lg p-2 text-xs">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold">#{order.id}</p>
                  <p className="text-muted-foreground">{formatTime(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{order.totalAmount?.toFixed(2)}</p>
                  <div className="flex items-center gap-1 justify-end text-muted-foreground mt-0.5">
                    {order.paymentType ? (
                      <>
                        {getPaymentIcon(order.paymentType)}
                        <span>{order.paymentType}</span>
                      </>
                    ) : "UNKNOWN"}
                  </div>
                </div>
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
                <TableHead>Time</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftData.recentOrders?.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatTime(order.createdAt)}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    {order.paymentType ? (
                      <>
                        {getPaymentIcon(order.paymentType)}
                        <span>{order.paymentType}</span>
                      </>
                    ) : "UNKNOWN"}
                  </TableCell>
                  <TableCell className="text-right">₹{order.totalAmount?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersCard;