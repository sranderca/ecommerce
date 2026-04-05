"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Importamos el input de shadcn
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import sha256 from "crypto-js/sha256";

function generateSignature(reference: string, amount: number, secret: string) {
  const stringToHash = `${reference}${amount}COP${secret}`;
  return sha256(stringToHash).toString();
}

export default function Page() {
  const { items, removeAll } = useCart();
  const prices = items.map((product) => product.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);
  // 👉 NUEVA LÍNEA: Sacamos solo los IDs de los productos del carrito
  const productIds = items.map((product) => product.id);

  // 1. Creamos los estados para guardar los datos del cliente
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    if (totalPrice === 0) return;

    // 2. Validación: Que no nos dejen campos en blanco
    if (!name || !email || !address || !phone) {
      alert(
        "Por favor llena todos tus datos de envío para poder despachar tu pedido.",
      );
      return;
    }

    const amountInCents = Math.round(totalPrice * 100);
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    const integritySecret = process.env.NEXT_PUBLIC_WOMPI_INTEGRITY_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

    if (!publicKey || !integritySecret || !appUrl) {
      console.error("Faltan las variables de entorno de Wompi");
      return;
    }

    try {
      // 3. Le mandamos el paquete COMPLETO a Strapi
      const strapiResponse = await fetch(`${strapiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            totalAmount: totalPrice,
            orderStatus: "PENDIENTE",
            wompiReference: "POR_GENERAR",

            // ¡OJO ACÁ! Estos nombres deben ser EXACTAMENTE iguales a como los creaste en Strapi
            name: name,
            email: email,
            address: address,
            phone: phone,

            products: productIds, // Aquí mandamos el array de IDs de los productos

            publishedAt: new Date(),
          },
        }),
      });

      const strapiData = await strapiResponse.json();

      if (!strapiResponse.ok) {
        console.error("🚨 REGAÑO DE STRAPI:", strapiData.error);
        throw new Error("No se pudo crear el pedido en Strapi");
      }

      const orderId = strapiData.data.id;
      const reference = `PEDIDO-${orderId}`;
      const signature = generateSignature(
        reference,
        amountInCents,
        integritySecret,
      );
      const wompiUrl = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=COP&amount-in-cents=${amountInCents}&reference=${reference}&signature:integrity=${signature}`;

      // 👉 ¡LA MAGIA AQUÍ! Vaciamos el carrito antes de irnos a Wompi
      removeAll();

      window.location.href = wompiUrl;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert(
        "Hubo un problemita armando tu pedido. Por favor, intenta de nuevo.",
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-8 items-start">
        <div>
          {items.length == 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
            <p className="mb-3 text-lg font-semibold">Resumen de la Orden</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Total a pagar</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>

            {/* 4. Aquí metemos el formulario de envío */}
            <div className="flex flex-col gap-4 my-6">
              <p className="text-sm font-semibold">Datos de Envío</p>
              <Input
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Dirección completa (Ciudad, Barrio, Calle)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="Teléfono o Celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between w-full mt-3">
              <Button
                className="w-full"
                onClick={handlePayment}
                disabled={items.length === 0}
              >
                Pagar con Wompi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
