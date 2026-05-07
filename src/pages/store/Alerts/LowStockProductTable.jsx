import React from 'react';
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";
import { Tag, DollarSign, Package } from "lucide-react";
import { useSelector } from 'react-redux';

const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span className="text-sm text-muted-foreground">Loading products...</span>
  </div>
);

const LowStockProductTable = () => {
  const { storeAlerts, loading } = useSelector((state) => state.storeAnalytics);

  if (loading) return <Spinner />;

  return (
    <>
      {/* ── Mobile Cards ─────────────────────────────────────────────── */}
      <div className="block sm:hidden divide-y">
        {storeAlerts?.lowStockAlerts?.map((product) => (
          <div key={product.id} className="py-3 flex items-start gap-3">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="min-w-0 space-y-1 flex-1">
              <p className="font-medium text-sm truncate">
                {product.name?.slice(0, 32)}...
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {product.description?.slice(0, 30)}...
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" /> {product.category}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  {product.price?.toFixed ? product.price.toFixed(2) : product.sellingPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table ─────────────────────────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeAlerts?.lowStockAlerts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{product.name?.slice(0, 32)}...</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description?.slice(0, 30)}...
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-gray-400" />
                    {product.category}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    {product.price?.toFixed ? product.price.toFixed(2) : product.sellingPrice}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default LowStockProductTable;