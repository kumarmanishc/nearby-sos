export interface Ambulance {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAmbulanceDto {
  title: string;
  description: string;
  location: string;
  image?: string;
}

export interface UpdateAmbulanceDto {
  title?: string;
  description?: string;
  location?: string;
  image?: string;
}

export interface CreateDoctorDto {
  title: string;
  description: string;
  location: string;
  image?: string;
}

export interface UpdateDoctorDto {
  title?: string;
  description?: string;
  location?: string;
  image?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface SuccessResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  statusCode: number;
}