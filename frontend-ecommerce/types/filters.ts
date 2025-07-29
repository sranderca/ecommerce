export type FilterTypes = {
  result: ResultFilterTypes[] | null;
  loading: boolean;
  error: string;
};

export type ResultFilterTypes = {
  categoryName: string;
  id: number;
  slug: string;
};
