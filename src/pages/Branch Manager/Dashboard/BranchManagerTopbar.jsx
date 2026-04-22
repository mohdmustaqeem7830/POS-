import React from "react";
import { useSelector } from "react-redux";
import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function BranchManagerTopbar({ onMenuClick }) {
  const { userProfile } = useSelector((state) => state.user);
  const { branch } = useSelector((state) => state.branch);

  return (
    <header className="bg-background border-b px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">

      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base md:text-xl font-semibold text-foreground truncate">
            {branch ? branch.name : "Branch Dashboard"}
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">{userProfile?.name || "Branch Manager"}</p>
            <p className="text-xs text-muted-foreground">{userProfile?.email || "manager@example.com"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}