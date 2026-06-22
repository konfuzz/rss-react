'use client'

import { useSelectedStore } from "../../store/useSelectedStore";
import styles from './Checkbox.module.css'

interface Props {
  id: number;
}

export function Checkbox({ id }: Props) {
  const { selectedRecipes, toggleIds } = useSelectedStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  return (
    <div className={styles.checkbox}>
      <input type="checkbox" checked={selectedRecipes.includes(id)} onClick={handleClick} onChange={() => toggleIds(id)} />
    </div>
  )
}