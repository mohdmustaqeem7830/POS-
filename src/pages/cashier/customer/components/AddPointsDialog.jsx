// AddPointsDialog.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddPointsDialog = ({ 
  isOpen, 
  onClose, 
  customer, 
  pointsToAdd, 
  onPointsChange, 
  onAddPoints 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Add Loyalty Points</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p><span className="font-medium">Customer:</span> {customer?.name}</p>
            <p><span className="font-medium">Current Points:</span> {customer?.loyaltyPoints}</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="points" className="text-sm font-medium">Points to Add</label>
            <Input
              id="points"
              type="number"
              min="1"
              value={pointsToAdd}
              onChange={(e) => onPointsChange(parseInt(e.target.value) || 0)}
              className="min-h-[44px] text-base"
            />
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto min-h-[44px]">Cancel</Button>
          <Button onClick={onAddPoints} className="w-full sm:w-auto min-h-[44px]">Add Points</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPointsDialog;