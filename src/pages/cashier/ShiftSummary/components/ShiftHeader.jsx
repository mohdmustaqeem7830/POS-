// ShiftHeader.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { PrinterIcon, ArrowRightIcon } from 'lucide-react';

const ShiftHeader = ({ onPrintClick, onEndShiftClick }) => {
  return (
    <div className="p-3 sm:p-4 bg-card border-b">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Shift Summary</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrintClick}
            className="flex-1 sm:flex-none min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
          >
            <PrinterIcon className="h-4 w-4 sm:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Print Summary</span>
          </Button>
          <Button
            variant="destructive"
            onClick={onEndShiftClick}
            className="flex-1 sm:flex-none min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
          >
            <ArrowRightIcon className="h-4 w-4 sm:mr-2 flex-shrink-0" />
            <span className="sm:hidden">End Shift</span>
            <span className="hidden sm:inline">End Shift & Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShiftHeader;