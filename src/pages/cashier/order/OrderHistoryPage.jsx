// OrderHistoryPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  SearchIcon,
  PrinterIcon,
  EyeIcon,
  RotateCcwIcon,
  CalendarIcon,
  Loader2,
  RefreshCw,
  Download,
} from "lucide-react";
import { getOrdersByCashier } from "@/Redux Toolkit/features/order/orderThunks";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderTable from "./OrderTable";
import { handleDownloadOrderPDF } from "./pdf/pdfUtils";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { userProfile } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" });
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(getOrdersByCashier(userProfile.id));
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [error, toast]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsDialog(true);
  };

  const handlePrintInvoice = (order) => {
    toast({ title: "Printing Invoice", description: `Printing invoice for order ${order.id}` });
  };

  const handleInitiateReturn = (order) => {
    toast({ title: "Initiating Return", description: `Navigating to returns page for order ${order.id}` });
  };

  const handleDownloadPDF = async () => {
    await handleDownloadOrderPDF(selectedOrder, toast);
  };

  const handleRefreshOrders = () => {
    if (userProfile?.id) {
      dispatch(getOrdersByCashier(userProfile.id));
      toast({ title: "Refreshing Orders", description: "Orders are being refreshed..." });
    }
  };

  const dateFilters = [
    { key: "today", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "custom", label: "Custom", icon: <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" /> },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 bg-card border-b flex justify-between items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Order History</h1>
        <Button
          variant="outline"
          onClick={handleRefreshOrders}
          disabled={loading}
          className="min-h-[44px] px-3 sm:px-4"
        >
          <RefreshCw className={`h-4 w-4 sm:mr-2 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="p-3 sm:p-4 border-b space-y-3">
        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by order ID or customer..."
            className="pl-9 sm:pl-10 min-h-[44px] text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date filter buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {dateFilters.map(({ key, label, icon }) => (
            <Button
              key={key}
              variant={dateFilter === key ? "default" : "outline"}
              onClick={() => setDateFilter(key)}
              className="min-h-[44px] flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 flex items-center gap-1"
            >
              {icon && icon}
              {label}
            </Button>
          ))}
        </div>

        {/* Custom date range */}
        {dateFilter === "custom" && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
            <div className="flex-1">
              <Label htmlFor="start-date" className="text-xs sm:text-sm">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={customDateRange.start}
                onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                className="min-h-[44px] mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end-date" className="text-xs sm:text-sm">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={customDateRange.end}
                onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                className="min-h-[44px] mt-1"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setCustomDateRange({ start: "", end: "" })}
              className="min-h-[44px] w-full sm:w-auto"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Orders list */}
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Loader2 className="animate-spin h-16 w-16 text-primary" />
            <p className="mt-4">Loading orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <OrderTable
            orders={orders}
            handleInitiateReturn={handleInitiateReturn}
            handlePrintInvoice={handlePrintInvoice}
            handleViewOrder={handleViewOrder}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <SearchIcon size={48} strokeWidth={1} />
            <p className="mt-4">No orders found</p>
            <p className="text-sm">Try adjusting your search or date filters</p>
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetailsDialog} onOpenChange={setShowOrderDetailsDialog}>
        {selectedOrder && (
          <DialogContent className="w-[95vw] max-w-3xl rounded-xl sm:rounded-lg mx-auto max-h-[90dvh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Order Details - Invoice</DialogTitle>
            </DialogHeader>
            <OrderDetails selectedOrder={selectedOrder} />
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-3">
              <Button variant="outline" onClick={handleDownloadPDF} className="w-full sm:w-auto min-h-[44px]">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={() => handlePrintInvoice(selectedOrder)} className="w-full sm:w-auto min-h-[44px]">
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default OrderHistoryPage;