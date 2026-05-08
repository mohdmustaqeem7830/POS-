// ShiftInformationCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '../../../../utils/formateDate';

const ShiftInformationCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Shift Information</h2>
        <div className="space-y-2">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm">Cashier:</span>
            <span className="font-medium text-sm text-right truncate">{shiftData.cashier.fullName}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm flex-shrink-0">Shift Start:</span>
            <span className="text-sm text-right">{formatDateTime(shiftData.shiftStart)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm flex-shrink-0">Shift End:</span>
            <span className="text-sm text-right">{shiftData.shiftEnd ? shiftData.shiftEnd : "ongoing"}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm">Duration:</span>
            <span className="text-sm">8 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftInformationCard;