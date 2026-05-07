import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Search, Filter, Calendar, Download, Plus, Edit, Trash2, CreditCard, DollarSign, User, Store } from "lucide-react";
import { 
  getStoreOverview, 
  getDailySales, 
  getSalesByPaymentMethod 
} from "@/Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks";
import { useToast } from "@/components/ui/use-toast";

export default function Sales() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { userProfile } = useSelector((state) => state.user);
  const { 
    storeOverview, 
    dailySales, 
    salesByPaymentMethod, 
    loading 
  } = useSelector((state) => state.storeAnalytics);


  useEffect(() => {
    if (userProfile?.id) {
      fetchSalesData();
    }
  }, [userProfile]);

  const fetchSalesData = async () => {
    try {
      await Promise.all([
        dispatch(getStoreOverview(userProfile.id)).unwrap(),
        dispatch(getDailySales(userProfile.id)).unwrap(),
        dispatch(getSalesByPaymentMethod(userProfile.id)).unwrap(),
      ]);
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch sales data",
        variant: "destructive",
      });
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Format percentage change
  const formatChange = (current, previous) => {
    if (!previous || previous === 0) return "+0%";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  // Prepare chart data
  const dailySalesData = dailySales?.map(item => ({
    date: new Date(item.date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sales: item.totalAmount
  })) || [];

  const paymentMethodData = salesByPaymentMethod?.map(item => ({
    name: item.paymentMethod,
    value: item.totalAmount
  })) || [];

  const salesConfig = {
    sales: {
      label: "Sales",
      color: "#10b981",
    },
  };

  const paymentConfig = {
    value: {
      label: "Amount",
      color: "#10b981",
    },
  };

  console.log("sales daily", dailySales)

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sales Management</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> New Sale
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Sales</p>
                <h3 className="text-lg sm:text-2xl font-bold mt-1">
                  {loading ? (
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    formatCurrency(storeOverview?.totalSales || 0)
                  )}
                </h3>
                <p className="text-xs text-emerald-500 mt-1">
                  {loading ? (
                    <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    formatChange(storeOverview?.totalSales, storeOverview?.previousPeriodSales)
                  )} from last week
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-emerald-100 rounded-full ml-2 flex-shrink-0">
                <DollarSign className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Orders Today</p>
                <h3 className="text-lg sm:text-2xl font-bold mt-1">
                  {loading ? (
                    <div className="h-6 sm:h-8 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    storeOverview?.todayOrders || 0
                  )}
                </h3>
                <p className="text-xs text-emerald-500 mt-1">
                  {loading ? (
                    <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    formatChange(storeOverview?.todayOrders, storeOverview?.yesterdayOrders)
                  )} from yesterday
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full ml-2 flex-shrink-0">
                <Store className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Active Cashiers</p>
                <h3 className="text-lg sm:text-2xl font-bold mt-1">
                  {loading ? (
                    <div className="h-6 sm:h-8 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    storeOverview?.activeCashiers || 0
                  )}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {loading ? (
                    <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    "Same as yesterday"
                  )}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full ml-2 flex-shrink-0">
                <User className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Avg. Order Value</p>
                <h3 className="text-lg sm:text-2xl font-bold mt-1">
                  {loading ? (
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    formatCurrency(storeOverview?.averageOrderValue || 0)
                  )}
                </h3>
                <p className="text-xs text-emerald-500 mt-1">
                  {loading ? (
                    <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    formatChange(storeOverview?.averageOrderValue, storeOverview?.previousPeriodAverageOrderValue)
                  )} from last week
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-full ml-2 flex-shrink-0">
                <CreditCard className="w-5 h-5 sm:w-8 sm:h-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Daily Sales (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {loading ? (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading chart data...</p>
                </div>
              </div>
            ) : dailySalesData.length > 0 ? (
              <ChartContainer config={salesConfig}>
                <ResponsiveContainer width="100%" height={240} className="sm:!h-[320px]">
                  <LineChart data={dailySalesData}>
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                      width={45}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          formatter={(value) => [formatCurrency(value), "Sales"]}
                        />
                      )}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="stroke-emerald-500"
                      activeDot={{ r: 8, fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                <p className="text-gray-500">No sales data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {loading ? (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading chart data...</p>
                </div>
              </div>
            ) : paymentMethodData.length > 0 ? (
              <ChartContainer config={paymentConfig}>
                <ResponsiveContainer width="100%" height={240} className="sm:!h-[320px]">
                  <BarChart data={paymentMethodData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                      width={45}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          formatter={(value) => [formatCurrency(value), "Amount"]}
                        />
                      )}
                    />
                    <Bar
                      dataKey="value"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-emerald-500"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                <p className="text-gray-500">No payment data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}