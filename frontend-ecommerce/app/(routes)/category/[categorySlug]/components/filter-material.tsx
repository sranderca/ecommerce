import { UseGetProductField } from "@/api/getProductField"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FilterMaterial = () => {
    const { result, loading } = UseGetProductField()
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Material</p>
            {loading && result == null && (
                <p>Cargando Material..</p>
            )}

            <RadioGroup>
                 {result !== null && result.map((material) => (
                    <div key={material.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={material.slug} id={material.slug}/>
                        <Label htmlFor={material.slug}>{material.categoryName}</Label>
                    </div>
                 ))}
            </RadioGroup>
        </div>
    )
}

export default FilterMaterial