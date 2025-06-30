import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/categories/sabanas" className="block">Sabanas</Link>
        <Link href="/categories/cortinas" className="block">Cortinas</Link>
        <Link href="/categories/edredones" className="block">Edredones</Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
