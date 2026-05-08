// HeldOrdersDialog.jsx
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { resumeOrder, selectHeldOrders } from '../../../Redux Toolkit/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../components/ui/use-toast';

const HeldOrdersDialog = ({
  showHeldOrdersDialog,
  setShowHeldOrdersDialog,
}) => {
  const dispatch = useDispatch();
  const {toast} = useToast();
  
  const heldOrders = useSelector(selectHeldOrders);

  const handleResumeOrder = (order) => {
    dispatch(resumeOrder(order));
    setShowHeldOrdersDialog(false);
    toast({
      title: "Order Resumed",
      description: `Order #${order.id} has been resumed`,
    });
  };

  return (
    <Dialog open={showHeldOrdersDialog} onOpenChange={setShowHeldOrdersDialog}>
      <DialogContent className="w-[95vw] max-w-2xl rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Held Orders</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto pr-1">
          {heldOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Pause className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No held orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {heldOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">Order #{order.id}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {order.items.length} items • {new Date(order.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="min-h-[44px] px-3 sm:px-4 flex-shrink-0"
                        onClick={() => handleResumeOrder(order)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            className="w-full sm:w-auto min-h-[44px]"
            onClick={() => setShowHeldOrdersDialog(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeldOrdersDialog;