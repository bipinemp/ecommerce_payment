"use client";

import { getAllProducts } from "@/app/actions/getProducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "./ui/button";
import { addToCart } from "@/app/actions/addToCart";
import { useCartOpenStore, useUserId } from "@/store/store";

const Products = () => {
  const { openCart } = useCartOpenStore();
  const queryClient = useQueryClient();
  const { userId } = useUserId();

  const { data, isPending } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cartitems"] });
      openCart(true);
    },
  });

  const handleAddTocart = (productId: string, quantity: number) => {
    const CartData = {
      productId,
      quantity,
      userId,
    };

    mutate(CartData);
  };

  return (
    <div className="mx-10 bg-foreground">
      {isPending && <h1>Loading...</h1>}
      <div className="flex gap-5">
        {data &&
          data.length > 0 &&
          data?.map((product) => (
            <div
              key={product.id}
              className="relative pt-4 flex flex-col gap-2 justify-between w-[450px] h-[450px] shadow-lg cursor-pointer border border-input rounded-md"
            >
              <div className="relative flex-2 w-full h-[60%]">
                <Image
                  src={product.image}
                  fill
                  alt="product_image"
                  className="object-contain mix-blend-screen"
                />
              </div>
              <div className="w-full h-[1px] bg-input"></div>
              <div className="flex flex-col flex-1 h-full justify-between px-3 pb-3 text-gray-300">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-gray-400">
                      {product.name}
                    </h2>
                    <p className="text-4xl font-bold">${product.price}</p>
                  </div>
                  <span className="font-semibold">STOCK: {product.Stock}</span>
                </div>
                <Button
                  size="lg"
                  className="text-lg font-bold"
                  variant="secondary"
                  onClick={() => handleAddTocart(product.id, 1)}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
