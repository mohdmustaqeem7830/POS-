import React from "react";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";

const InventoryTable = ({ rows, onEdit }) => (
  <>
    {/* Desktop Table - hidden on mobile */}
    <div className="hidden md:block rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row?.id}>
                <TableCell className="font-medium">{row.sku}</TableCell>
                <TableCell>{row.name.slice(0, 70)}...</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No inventory found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    {/* Mobile Card View */}
    <div className="md:hidden space-y-3">
      {rows.length > 0 ? (
        rows.map((row) => (
          <Card key={row?.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Product Name */}
                  <p className="font-semibold text-sm leading-tight mb-1">
                    {row.name.slice(0, 60)}...
                  </p>

                  {/* SKU + Category row */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                    <span className="text-xs text-muted-foreground">
                      SKU: <span className="font-medium text-foreground">{row.sku}</span>
                    </span>
                    {row.category && (
                      <span className="text-xs text-muted-foreground">
                        Category: <span className="font-medium text-foreground">{row.category}</span>
                      </span>
                    )}
                  </div>

                  {/* Quantity badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Qty:</span>
                    <span className={`text-sm font-bold ${
                      row.quantity > 10 ? "text-green-600"
                      : row.quantity > 0 ? "text-amber-600"
                      : "text-red-600"
                    }`}>
                      {row.quantity}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <Button size="sm" variant="outline" onClick={() => onEdit(row)} className="shrink-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500 text-sm">
            No inventory found matching your criteria
          </CardContent>
        </Card>
      )}
    </div>
  </>
);

export default InventoryTable;