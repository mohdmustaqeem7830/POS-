import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const InventoryStats = ({ inventoryRows }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-lg font-medium text-gray-500 text-center">
            Total Products
          </h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">{inventoryRows.length}</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-lg font-medium text-gray-500 text-center">
            Total Quantity
          </h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-green-600">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default InventoryStats;