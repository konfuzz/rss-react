import { fetchRecipeById } from "../../api/recipes";
import { Link } from "@/i18n/navigation"
import Image from "next/image";
import type { Recipe } from "../../types";
import { getTranslations } from 'next-intl/server'
import styles from './RecipeDetail.module.css'

interface Props {
  detailsId: string | null
  page: string | undefined
}

export async function RecipeDetail({ detailsId, page }: Props) {
  if (!detailsId) return null
  const t = await getTranslations('RecipeDetail')

  let recipe: Recipe;
  let url: string;

  if (page) {
    url = `/?page=${page}`;
  } else {
    url = `/`;
  }

  try {
    recipe = await fetchRecipeById(detailsId);
  } catch {
    return (
      <div className={styles['detail-panel']}>
        <p className="error-message">{t('failedToLoad')}</p>
        <Link href={url}><button className={styles['detail-close']}>✕</button></Link>
      </div>
    )
  }

  return (
    <div className={styles['detail-panel']}>
      <Link href={url}><button className={styles['detail-close']}>✕</button></Link>
      <Image className={styles['detail-image']} src={recipe.image} alt={recipe.name} width={640} height={400} />
      <div className={styles['detail-header']}>
        <h2>{recipe.name}</h2>
        <span className="badge">{recipe.difficulty}</span>
      </div>
      <div className="meta">
        <span>🍽 {recipe.servings} {t('servings')}</span>
        <span>⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} {t('min')}</span>
        <span>🔥 {recipe.caloriesPerServing} {t('kcal')}</span>
      </div>
      <div className={styles['detail-section']}>
        <h3>{t('ingredients')}</h3>
        <ul>
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles['detail-section']}>
        <h3>{t('instructions')}</h3>
        <ol>
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="tags">
        {recipe.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className={styles['detail-cuisine']}>{recipe.cuisine} · {recipe.mealType.join(', ')}</p>
      <div className="rating">
        ⭐ {recipe.rating} <span>({recipe.reviewCount} {t('reviews')})</span>
      </div>
    </div>
  )
}