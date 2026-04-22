import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderItemTable from "../../common/Order/OrderItemTable";

const OrderDetailsDialog = ({
  open,
  onOpenChange,
  selectedOrder,
  getStatusColor,
  getPaymentIcon,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {selectedOrder && (
          <div className="space-y-4">

            {/* Order Summary + Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Order Info */}
              <div className="space-y-1">
                <p className="font-semibold mb-1">Order Info</p>
                <div>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {selectedOrder.createdAt
                    ? selectedOrder.createdAt.slice(0, 10)
                    : "-"}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>Status:</strong>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <strong>Payment:</strong>
                  <span className="inline-flex items-center gap-1">
                    {getPaymentIcon(selectedOrder.paymentType)}{" "}
                    {selectedOrder.paymentType || "-"}
                  </span>
                </div>
                <div>
                  <strong>Amount:</strong>{" "}
                  {selectedOrder.totalAmount
                    ? `₹${selectedOrder.totalAmount}`
                    : "-"}
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-1">
                <p className="font-semibold mb-1">Customer Details</p>
                <div>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.customer?.name ||
                    selectedOrder.customer?.fullName ||
                    "-"}
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  {selectedOrder.customer?.phone || "-"}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <span className="break-all">
                    {selectedOrder.customer?.email || "-"}
                  </span>
                </div>
                <div>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.customer?.address || "-"}
                </div>
              </div>
            </div>

            {/* Cashier Details */}
            <div>
              <p className="font-semibold mb-1">Cashier Details</p>
              <div>
                <strong>Name:</strong>{" "}
                {selectedOrder.cashier?.name ||
                  selectedOrder.cashier?.fullName ||
                  selectedOrder.cashierId ||
                  "-"}
              </div>
              <div>
                <strong>ID:</strong>{" "}
                {selectedOrder.cashier?.id ||
                  selectedOrder.cashierId ||
                  "-"}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <p className="font-semibold mb-1">Order Items</p>
              <div className="overflow-x-auto">
                <OrderItemTable selectedOrder={selectedOrder} />
              </div>
            </div>

            <DialogClose asChild>
              <Button className="mt-2 w-full" variant="outline">
                Close
              </Button>
            </DialogClose>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;