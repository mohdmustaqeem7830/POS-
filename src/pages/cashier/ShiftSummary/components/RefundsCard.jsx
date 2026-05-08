// RefundsCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircleIcon } from 'lucide-react';

const RefundsCard = ({ shiftData }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Refunds Processed</h2>
        {shiftData.refunds?.length > 0 ? (
          <>
            {/* Mobile card list */}
            <div className="sm:hidden space-y-2">
              {shiftData.refunds.map(refund => (
                <div key={refund.id} className="border rounded-lg p-2 text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold">RFD-{refund.id}</p>
                      <p className="text-muted-foreground">ORD-{refund.orderId}</p>
                      <p className="text-muted-foreground truncate max-w-[150px]">{refund.reason}</p>
                    </div>
                    <span className="text-destructive font-bold flex-shrink-0">
                      ₹{refund.amount?.toFixed(2) || 999}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Refund ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shiftData.refunds.map(refund => (
                    <TableRow key={refund.id}>
                      <TableCell className="font-medium">RFD-{refund.id}</TableCell>
                      <TableCell>ORD-{refund.orderId}</TableCell>
                      <TableCell>{refund.reason}</TableCell>
                      <TableCell className="text-right text-destructive">
                        ₹{refund.amount?.toFixed(2) || 999}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center text-muted-foreground">
            <CheckCircleIcon size={48} strokeWidth={1} />
            <p className="mt-4 text-sm sm:text-base">No refunds processed during this shift</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RefundsCard;