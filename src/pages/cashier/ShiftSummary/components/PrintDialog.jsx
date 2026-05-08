// PrintDialog.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PrinterIcon } from 'lucide-react';

const PrintDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Print Shift Summary</DialogTitle>
        </DialogHeader>
        <div className="py-3 sm:py-4">
          <p className="text-sm sm:text-base">Do you want to print your shift summary report?</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto min-h-[44px]">Cancel</Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto min-h-[44px]">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print Summary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintDialog;