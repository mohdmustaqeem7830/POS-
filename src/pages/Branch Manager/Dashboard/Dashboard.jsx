import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalesChart from "./SalesChart";
import TopProducts from "./TopProducts";
import CashierPerformance from "./CashierPerformance";
import RecentOrders from "./RecentOrders";
import { getTodayOverview, getPaymentBreakdown } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";
import PaymentBreakdown from "./PaymentBreakdown";
import TodayOverview from "./TodayOverview";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);
  const branchId = branch?.id;

  useEffect(() => {
    if (branchId) {
      dispatch(getTodayOverview(branchId));
      const today = new Date().toISOString().slice(0, 10);
      dispatch(getPaymentBreakdown({ branchId, date: today }));
    }
  }, [branchId, dispatch]);

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Branch Dashboard</h1>
        <p className="text-gray-500 text-sm md:text-base">{branch?.name || "Loading branch..."}</p>
      </div>
      <TodayOverview />
      <PaymentBreakdown />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <SalesChart />
        <TopProducts />
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <CashierPerformance />
        <RecentOrders />
      </div>
    </div>
  );
}