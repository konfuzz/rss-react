import type { Recipe } from "../types";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "./Checkbox";


interface Props {
  data: Recipe;
  page: string | undefined;
}

export function Card(props: Props) {
  const { data, page } = props;

  let url: string;

  if (page) {
    url = `/?page=${page}&details=${data.id}`;
  } else {
    url = `/?details=${data.id}`;
  }

  return (
    <Link href={url} prefetch={false}>
      <div className="card">
        <Image src={data.image} alt={data.name} width={340} height={280} />

        <div className="card__content">
          <div className="card__header">
            <h3>{data.name}</h3>
            <span className="badge">{data.difficulty}</span>
          </div>

          <div className="meta">
            <span>🍽 {data.servings} servings</span>
            <span>⏱ {data.prepTimeMinutes + data.cookTimeMinutes} min</span>
            <span>🔥 {data.caloriesPerServing} kcal</span>
          </div>

          <div className="tags">
            {data.tags.map((tag: string) => <span key={tag} className="tag">{tag}</span>)}
          </div>

          <div className="rating">
            ⭐ {data.rating} <span>({data.reviewCount} reviews)</span>
          </div>
          <Checkbox id={data.id} />
        </div>
      </div>
    </Link>
  );  
}