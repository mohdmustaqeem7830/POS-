// CustomerDialog.jsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '@/Redux Toolkit/features/customer/customerThunks';
import CustomerForm from './CustomerForm';
import { setSelectedCustomer } from '../../../Redux Toolkit/features/cart/cartSlice';
import { useToast } from '../../../components/ui/use-toast';

const CustomerDialog = ({
  showCustomerDialog,
  setShowCustomerDialog
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { customers, loading } = useSelector(state => state.customer);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  useEffect(() => {
    if (showCustomerDialog) {
      dispatch(getAllCustomers());
    }
  }, [showCustomerDialog, dispatch]);

  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  const handleCustomerSelect = (customer) => {
    dispatch(setSelectedCustomer(customer));
    setShowCustomerDialog(false);
    toast({
      title: "Customer Selected",
      description: `${customer.name} selected for this order`,
    });
  };

  return (
    <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
      <DialogContent className="w-[95vw] max-w-2xl rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Select Customer</DialogTitle>
        </DialogHeader>
        
        <div className="mb-3 sm:mb-4">
          <Input 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-h-[44px] text-base"
          />
        </div>
        
        <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p>Loading customers...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500 text-sm text-center px-4">
                {searchTerm ? 'No customers found matching your search.' : 'No customers available.'}
              </p>
            </div>
          ) : (
            /* Mobile: card list | Desktop: table */
            <>
              {/* Mobile card list */}
              <div className="sm:hidden divide-y">
                {filteredCustomers.map(customer => (
                  <div
                    key={customer.id}
                    className="p-3 flex items-center justify-between gap-3 active:bg-accent"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{customer.fullName}</p>
                      <p className="text-xs text-gray-500">{customer.phone}</p>
                      <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                    </div>
                    <Button
                      size="sm"
                      className="min-h-[44px] flex-shrink-0"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      Select
                    </Button>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.fullName}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => handleCustomerSelect(customer)}>
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>

        <CustomerForm 
          showCustomerForm={showCustomerForm}
          setShowCustomerForm={setShowCustomerForm}
        />
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setShowCustomerDialog(false)} className="w-full sm:w-auto min-h-[44px]">Cancel</Button>
          <Button onClick={() => setShowCustomerForm(true)} className="w-full sm:w-auto min-h-[44px]">Add New Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;