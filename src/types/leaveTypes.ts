// This defines the shape of a single leave object returned from the backend
export interface Leave {
  id: number;
  startDate: string; // e.g., "2025-12-10"
  endDate: string;
  reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  employeeId: number;
  employeeName: string;
}

// This defines the shape of the data needed to create a new leave
// Note: It doesn't have an ID, status, or employee details, as the backend handles that.
export interface CreateLeaveDto {
  startDate: string;
  endDate: string;
  reason: string;
}

// Paginated response structure
export interface PagedResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}
