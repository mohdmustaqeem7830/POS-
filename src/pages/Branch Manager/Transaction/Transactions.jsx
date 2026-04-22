import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Search, Filter, Calendar, Download, Eye,
  CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft,
} from "lucide-react";
import TransactionTable from "./TransactionTable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrdersByBranch } from "../../../Redux Toolkit/features/order/orderThunks";
import { Printer } from "lucide-react";

export default function Transactions() {
  const { orders } = useSelector((state) => state.order);
  const { branch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    if (branch) {
      dispatch(getOrdersByBranch({ branchId: branch?.id }));
    }
  }, [branch]);

  const totalIncome = orders
    .filter((t) => t.totalAmount > 0)
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalExpenses = orders
    .filter((t) => t.totalAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.totalAmount), 0);

  const netAmount = totalIncome - totalExpenses || 0;

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" /> Export Transactions
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Income</p>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  ${totalIncome.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full shrink-0">
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  ${totalExpenses.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-red-100 rounded-full shrink-0">
                <ArrowDownLeft className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Net Amount</p>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  ${netAmount.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full shrink-0">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <TransactionTable
        filteredTransactions={orders}
        handleViewTransaction={handleViewTransaction}
      />

      {/* View Transaction Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg rounded-xl mx-auto">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">
              Transaction Details - #ORD-{selectedTransaction?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Cashier</p>
                  <p className="text-sm md:text-base">{selectedTransaction.cashierId}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Date & Time</p>
                  <p className="text-sm md:text-base break-all">{selectedTransaction.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Type</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedTransaction.status === "Sale"
                      ? "bg-green-100 text-green-800"
                      : selectedTransaction.type === "Refund"
                      ? "bg-amber-100 text-amber-800"
                      : selectedTransaction.type === "Purchase" || selectedTransaction.type === "Expense"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {selectedTransaction.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {selectedTransaction.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="text-sm md:text-base">{selectedTransaction.paymentType}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">Amount</p>
                  <p className={`font-bold text-sm md:text-base ${
                    selectedTransaction.totalAmount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {selectedTransaction.totalAmount > 0
                      ? `+$${selectedTransaction.totalAmount.toFixed(2)}`
                      : `-$${Math.abs(selectedTransaction.totalAmount).toFixed(2)}`}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500">Customer Name</p>
                <p className="text-sm md:text-base">{selectedTransaction.customer?.fullName}</p>
              </div>

              {(selectedTransaction.status === "COMPLETED" || selectedTransaction.status === null) && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm md:text-base">Sale Details</h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    Invoice: {selectedTransaction.reference?.replace("TRX", "INV")}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">Customer: {selectedTransaction.customer?.fullName}</p>
                  <p className="text-xs md:text-sm text-gray-600">Items: {selectedTransaction.items?.length || 0}</p>
                </div>
              )}

              {selectedTransaction.type === "Refund" && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm md:text-base">Refund Details</h4>
                  <p className="text-xs md:text-sm text-gray-600">Original Invoice: INV-001</p>
                  <p className="text-xs md:text-sm text-gray-600">Reason: Customer request</p>
                  <p className="text-xs md:text-sm text-gray-600">Approved by: Jane Smith</p>
                </div>
              )}

              {selectedTransaction.type === "Purchase" && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm md:text-base">Purchase Details</h4>
                  <p className="text-xs md:text-sm text-gray-600">Purchase Order: PO-001</p>
                  <p className="text-xs md:text-sm text-gray-600">Supplier: ABC Supplies Inc.</p>
                  <p className="text-xs md:text-sm text-gray-600">Items: 15</p>
                </div>
              )}

              {selectedTransaction.type === "Expense" && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm md:text-base">Expense Details</h4>
                  <p className="text-xs md:text-sm text-gray-600">Category: Utilities</p>
                  <p className="text-xs md:text-sm text-gray-600">Approved by: Store Manager</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Printer className="h-4 w-4 mr-1" /> Print Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}