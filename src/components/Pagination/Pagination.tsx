import { Link } from "@/i18n/navigation"
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <nav className={styles.pagination}>
      <ul>
        {(currentPage === 1 || totalPages <= 1) || <li><Link href={`/?page=${currentPage - 1}`} prefetch={false}>&lt;</Link></li>}
        
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <Link href={`/?page=${i + 1}`} className={currentPage === i + 1 ? styles.active : ''} prefetch={false}>{i + 1}</Link>
          </li>
        ))}
        {(currentPage === totalPages || totalPages <= 1) || <li><Link href={`/?page=${currentPage + 1}`} prefetch={false}>&gt;</Link></li>}
      </ul>
    </nav>
  );
}