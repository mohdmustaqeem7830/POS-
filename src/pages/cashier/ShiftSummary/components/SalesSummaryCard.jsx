// SalesSummaryCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SalesSummaryCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Sales Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm">Total Orders:</span>
            <span className="font-medium text-sm">{shiftData.totalOrders}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm">Total Sales:</span>
            <span className="font-medium text-sm">₹{shiftData.totalSales?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-2 text-destructive">
            <span className="text-sm">Total Refunds:</span>
            <span className="text-sm">-₹{shiftData.totalRefunds?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t gap-2">
            <span className="text-sm sm:text-base">Net Sales:</span>
            <span className="text-sm sm:text-base">₹{shiftData.netSales?.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesSummaryCard;