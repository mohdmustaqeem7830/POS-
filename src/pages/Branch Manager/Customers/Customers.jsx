import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, ShoppingBag, Phone, Mail, User, Calendar } from "lucide-react";
import { getStatusColor } from "../../../utils/getStatusColor";
import { calculateCustomerStats } from "../../cashier/customer/utils/customerUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../../../Redux Toolkit/features/customer/customerThunks";
import { clearCustomerOrders } from "../../../Redux Toolkit/features/order/orderSlice";
import { getOrdersByCustomer } from "../../../Redux Toolkit/features/order/orderThunks";

const Customers = () => {
  const sampleOrderHistory = [
    {
      id: "ORD-7891",
      date: "2023-08-10",
      amount: "₹1,250",
      items: 5,
      status: "Completed",
      paymentMode: "UPI",
    },
    {
      id: "ORD-7650",
      date: "2023-07-25",
      amount: "₹850",
      items: 3,
      status: "Completed",
      paymentMode: "Cash",
    },
    {
      id: "ORD-7432",
      date: "2023-07-12",
      amount: "₹1,500",
      items: 6,
      status: "Completed",
      paymentMode: "Card",
    },
    {
      id: "ORD-7290",
      date: "2023-06-30",
      amount: "₹720",
      items: 2,
      status: "Completed",
      paymentMode: "UPI",
    },
  ];

  const { customerOrders } = useSelector((state) => state.order);
  const { customers } = useSelector((state) => state.customer);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderHistory, setOrderHistory] = useState(sampleOrderHistory);
  const dispatch = useDispatch();

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm) ||
      customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getLoyaltyStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "gold":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
      case "silver":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
      case "bronze":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
    dispatch(clearCustomerOrders());
    if (customer.id) {
      dispatch(getOrdersByCustomer(customer.id));
    }
  };

  const customerStats = selectedCustomer
    ? calculateCustomerStats(customerOrders)
    : null;

  const displayCustomer = selectedCustomer
    ? { ...selectedCustomer, ...customerStats }
    : null;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Customer Overview
        </h1>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-500">
                Total Customers
              </h3>
              <p className="text-3xl font-bold mt-2">{customers.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-500">
                Gold Members
              </h3>
              <p className="text-3xl font-bold mt-2 text-primary">
                {customers.filter((c) => c.loyaltyStatus === "Gold").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-500">
                Avg. Orders per Customer
              </h3>
              <p className="text-3xl font-bold mt-2 text-blue-600">
                {Math.round(
                  customers.reduce((sum, c) => sum + c.totalOrders, 0) /
                    customers.length
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Customer List</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">

          {/* ── MOBILE: Card layout — hidden on md+ ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-base">
                        {customer.fullName}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCustomerDetails(customer)}
                      >
                        View
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      {customer.email}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">
                No customers found matching your criteria
              </p>
            )}
          </div>

          {/* ── DESKTOP: Table layout — hidden on mobile ── */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.fullName}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{customer.phone}</span>
                          <span className="text-xs text-gray-500">
                            {customer.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCustomerDetails(customer)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-4 text-gray-500"
                    >
                      No customers found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog
          open={isCustomerDetailsOpen}
          onOpenChange={setIsCustomerDetailsOpen}
        >
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-5">
              {/* Profile Section */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-semibold">
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">

                    {/* Row 1: Name + Email */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-gray-500">
                            {displayCustomer.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-500 break-all">
                            {selectedCustomer.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone + Total Orders */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-500">
                            {selectedCustomer.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Total Orders</p>
                          <p className="text-sm text-gray-500">
                            {displayCustomer.totalOrders} orders
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </div>

              {/* Order History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">

                  {/* ── MOBILE: Order Cards ── */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {customerOrders?.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">#{order.id}</p>
                            <Badge
                              className={getStatusColor(order.status)}
                              variant="secondary"
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Amount: {order.totalAmount}</span>
                            <span>Payment: {order.paymentType}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.map((orderItem, idx) => (
                              <p key={idx}>
                                {orderItem.product?.name?.slice(0, 15)}...
                              </p>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* ── DESKTOP: Order Table ── */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerOrders?.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.totalAmount}</TableCell>
                            <TableCell>
                              {order.items.map((orderItem, idx) => (
                                <p key={idx}>
                                  {orderItem.product?.name?.slice(0, 15)}...
                                </p>
                              ))}
                            </TableCell>
                            <TableCell>{order.paymentType}</TableCell>
                            <TableCell>
                              <Badge
                                className={getStatusColor(order.status)}
                                variant="secondary"
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setIsCustomerDetailsOpen(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Customers;