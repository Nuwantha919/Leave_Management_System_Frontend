interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-end mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link modern-btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <i className="bi bi-chevron-left me-1"></i>Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button 
              className="page-link modern-btn" 
              onClick={() => onPageChange(number)}
              style={currentPage === number ? { background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' } : {}}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link modern-btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next<i className="bi bi-chevron-right ms-1"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}