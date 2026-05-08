// ReturnOrderPage.jsx
import React, { useState, useEffect } from "react";
import {
  OrderDetailsSection,
  ReturnItemsSection,
  ReturnReceiptDialog,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByBranch } from "../../../Redux Toolkit/features/order/orderThunks";
import OrderTable from "./components/OrderTable";

const ReturnOrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);

  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);

  useEffect(() => {
    console.log("branch ", branch);
    if (branch?.id) {
      dispatch(getOrdersByBranch({ branchId: branch.id }));
    }
  }, [dispatch, branch]);

  const handleSelectOrder = (order) => {
    console.log("selected order", order);
    setSelectedOrder(order);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 bg-card border-b">
        <h1 className="text-xl sm:text-2xl font-bold">Return / Refund</h1>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden overflow-y-auto sm:overflow-hidden">
        {!selectedOrder ? (
          <OrderTable handleSelectOrder={handleSelectOrder} />
        ) : (
          <>
            <OrderDetailsSection
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
            <ReturnItemsSection
              setShowReceiptDialog={setShowReceiptDialog}
              selectedOrder={selectedOrder}
            />
          </>
        )}
      </div>

      {selectedOrder && (
        <ReturnReceiptDialog
          showReceiptDialog={showReceiptDialog}
          setShowReceiptDialog={setShowReceiptDialog}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default ReturnOrderPage;