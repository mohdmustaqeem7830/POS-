// CustomerLookupPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { getAllCustomers } from "@/Redux Toolkit/features/customer/customerThunks";
import { getOrdersByCustomer } from "@/Redux Toolkit/features/order/orderThunks";
import { filterCustomers, validatePoints, calculateCustomerStats } from "./utils/customerUtils";
import { CustomerSearch, CustomerList, CustomerDetails, PurchaseHistory, AddPointsDialog } from "./components";
import { clearCustomerOrders } from "../../../Redux Toolkit/features/order/orderSlice";
import CustomerForm from "./CustomerForm";

const CustomerLookupPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { customers, loading: customerLoading, error: customerError } = useSelector((state) => state.customer);
  const { customerOrders, loading: orderLoading, error: orderError } = useSelector((state) => state.order);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddPointsDialog, setShowAddPointsDialog] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  // Mobile: 'list' | 'details'
  const [mobileView, setMobileView] = useState('list');

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customerError) {
      toast({ title: "Error", description: customerError, variant: "destructive" });
    }
  }, [customerError, toast]);

  useEffect(() => {
    if (orderError) {
      toast({ title: "Error", description: orderError, variant: "destructive" });
    }
  }, [orderError, toast]);

  const filteredCustomers = filterCustomers(customers, searchTerm);

  const handleSelectCustomer = async (customer) => {
    setSelectedCustomer(customer);
    dispatch(clearCustomerOrders());
    if (customer.id) {
      dispatch(getOrdersByCustomer(customer.id));
    }
    // On mobile, switch to details view
    setMobileView('details');
  };

  const handleAddPoints = () => {
    const error = validatePoints(pointsToAdd);
    if (error) {
      toast({ title: "Invalid Points", description: error, variant: "destructive" });
      return;
    }
    toast({
      title: "Points Added",
      description: `${pointsToAdd} points added to ${selectedCustomer.fullName || selectedCustomer.name}'s account`,
    });
    setShowAddPointsDialog(false);
    setPointsToAdd(0);
  };

  useEffect(() => {
    if (selectedCustomer) {
      dispatch(getOrdersByCustomer(selectedCustomer.id));
    }
  }, [selectedCustomer]);

  const customerStats = selectedCustomer ? calculateCustomerStats(customerOrders) : null;
  const displayCustomer = selectedCustomer ? { ...selectedCustomer, ...customerStats } : null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 sm:p-4 bg-card border-b flex items-center gap-3">
        {/* Mobile back button */}
        {mobileView === 'details' && (
          <button
            className="md:hidden flex items-center text-sm font-medium text-muted-foreground min-h-[44px] pr-2"
            onClick={() => setMobileView('list')}
          >
            ← Back
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold">Customer Management</h1>
      </div>

      {/* Desktop layout: side-by-side | Mobile layout: stacked views */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Column — hidden on mobile when viewing details */}
        <div className={`
          w-full md:w-1/3 border-r flex flex-col
          ${mobileView === 'details' ? 'hidden md:flex' : 'flex'}
        `}>
          <CustomerSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddCustomer={() => setShowCustomerForm(true)}
          />
          <CustomerList
            customers={filteredCustomers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={handleSelectCustomer}
            loading={customerLoading}
          />
        </div>

        {/* Right Column — hidden on mobile when viewing list */}
        <div className={`
          w-full md:w-2/3 flex flex-col overflow-y-auto
          ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}
        `}>
          <CustomerDetails
            customer={displayCustomer}
            onAddPoints={() => setShowAddPointsDialog(true)}
            loading={orderLoading}
          />
          {selectedCustomer && (
            <PurchaseHistory orders={customerOrders} loading={orderLoading} />
          )}
        </div>

      </div>

      <AddPointsDialog
        isOpen={showAddPointsDialog}
        onClose={() => setShowAddPointsDialog(false)}
        customer={selectedCustomer}
        pointsToAdd={pointsToAdd}
        onPointsChange={setPointsToAdd}
        onAddPoints={handleAddPoints}
      />

      <CustomerForm 
        showCustomerForm={showCustomerForm}
        setShowCustomerForm={setShowCustomerForm}
      />
    </div>
  );
};

export default CustomerLookupPage;