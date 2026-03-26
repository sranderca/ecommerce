interface ProductCategoryMeasureProps {
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
  };
  measures: string;
}

const ProductCategoryMeasure = (props: ProductCategoryMeasureProps) => {
  const { category, measures } = props;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:text-black w-fit">
        {category.categoryName}
      </p>
      <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
        {measures}
      </p>
    </div>
  );
};

export default ProductCategoryMeasure;
