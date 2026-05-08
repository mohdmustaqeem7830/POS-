// POSHeader.jsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useSidebar } from "../../../context/hooks/useSidebar";

const POSHeader = () => {
  const { setSidebarOpen } = useSidebar();

  return (
    <div className="bg-card border-b px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2">
        {/* Hamburger */}
        <div className="flex-shrink-0">
          <Button
            className="z-10 p-2 rounded shadow-lg border border-border min-h-[44px] min-w-[44px]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>

        {/* Title */}
        <div className="text-center flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground leading-tight">POS Terminal</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Create new order</p>
        </div>

        {/* Keyboard shortcuts badge — hidden on mobile */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <Badge variant="outline" className="text-xs">
            F1: Search | F2: Discount | F3: Customer | Ctrl+Enter: Payment
          </Badge>
        </div>

        {/* Mobile: empty spacer to balance hamburger */}
        <div className="w-[44px] md:hidden flex-shrink-0" />
      </div>
    </div>
  );
};

export default POSHeader;