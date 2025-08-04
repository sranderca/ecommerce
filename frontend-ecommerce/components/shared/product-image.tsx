import { useRouter } from "next/navigation";

interface ProductImageProps {
  url: string;
  slug: string;
}

const ProductImage = (props: ProductImageProps) => {
  const { url, slug } = props;
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/${slug}`)}>
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt="product"
        className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
      />
    </div>
  );
};

export default ProductImage;
