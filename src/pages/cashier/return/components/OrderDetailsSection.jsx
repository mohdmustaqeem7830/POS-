// OrderDetailsSection.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { formatDate } from '../../order/data';

const OrderDetailsSection = ({ selectedOrder, setSelectedOrder }) => (
  <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r p-3 sm:p-4 flex flex-col">
    <div className="mb-3 sm:mb-4">
      <Button
        variant="outline"
        size="sm"
        className="min-h-[44px]"
        onClick={() => setSelectedOrder(null)}
      >
        ← Back to Order Search
      </Button>
    </div>

    <Card className="mb-3 sm:mb-4">
      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
          <div className="min-w-0">
            <h2 className="font-semibold text-base sm:text-lg truncate">Order {selectedOrder.id}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{formatDate(selectedOrder.createdAt)}</p>
          </div>
          <Badge variant="outline" className="flex-shrink-0 text-xs">
            {selectedOrder.paymentType}
          </Badge>
        </div>

        <div className="mb-3 sm:mb-4">
          <h3 className="font-medium text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Customer</h3>
          <p className="text-sm sm:text-base">{selectedOrder?.customer?.fullName}</p>
          <p className="text-xs sm:text-sm">{selectedOrder.customer?.phone}</p>
        </div>

        <div>
          <h3 className="font-medium text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Order Summary</h3>
          <div className="text-xs sm:text-sm space-y-1">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Order Total:</span>
              <span>₹{selectedOrder.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="flex-1 overflow-auto">
      <h3 className="font-semibold mb-2 text-sm sm:text-base">Order Items</h3>

      {/* Mobile items list */}
      <div className="sm:hidden space-y-2">
        {selectedOrder.items.map(item => (
          <div key={item.id} className="border rounded-lg p-2 text-xs">
            <p className="font-medium truncate">{item.product?.name}</p>
            <div className="flex justify-between mt-1 text-muted-foreground">
              <span>Qty: {item.quantity}</span>
              <span>₹{item.product?.sellingPrice?.toFixed(2)} each</span>
              <span className="font-semibold text-foreground">
                ₹{(item.product?.sellingPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedOrder.items.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.product?.name}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">₹{item.product?.sellingPrice?.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{(item.product?.sellingPrice * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

export default OrderDetailsSection;