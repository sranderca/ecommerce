import { ResultFilterTypes } from "@/types/filters";
import { useEffect, useState } from "react";

export function UseGetProductField() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?filters[type][$eq]=material`;
  const [result, setResult] = useState<ResultFilterTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
