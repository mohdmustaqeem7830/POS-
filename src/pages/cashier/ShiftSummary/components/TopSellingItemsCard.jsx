// TopSellingItemsCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TopSellingItemsCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Top Selling Items</h2>
        <div className="space-y-2 sm:space-y-3">
          {shiftData.topSellingProducts?.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-1">
                  <span className="font-medium text-xs sm:text-sm truncate">{item.name}</span>
                  <span className="font-bold text-xs sm:text-sm flex-shrink-0">₹{item.sellingPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.quantity} units sold</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItemsCard;