import { UseGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes, ResultFilterTypes } from "@/types/filters";

type FilterMaterialProps = {
  setFilterMaterial: (material: string) => void;
};

const FilterMaterial = (props: FilterMaterialProps) => {
  const { setFilterMaterial } = props;
  const { result, loading }: FilterTypes = UseGetProductField();
  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Material</p>
      {loading && result == null && <p>Cargando Material..</p>}

      <RadioGroup onValueChange={(value) => setFilterMaterial(value)}>
        {result !== null &&
          result.map((material: ResultFilterTypes) => (
            <div key={material.id} className="flex items-center space-x-2">
              <RadioGroupItem value={material.slug} id={material.slug} />
              <Label htmlFor={material.slug}>{material.categoryName}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterMaterial;
