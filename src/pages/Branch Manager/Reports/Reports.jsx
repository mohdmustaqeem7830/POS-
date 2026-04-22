import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  FileText,
  BarChart2,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart as RPieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  getDailySalesChart,
  getPaymentBreakdown,
  getCategoryWiseSalesBreakdown,
  getTopCashiersByRevenue,
} from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Reports = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { dailySales, paymentBreakdown, categorySales, topCashiers } =
    useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getDailySalesChart({ branchId }));
      const today = new Date().toISOString().slice(0, 10);
      dispatch(getPaymentBreakdown({ branchId, date: today }));
      dispatch(getCategoryWiseSalesBreakdown({ branchId, date: today }));
      dispatch(getTopCashiersByRevenue(branchId));
    }
  }, [branchId, dispatch]);

  const salesData =
    dailySales?.map((item) => ({
      date: item.date,
      sales: item.totalSales,
    })) || [];

  const paymentData =
    paymentBreakdown?.map((item) => ({
      name: item.type,
      value: item.percentage,
    })) || [];

  const paymentConfig =
    paymentBreakdown?.reduce((acc, item, idx) => {
      acc[item.type] = {
        label: item.type,
        color: COLORS[idx % COLORS.length],
      };
      return acc;
    }, {}) || {};

  const categoryData =
    categorySales?.map((item) => ({
      name: item.categoryName,
      value: item.totalSales,
    })) || [];

  const categoryConfig =
    categorySales?.reduce((acc, item, idx) => {
      acc[item.categoryName] = {
        label: item.categoryName,
        color: COLORS[idx % COLORS.length],
      };
      return acc;
    }, {}) || {};

  const cashierData =
    topCashiers?.map((item) => ({
      name: item.cashierName,
      sales: item.totalRevenue,
    })) || [];

  const cashierConfig = {
    sales: { label: "Sales", color: "#4f46e5" },
  };

  const salesConfig = {
    sales: { label: "Sales", color: "#4f46e5" },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = (type, format) => {
    console.log(`Exporting ${type} report in ${format} format`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export All
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="overview" className="space-y-6">

        {/* TabsList — scrollable on mobile */}
        <TabsList className="flex w-full overflow-x-auto h-auto flex-nowrap gap-1 sm:inline-flex sm:w-auto">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Sales</span>
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm"
          >
            <FileText className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger
            value="cashier"
            className="flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm"
          >
            <Users className="h-4 w-4" />
            <span className="hidden xs:inline">Cashier Performance</span>
            <span className="xs:hidden">Cashier</span>
          </TabsTrigger>
        </TabsList>

        {/* ── Overview Tab ── */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Daily Sales Trend */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base sm:text-lg">
                    Daily Sales Trend
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleExport("sales", "excel")}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={salesConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
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
                        width={55}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            formatter={(value) => [`₹${value}`, "Sales"]}
                          />
                        )}
                      />
                      <Bar
                        dataKey="sales"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base sm:text-lg">
                    Payment Methods
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleExport("payments", "excel")}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={paymentConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <RPieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            formatter={(value) => [`${value}%`, "Percentage"]}
                          />
                        )}
                      />
                      <ChartLegend
                        content={({ payload }) => (
                          <ChartLegendContent payload={payload} />
                        )}
                      />
                    </RPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

        {/* ── Sales Tab ── */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base sm:text-lg">
                  Sales Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleExport("sales", "excel")}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={salesConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
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
                      width={55}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          formatter={(value) => [`₹${value}`, "Sales"]}
                        />
                      )}
                    />
                    <Bar
                      dataKey="sales"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Products Tab ── */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base sm:text-lg">
                  Product Category Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleExport("products", "excel")}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Pie Chart */}
                <ChartContainer config={categoryConfig}>
                  <ResponsiveContainer width="100%" height={280}>
                    <RPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            formatter={(value) => [
                              `${value}%`,
                              "Sales Percentage",
                            ]}
                          />
                        )}
                      />
                      <ChartLegend
                        content={({ payload }) => (
                          <ChartLegendContent payload={payload} />
                        )}
                      />
                    </RPieChart>
                  </ResponsiveContainer>
                </ChartContainer>

                {/* Category Cards */}
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {category.name}
                          </p>
                          <p className="text-xl sm:text-2xl font-bold">
                            {formatCurrency(category.value)}
                          </p>
                        </div>
                        <div
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Cashier Performance Tab ── */}
        <TabsContent value="cashier">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base sm:text-lg">
                  Cashier Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleExport("cashier", "excel")}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={cashierConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={cashierData}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          formatter={(value) => [
                            `₹${value.toLocaleString("en-IN")}`,
                            "Sales",
                          ]}
                        />
                      )}
                    />
                    <Bar
                      dataKey="sales"
                      fill="currentColor"
                      radius={[0, 4, 4, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Reports;