import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
  loading: boolean;
  error: string | null;
  onSelect: (id: number) => void;
}

export function ResultSection(props: Props) {
  const { items, loading, error, onSelect } = props;
  let content: React.ReactNode = items.map((item: Recipe) => <Card key={item.id} data={item} onSelect={onSelect} />);

  if (loading) {
    content = Array(10).fill(0).map((_, i) => (<div className="sceleton" key={i}></div>));
  } else if (items.length === 0) {
    content = (<p className="no-results">No results found. Try harder...</p>);
  }

  if (error) {
    content = <div className="error-message">⚠️ {error}</div>
  }

  return (    
    <section className="results">
      {content}
    </section>
  );
}
