import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getBranchById } from "@/Redux Toolkit/features/branch/branchThunks";
import BranchManagerSidebar from "./BranchManagerSidebar";
import BranchManagerTopbar from "./BranchManagerTopbar";

export default function BranchManagerDashboard({ children }) {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt") && userProfile?.branchId) {
      dispatch(getBranchById({ id: userProfile.branchId, jwt: localStorage.getItem("jwt") }));
    }
  }, [dispatch, userProfile]);

  const handleMenuClick = () => {
    console.log("Menu clicked! sidebarOpen:", !sidebarOpen); // debug
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <BranchManagerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <BranchManagerTopbar onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background/80 rounded-tl-3xl shadow-xl m-2 md:m-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}