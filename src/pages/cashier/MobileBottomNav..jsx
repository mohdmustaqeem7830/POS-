import React from "react";
import { ShoppingCart, Package, CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../Redux Toolkit/features/cart/cartSlice";

const MobileBottomNav = ({ mobileTab, setMobileTab }) => {
  const cartItems = useSelector(selectCartItems);

  const tabs = [
    {
      key: "products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      key: "cart",
      label: "Cart",
      icon: <ShoppingCart className="w-5 h-5" />,
      badge: cartItems.length,
    },
    {
      key: "checkout",
      label: "Checkout",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex border-t bg-card h-16 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
            mobileTab === tab.key
              ? "text-green-600 bg-green-50 dark:bg-green-950"
              : "text-muted-foreground"
          }`}
          onClick={() => setMobileTab(tab.key)}
        >
          <div className="relative">
            {tab.icon}
            {tab.badge > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {tab.badge > 9 ? "9+" : tab.badge}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileBottomNav;