interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination">
      <ul>
        {(currentPage === 1 || totalPages <= 1) || <li><button onClick={() => onPageChange(currentPage - 1)}>&lt;</button></li>}
        
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button onClick={() => onPageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
          </li>
        ))}
        {(currentPage === totalPages || totalPages <= 1) || <li><button onClick={() => onPageChange(currentPage + 1)}>&gt;</button></li>}
      </ul>
    </nav>
  );
}