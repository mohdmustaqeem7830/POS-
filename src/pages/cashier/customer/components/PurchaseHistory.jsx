// PurchaseHistory.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShoppingBagIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import { formatDate, getStatusColor } from '../../order/data';

const PurchaseHistory = ({ orders, loading = false }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
        <Loader2 className="animate-spin h-8 w-8 mb-4" />
        <p>Loading purchase history...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
        <ShoppingBagIcon size={48} strokeWidth={1} />
        <p className="mt-4">No purchase history found</p>
        <p className="text-sm">This customer hasn't made any orders yet</p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 border-t">
      <Card>
        <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ShoppingBagIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Order #{order.id}</h3>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                      <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 justify-end">
                      <DollarSignIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="font-bold text-sm sm:text-base">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                    {order.status && (
                      <Badge className={`${getStatusColor(order.status)} text-xs`}>
                        {order.status}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {order.paymentMethod && (
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Payment: {order.paymentMethod}
                  </div>
                )}
                
                {order.items && order.items.length > 0 && (
                  <div className="border-t pt-2 sm:pt-3">
                    <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-xs sm:text-sm">
                          <span className="truncate mr-2">{item.product.name || item.productName || 'Unknown Product'}</span>
                          <span className="text-muted-foreground flex-shrink-0">
                            {item.quantity || 1} × ₹{(item.price || 0).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseHistory;