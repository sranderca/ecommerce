"use client";

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import AutoPlay from "embla-carousel-autoplay";

export const dataCarousel = [
  {
    id: 1,
    tittle: "Envío en 24/48 horas",
    description:
      "Como cliente VIP, tus envios en 24/48 horas. Obtén más información y únete.",
    link: "#",
  },
  {
    id: 2,
    tittle: "Consigue hasta un 15% en compras",
    description: "Ahorrate un 15% en compras iguales o superiores a $120.000.",
    link: "#",
  },
  {
    id: 3,
    tittle: "Devoluciones y entregas.",
    description:
      "Envios gratis en compras superiores a $80.000 y devoluciones totalmente gratis.",
    link: "#",
  },
  {
    id: 4,
    tittle: "Suscribite y recibe ofertas exclusivas",
    description:
      "Suscribete a nuestra pagina web y recibe ofertas exclusivas desde 15% en sabanas hasta 25% en todos los articulos.",
    link: "#",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[
          AutoPlay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {dataCarousel.map(({ id, tittle, link, description }) => (
            <CarouselItem
              key={id}
              onClick={() => router.push(link)}
              className="cursor-pointer"
            >
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-lg text-wrap dark:text-secondary">
                      {tittle}
                    </p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-secondary">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselTextBanner;
