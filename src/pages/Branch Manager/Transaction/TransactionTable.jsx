import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Eye } from 'lucide-react';

const TransactionTable = ({ filteredTransactions, handleViewTransaction }) => {
  return (
    <>
      {/* Desktop Table View - hidden on mobile */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Cashier</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.createdAt}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'Sale' ? 'bg-green-100 text-green-800'
                      : transaction.type === 'Refund' ? 'bg-amber-100 text-amber-800'
                      : transaction.type === 'Purchase' || transaction.type === 'Expense' ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                      #{transaction.cashierId}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.customer?.fullName}</TableCell>
                  <TableCell className={transaction.totalAmount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {transaction.totalAmount > 0
                      ? `+$${transaction.totalAmount.toFixed(2)}`
                      : `-$${Math.abs(transaction.totalAmount).toFixed(2)}`}
                  </TableCell>
                  <TableCell>{transaction.paymentType}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewTransaction(transaction)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View - shown only on mobile */}
      <div className="md:hidden space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Amount + Status Row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-lg font-bold ${
                      transaction.totalAmount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.totalAmount > 0
                        ? `+$${transaction.totalAmount.toFixed(2)}`
                        : `-$${Math.abs(transaction.totalAmount).toFixed(2)}`}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </div>

                  {/* Customer */}
                  <p className="text-sm font-medium truncate">
                    {transaction.customer?.fullName || "—"}
                  </p>

                  {/* Date + Payment */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <p className="text-xs text-muted-foreground">{transaction.createdAt}</p>
                    <p className="text-xs text-muted-foreground">{transaction.paymentType}</p>
                  </div>

                  {/* Cashier */}
                  <p className="text-xs text-muted-foreground mt-1">
                    Cashier: #{transaction.cashierId}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 mt-1"
                  onClick={() => handleViewTransaction(transaction)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTransactions.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground text-sm">
              No transactions found.
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default TransactionTable;