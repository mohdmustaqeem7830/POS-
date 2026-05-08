// ShiftSummaryPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import {
  ShiftInformationCard, SalesSummaryCard, PaymentSummaryCard,
  TopSellingItemsCard, RecentOrdersCard, RefundsCard,
  ShiftHeader, LogoutConfirmDialog, PrintDialog
} from './components';
import { getCurrentShiftProgress, endShift } from '../../../Redux Toolkit/features/shiftReport/shiftReportThunks';
import { logout } from '../../../Redux Toolkit/features/user/userThunks';
import { useNavigate } from 'react-router';

const ShiftSummaryPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showLogoutConfirmDialog, setShowLogoutConfirmDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const navigate = useNavigate();

  const { currentShift, loading, error } = useSelector((state) => state.shiftReport);

  useEffect(() => {
    dispatch(getCurrentShiftProgress());
  }, [dispatch]);

  const handlePrintSummary = () => {
    setShowPrintDialog(false);
    toast({ title: 'Printing Shift Summary', description: 'Shift summary is being printed' });
  };

  const handleEndShift = async () => {
    setShowLogoutConfirmDialog(false);
    if (true) {
      dispatch(endShift());
      dispatch(logout());
      navigate("/");
      toast({ title: 'Shift Ended', description: 'You have been logged out successfully' });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ShiftHeader
        onPrintClick={() => setShowPrintDialog(true)}
        onEndShiftClick={() => setShowLogoutConfirmDialog(true)}
      />
      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full text-base sm:text-lg">Loading shift summary...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-destructive text-sm sm:text-base">{error}</div>
        ) : currentShift ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <ShiftInformationCard shiftData={currentShift} />
              <SalesSummaryCard shiftData={currentShift} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <PaymentSummaryCard shiftData={currentShift} />
              <TopSellingItemsCard shiftData={currentShift} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <RecentOrdersCard shiftData={currentShift} />
              <RefundsCard shiftData={currentShift} />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-muted-foreground text-sm sm:text-base">
            No shift data available.
          </div>
        )}
      </div>
      <LogoutConfirmDialog
        isOpen={showLogoutConfirmDialog}
        onClose={() => setShowLogoutConfirmDialog(false)}
        onConfirm={handleEndShift}
      />
      <PrintDialog
        isOpen={showPrintDialog}
        onClose={() => setShowPrintDialog(false)}
        onConfirm={handlePrintSummary}
      />
    </div>
  );
};

export default ShiftSummaryPage;