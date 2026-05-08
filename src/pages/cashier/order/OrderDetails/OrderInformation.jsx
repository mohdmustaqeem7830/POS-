// OrderDetails/OrderInformation.jsx
import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'
import { formatDate, getPaymentModeLabel, getStatusBadgeVariant } from '../data'
import { Badge } from '../../../../components/ui/badge'

const OrderInformation = ({ selectedOrder }) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">Order Information</h3>
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Date:</span>
            <span className="text-right">{formatDate(selectedOrder.createdAt)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Payment Method:</span>
            <span className="text-right">{getPaymentModeLabel(selectedOrder.paymentType)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Total Amount:</span>
            <span className="font-semibold text-right">₹{selectedOrder.totalAmount?.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderInformation;