import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2xl text-primary">
        Consigue hasta un 15% de descuento
      </h2>
      <h3 className="mt-3 font-semibold">
        15% de descuento en compras iguales o superiores a $120.000
      </h3>

      <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
        <Link href="#" className={buttonVariants()}>
          Comprar
        </Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>
          Mas información
        </Link>
      </div>
    </div>
  );
};

export default BannerDiscount;
