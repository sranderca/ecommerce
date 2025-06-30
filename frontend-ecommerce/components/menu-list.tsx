"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MenuList = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md">
                    <div className="mt-4 mb-2 text-lg font-medium">
                      AnderDev
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Todo para vestir tu hogar con amor y estilo.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección dedidacada a promociones y descuentos especiales.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Sabanas",
    href: "/category/sabanas",
    description:
      "Dale un toque de suavidad y frescura a tu descanso con nuestras sábanas de alta calidad. Diseños modernos, tejidos suaves y frescos que te harán dormir como nunca.",
  },
  {
    title: "Cortinas",
    href: "/category/cortinas",
    description:
      "Transforma tus espacios con nuestras cortinas decorativas. Estilo, privacidad y calidez en cada detalle para darle vida a tu hogar",
  },
  {
    title: "Edredones",
    href: "/category/edredones",
    description:
      "Abrígate con estilo y comodidad. Nuestros edredones combinan suavidad, diseño y calidez para que disfrutes de noches acogedoras todo el año.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
