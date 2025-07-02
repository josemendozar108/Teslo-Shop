"use client";
import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const cart = useCartStore((state) => state.cart);

  //Next15 Esto ejecuta la función en cada render y puede romper cosas, especialmente con SSR/hidratación.
  //  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
  //   state.getSummaryInformation()
  // );
  
  const { itemsInCart, subTotal, tax, total } = useMemo(() => { 
    const subTotal = cart.reduce((sum, item) => item.price * item.quantity + sum, 0);
    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { subTotal, tax, total, itemsInCart };
  }, [cart]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded]);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
