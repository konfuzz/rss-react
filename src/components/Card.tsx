import type { Recipe } from "../types";
import { Link } from "@/i18n/navigation"
import Image from "next/image";
import { Checkbox } from "./Checkbox";
import { getTranslations } from 'next-intl/server'


interface Props {
  data: Recipe;
  page: string | undefined;
}

export default async function Card(props: Props) {
  const t = await getTranslations('RecipeDetail')
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
            <span>🍽 {data.servings} {t('servings')}</span>
            <span>⏱ {data.prepTimeMinutes + data.cookTimeMinutes} {t('min')}</span>
            <span>🔥 {data.caloriesPerServing} {t('kcal')}</span>
          </div>

          <div className="tags">
            {data.tags.map((tag: string) => <span key={tag} className="tag">{tag}</span>)}
          </div>

          <div className="rating">
            ⭐ {data.rating} <span>({data.reviewCount} {t('reviews')})</span>
          </div>
          <Checkbox id={data.id} />
        </div>
      </div>
    </Link>
  );  
}