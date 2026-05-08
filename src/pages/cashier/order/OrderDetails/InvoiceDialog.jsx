// OrderDetails/InvoiceDialog.jsx
import React from "react";
import { handleDownloadOrderPDF } from "../pdf/pdfUtils";
import { useToast } from "../../../../components/ui/use-toast";
import {
  Dialog, DialogContent, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, PrinterIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "./OrderDetails";
import { resetOrder } from "../../../../Redux Toolkit/features/cart/cartSlice";

const InvoiceDialog = ({ showInvoiceDialog, setShowInvoiceDialog }) => {
  let { selectedOrder } = useSelector((state) => state.order);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handlePrintInvoice = () => {
    console.log("print invoice...");
  };

  const handleDownloadPDF = async () => {
    await handleDownloadOrderPDF(selectedOrder, toast);
  };

  const finishOrder = () => {
    setShowInvoiceDialog(false);
    dispatch(resetOrder());
    toast({
      title: "Order Completed",
      description: "Receipt printed and order saved successfully",
    });
  };

  return (
    <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
      {selectedOrder && (
        <DialogContent className="w-[95vw] max-w-5xl rounded-xl sm:rounded-lg mx-auto max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Order Details - Invoice</DialogTitle>
          </DialogHeader>
          <OrderDetails selectedOrder={selectedOrder} />
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-3">
            <Button variant="outline" onClick={handleDownloadPDF} className="w-full sm:w-auto min-h-[44px]">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={() => handlePrintInvoice(selectedOrder)} className="w-full sm:w-auto min-h-[44px]">
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
            <Button onClick={finishOrder} className="w-full sm:w-auto min-h-[44px]">
              Start New Order
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default InvoiceDialog;