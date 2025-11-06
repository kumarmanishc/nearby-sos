import { PaginatedResponse } from '../types';

export interface PaginationOptions {
  page: number;
  limit: number;
  search?: string;
}

export function paginate<T>(
  data: T[],
  options: PaginationOptions
): PaginatedResponse<T> {
  const { page, limit, search } = options;
  
  // Apply search filter if provided
  let filteredData = data;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = data.filter((item: any) => {
      // Search in title, description, and location fields
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower)
      );
    });
  }

  const total = filteredData.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedData = filteredData.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages,
  };
}

export function validatePaginationParams(
  page?: string,
  limit?: string
): { page: number; limit: number } {
  const parsedPage = parseInt(page || '1', 10);
  const parsedLimit = parseInt(limit || '10', 10);

  // Validate and set reasonable bounds
  const validPage = Math.max(1, isNaN(parsedPage) ? 1 : parsedPage);
  const validLimit = Math.max(1, Math.min(100, isNaN(parsedLimit) ? 10 : parsedLimit));

  return {
    page: validPage,
    limit: validLimit,
  };
}