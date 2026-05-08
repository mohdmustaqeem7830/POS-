// OrderDetails/CustomerInformation.jsx
import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'

const CustomerInformation = ({ selectedOrder }) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">Customer Information</h3>
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Name:</span>
            <span className="text-right truncate">{selectedOrder.customer?.fullName || "Walk-in Customer"}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Phone:</span>
            <span className="text-right">{selectedOrder.customer?.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Email:</span>
            <span className="text-right truncate">{selectedOrder.customer?.email || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerInformation;