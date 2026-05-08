// ReturnReceiptDialog.jsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";

const ReturnReceiptDialog = ({
  showReceiptDialog,
  setShowReceiptDialog,
  selectedOrder,
}) => (
  <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
    <DialogContent className="w-[95vw] max-w-lg rounded-xl sm:rounded-lg mx-auto">
      <DialogHeader>
        <DialogTitle className="text-base sm:text-lg">Return Receipt</DialogTitle>
      </DialogHeader>

      <div className="bg-white p-3 sm:p-6 max-h-[60vh] sm:max-h-96 overflow-y-auto">
        {/* Store header */}
        <div className="text-center mb-3 sm:mb-4">
          <h3 className="font-bold text-base sm:text-lg">POS SYSTEM</h3>
          <p className="text-xs sm:text-sm">123 Main Street, City</p>
          <p className="text-xs sm:text-sm">Tel: 123-456-7890</p>
        </div>

        <div className="text-center mb-3 sm:mb-4">
          <h4 className="font-bold text-sm sm:text-base">RETURN RECEIPT</h4>
        </div>

        {/* Receipt meta */}
        <div className="mb-3 sm:mb-4 space-y-1">
          <p className="text-xs sm:text-sm">
            <span className="font-medium">Return #:</span> RTN-{Date.now().toString().substring(8)}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-medium">Original Order:</span> {selectedOrder?.id}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-medium">Date:</span> {new Date().toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-medium">Customer:</span> {selectedOrder?.customer.fullName}
          </p>
        </div>

        {/* Mobile items list */}
        <div className="sm:hidden space-y-2 mb-3">
          {selectedOrder.items.map((item) => (
            <div key={item.id} className="border rounded p-2 text-xs">
              <p className="font-medium truncate">{item.product?.name.slice(0, 20) + "..."}</p>
              <div className="flex justify-between mt-1 text-muted-foreground">
                <span>Qty: {item.returnQuantity}</span>
                <span>₹{item.product?.sellingPrice?.toFixed(2)}</span>
                <span className="font-semibold text-foreground">
                  ₹{(item.product.sellingPrice * item.returnQuantity)?.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block mb-4">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left py-2">Item</TableHead>
                <TableHead className="text-center py-2">Qty</TableHead>
                <TableHead className="text-right py-2">Price</TableHead>
                <TableHead className="text-right py-2">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrder.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-2">{item.product?.name.slice(0, 20) + "..."}</TableCell>
                  <TableCell className="text-center py-2">{item.returnQuantity}</TableCell>
                  <TableCell className="text-right py-2">₹{item.product?.sellingPrice?.toFixed(2)}</TableCell>
                  <TableCell className="text-right py-2">
                    ₹{(item.product.sellingPrice * item.returnQuantity)?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="space-y-1 text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Total Refund</span>
            <span>₹{selectedOrder.totalAmount}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span>Refund Method</span>
            <span>{selectedOrder.paymentType}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span>Return Reason</span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm mt-4 sm:mt-6">
          <p>Thank you for shopping with us!</p>
          <p className="text-xs mt-1">
            Return Policy: Items can be returned within 7 days of purchase with receipt
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" className="gap-2 w-full sm:w-auto min-h-[44px]">
          <PrinterIcon className="h-4 w-4" />
          Print & Complete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ReturnReceiptDialog;