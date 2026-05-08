// OrderDetails/OrderDetails.jsx
import OrderInformation from "./OrderInformation";
import CustomerInformation from "./CustomerInformation";
import OrderItemTable from "../../../common/Order/OrderItemTable";
import { Card, CardContent } from "../../../../components/ui/card";

const OrderDetails = ({ selectedOrder }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <OrderInformation selectedOrder={selectedOrder} />
        <CustomerInformation selectedOrder={selectedOrder} />
      </div>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <h3 className="font-semibold mb-2 text-sm sm:text-base">Order Items</h3>
          <OrderItemTable selectedOrder={selectedOrder} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;