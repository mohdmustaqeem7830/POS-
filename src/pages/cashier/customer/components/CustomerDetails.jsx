// CustomerDetails.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon, PlusIcon, Loader2, UserIcon } from 'lucide-react';

const CustomerDetails = ({ customer, onAddPoints, loading = false }) => {
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <UserIcon size={48} strokeWidth={1} />
        <p className="mt-4">Select a customer to view details</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <Loader2 className="animate-spin h-8 w-8 mb-4" />
        <p>Loading customer details...</p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold truncate">{customer.fullName || 'Unknown Customer'}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{customer.phone || 'N/A'}</p>
          <p className="text-muted-foreground text-sm sm:text-base truncate">{customer.email || 'N/A'}</p>
        </div>
        <Button onClick={onAddPoints} className="flex items-center gap-2 w-full sm:w-auto min-h-[44px] flex-shrink-0">
          <PlusIcon className="h-4 w-4" />
          Add Points
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Card>
          <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
              <span className="text-lg sm:text-2xl font-bold">{customer.loyaltyPoints || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <span className="text-lg sm:text-2xl font-bold">{customer.totalOrders || 0}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <span className="text-lg sm:text-2xl font-bold">₹{(customer.totalSpent || 0).toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      {customer.averageOrderValue && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xl sm:text-2xl font-bold">₹{customer.averageOrderValue.toFixed(2)}</span>
          </CardContent>
        </Card>
      )}

      {customer.lastVisit && (
        <div className="mt-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Visit: {new Date(customer.lastVisit).toLocaleDateString()}
          </p>
        </div>
      )}   
    </div>
  );
};

export default CustomerDetails;