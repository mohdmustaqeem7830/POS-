import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useSelector } from "react-redux";

const InventoryFormDialog = ({
  open, onOpenChange, selectedProductId, setSelectedProductId,
  quantity, setQuantity, onSubmit, mode = "add",
}) => {
  const products = useSelector((state) => state.product.products);
  const isEdit = mode === "edit";
  const selectedProduct = products.find((p) => String(p.id) === String(selectedProductId));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl mx-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Inventory" : "Add Inventory"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Row */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="product" className="text-sm font-medium">
              Product
            </label>
            {isEdit ? (
              <Input
                id="product"
                value={selectedProduct?.name || ""}
                disabled
                className="w-full"
              />
            ) : (
              <Select
                value={selectedProductId}
                onValueChange={(value) => setSelectedProductId(value)}
              >
                <SelectTrigger
                  startIcon={<Filter className="h-4 w-4 text-gray-500" />}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.sku}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Quantity Row */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSubmit}>
            {isEdit ? "Update Inventory" : "Add Inventory"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryFormDialog;