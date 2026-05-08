import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useToast } from "@/components/ui/use-toast";

import {
  ShoppingBag,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

// Import components
import POSHeader from "./components/POSHeader";
import ProductSection from "./product/ProductSection";
import CartSection from "./cart/CartSection";
import CustomerPaymentSection from "./payment/CustomerPaymentSection";

import PaymentDialog from "./payment/PaymentDialog";
import ReceiptDialog from "./components/ReceiptDialog";
import HeldOrdersDialog from "./components/HeldOrdersDialog";
import CustomerDialog from "./customer/CustomerDialog";
import InvoiceDialog from "./order/OrderDetails/InvoiceDialog";

const MobileBottomNav = ({ mobileTab, setMobileTab }) => {
  const navItems = [
    {
      key: "products",
      label: "Products",
      icon: <ShoppingBag size={20} />,
    },
    {
      key: "cart",
      label: "Cart",
      icon: <ShoppingCart size={20} />,
    },
    {
      key: "checkout",
      label: "Checkout",
      icon: <CreditCard size={20} />,
    },
  ];

  return (
    <div className="lg:hidden sticky bottom-0 z-50 border-t bg-background safe-area-pb">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const active = mobileTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setMobileTab(item.key)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}

              <span className="text-xs font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CreateOrderPage = () => {
  const { toast } = useToast();

  const searchInputRef = useRef(null);

  const { error: orderError } = useSelector((state) => state.order);

  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [showReceiptDialog, setShowReceiptDialog] = useState(false);

  const [showHeldOrdersDialog, setShowHeldOrdersDialog] = useState(false);

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState("products");

  useEffect(() => {
    if (orderError) {
      toast({
        title: "Order Error",
        description: orderError,
        variant: "destructive",
      });
    }
  }, [orderError, toast]);

  // Focus on search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <POSHeader />

      {/* ============================= */}
      {/* Desktop Layout */}
      {/* ============================= */}

      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* Left Column - Product Search & List */}
        <ProductSection searchInputRef={searchInputRef} />

        {/* Middle Column - Cart */}
        <CartSection
          setShowHeldOrdersDialog={setShowHeldOrdersDialog}
        />

        {/* Right Column - Customer & Payment */}
        <CustomerPaymentSection
          setShowCustomerDialog={setShowCustomerDialog}
          setShowPaymentDialog={setShowPaymentDialog}
        />
      </div>

      {/* ============================= */}
      {/* Mobile / Tablet Layout */}
      {/* ============================= */}

      <div className="flex lg:hidden flex-1 flex-col overflow-hidden">
        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden">
          {mobileTab === "products" && (
            <div className="h-full overflow-hidden">
              <ProductSection searchInputRef={searchInputRef} />
            </div>
          )}

          {mobileTab === "cart" && (
            <div className="h-full overflow-hidden">
              <CartSection
                setShowHeldOrdersDialog={
                  setShowHeldOrdersDialog
                }
              />
            </div>
          )}

          {mobileTab === "checkout" && (
            <div className="h-full overflow-hidden">
              <CustomerPaymentSection
                setShowCustomerDialog={
                  setShowCustomerDialog
                }
                setShowPaymentDialog={
                  setShowPaymentDialog
                }
              />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <MobileBottomNav
          mobileTab={mobileTab}
          setMobileTab={setMobileTab}
        />
      </div>

      {/* ============================= */}
      {/* Dialogs */}
      {/* ============================= */}

      <CustomerDialog
        showCustomerDialog={showCustomerDialog}
        setShowCustomerDialog={setShowCustomerDialog}
      />

      <PaymentDialog
        showPaymentDialog={showPaymentDialog}
        setShowPaymentDialog={setShowPaymentDialog}
        setShowReceiptDialog={setShowReceiptDialog}
      />

      {/* <ReceiptDialog
        showReceiptDialog={showReceiptDialog}
        setShowReceiptDialog={setShowReceiptDialog}
      /> */}

      <InvoiceDialog
        showInvoiceDialog={showReceiptDialog}
        setShowInvoiceDialog={setShowReceiptDialog}
      />

      <HeldOrdersDialog
        showHeldOrdersDialog={showHeldOrdersDialog}
        setShowHeldOrdersDialog={setShowHeldOrdersDialog}
      />
    </div>
  );
};

export default CreateOrderPage;