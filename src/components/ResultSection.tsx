import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
  page: string | undefined;
}

export function ResultSection({items, page}: Props) {
  if (items.length === 0) return (
    <p className="no-results">No results found. Try harder...</p>
  )

  return (    
    <section className="results">
      {items.map((item: Recipe) => <Card key={item.id} data={item} page={page} />)}
    </section>
  );
}
