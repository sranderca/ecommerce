import Link from "next/link"
import { buttonVariants } from "./ui/button"

const BannerProduct = () => {
    return (
        <>
         <div className="mt-4 text-center">
            <p>Dale a tu hogar el comfort que merece</p>
            <h4 className="mt-2 text-5xl font-extrabold uppercase">LAC.R</h4>
            <p className="my-2 text-lg">Sábanas, cortinas y edredones que transforman tu espacio</p>
            <Link href="#" className={buttonVariants()}>Comprar</Link>
        </div>
        <div className="h-[350px] bg-cover lg:h-[700px] bg-[url('/slider-image.webp')] bg-center mt-5"/>
        </>
           )
}

export default BannerProduct