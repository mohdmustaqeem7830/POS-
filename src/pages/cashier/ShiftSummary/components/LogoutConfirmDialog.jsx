// LogoutConfirmDialog.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const LogoutConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">End Shift & Logout</DialogTitle>
        </DialogHeader>
        <div className="py-3 sm:py-4">
          <p className="text-sm sm:text-base">Are you sure you want to end your shift and logout?</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">This will generate your shift summary report.</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto min-h-[44px]">Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} className="w-full sm:w-auto min-h-[44px]">
            End Shift & Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmDialog;