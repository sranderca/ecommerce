import { useEffect, useState } from "react";

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=mainimage&filters[type][$eq]=product`;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const rest = await fetch(url);
        const json = await rest.json();
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
