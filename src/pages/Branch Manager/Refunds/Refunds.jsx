import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getRefundsByBranch } from "../../../Redux Toolkit/features/refund/refundThunks";

const Refunds = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((store) => store.branch);
  const refunds = useSelector((store) => store.refund.refundsByBranch);

  useEffect(() => {
    if (branch) dispatch(getRefundsByBranch(branch?.id));
  }, [branch]);

  return (
    <>
      <h1 className="font-bold text-2xl pb-5">Refund Spike</h1>

      {/* ── MOBILE: Card layout — hidden on md+ ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {refunds?.length > 0 ? (
          refunds.map((refund) => (
            <Card key={refund.id} className="border border-gray-100 shadow-sm">
              <CardContent className="p-4 space-y-2">

                {/* ID + Order ID */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">#{refund.id}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    #ORD-{refund.orderId}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Amount</span>
                  <span className="font-semibold text-base">
                    ₹{refund.amount || 499}
                  </span>
                </div>

                {/* Reason */}
                <div className="pt-1 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Reason</p>
                  <p className="text-sm text-gray-700">{refund.reason || "-"}</p>
                </div>

              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            No refunds found matching your criteria
          </div>
        )}
      </div>

      {/* ── DESKTOP: Table layout — hidden on mobile ── */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Order Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refunds?.length > 0 ? (
              refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">#{refund.id}</TableCell>
                  <TableCell className="font-medium">#ORD-{refund.orderId}</TableCell>
                  <TableCell>₹{refund.amount || 499}</TableCell>
                  <TableCell className="text-right">{refund.reason}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No refunds found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Refunds;