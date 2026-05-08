import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";
import { addToCart } from "../../../Redux Toolkit/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
      duration: 1500,
    });
  };

  return (
    <Card
      key={product.id}
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-green-800 active:scale-95"
      onClick={() => handleAddToCart(product)}
    >
      <CardContent className="p-2 sm:p-3">
        <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={product.image}
            alt=""
          />
        </div>
        <h3 className="font-medium text-xs sm:text-sm truncate leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.sku}</p>
        <div className="flex items-center justify-between mt-1 flex-wrap gap-1">
          <span className="font-bold text-green-600 text-sm">
            ₹{product.sellingPrice || product.price}
          </span>
          <Badge variant="secondary" className="text-xs px-1 py-0">
            {product.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;