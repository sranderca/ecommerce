"use client";
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  const router = useRouter();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      <h1
        className={`${greatVibes.className} text-[var(--gold)] text-5xl`}
        onClick={() => router.push("/")}
      >
        Lac.R
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {cart.items.length == 0 ? (
          <ShoppingCart
            strokeWidth={1}
            className="cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cart.items.length}</span>
          </div>
        )}
        <Heart
          strokeWidth={1}
          className={`cursor-pointer ${
            lovedItems.length > 0 && "fill-black dark:fill-white"
          }`}
          onClick={() => router.push("/loved-products")}
        />

        <User strokeWidth={1} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;
