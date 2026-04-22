import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InventoryFilters = ({
  searchTerm, onSearch, category, onCategoryChange, products, inventoryRows,
}) => (
  <Card>
    <CardContent className="p-4 md:p-6">
      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={onSearch}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <div>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger
              startIcon={<Filter className="h-4 w-4 text-gray-500" />}
              className="w-full"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {[...new Set(products.map((p) => p.category).filter(Boolean))].map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Total Quantity */}
        <div className="flex gap-3 items-center border p-3 rounded-md">
          <h3 className="text-sm md:text-base font-medium text-gray-500 whitespace-nowrap">
            Total Quantity:
          </h3>
          <p className="text-lg md:text-xl font-bold text-green-600">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InventoryFilters;