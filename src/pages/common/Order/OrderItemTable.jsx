import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const OrderItemTable = ({ selectedOrder }) => {
  return (
    <>
      {/* ── Mobile Cards (< sm) ─────────────────────────────────────── */}
      <div className="block sm:hidden divide-y">
        {selectedOrder.items?.map((item) => (
          <div key={item.id} className="py-3 flex items-start gap-3">

            {/* Image */}
            <div className="flex-shrink-0 w-12 h-12">
              {item.product?.image ? (
                <img
                  src={item.product.image}
                  alt={item.productName || item.product?.name || "Product"}
                  className="w-12 h-12 object-cover rounded-md"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {item.productName
                      ? item.productName.charAt(0).toUpperCase()
                      : item.product?.name
                      ? item.product.name.charAt(0).toUpperCase()
                      : "P"}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight truncate">
                {item.product?.name || item.productName || "Product"}
              </p>
              {item.product?.sku && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  SKU: {item.product.sku}
                </p>
              )}
              <div className="flex items-center justify-between mt-1.5 gap-2">
                <span className="text-xs text-muted-foreground">
                  Qty: <span className="font-medium text-foreground">{item.quantity}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  ₹{item.product?.sellingPrice?.toFixed(2) || "0.00"} each
                </span>
                <span className="text-sm font-semibold">
                  ₹{(item.product?.sellingPrice * item.quantity)?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── Desktop Table (≥ sm) ─────────────────────────────────────── */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedOrder.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-10 h-10">
                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.productName || item.product?.name || "Product"}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    ) : null}
                    {(!item.product?.image || item.product?.image === "") && (
                      <div className="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {item.productName
                            ? item.productName.charAt(0).toUpperCase()
                            : item.product?.name
                            ? item.product.name.charAt(0).toUpperCase()
                            : "P"}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {item.product?.name.slice(0, 20) || "Product"}...
                    </span>
                    {item.product?.sku && (
                      <span className="text-xs text-gray-500">
                        SKU: {item.product.sku.slice(0, 17) + "."}...
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ₹{item.product?.sellingPrice?.toFixed(2) || "0.00"}
                </TableCell>
                <TableCell className="text-right">
                  ₹{(item.product?.sellingPrice * item.quantity)?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OrderItemTable;