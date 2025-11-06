import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Ambulance {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

// Ambulance API
export const ambulanceApi = {
  // Get all ambulances with pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Ambulance>> => {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Ambulance>>>(`/ambulances?page=${page}&limit=${limit}`);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch ambulances');
    }
  },

  // Get ambulance by ID
  getById: async (id: string): Promise<Ambulance> => {
    try {
      const response = await api.get<ApiResponse<Ambulance>>(`/ambulances/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch ambulance');
    }
  },

  // Create new ambulance
  create: async (ambulance: Omit<Ambulance, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ambulance> => {
    try {
      const response = await api.post<ApiResponse<Ambulance>>('/ambulances', ambulance);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to create ambulance');
    }
  },

  // Update ambulance
  update: async (id: string, ambulance: Partial<Omit<Ambulance, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Ambulance> => {
    try {
      const response = await api.put<ApiResponse<Ambulance>>(`/ambulances/${id}`, ambulance);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to update ambulance');
    }
  },

  // Delete ambulance
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/ambulances/${id}`);
    } catch (error) {
      throw new Error('Failed to delete ambulance');
    }
  },

  // Get total count
  getCount: async (): Promise<number> => {
    try {
      const response = await api.get<ApiResponse<{ count: number }>>('/ambulances/count');
      return response.data.data.count;
    } catch (error) {
      throw new Error('Failed to get ambulance count');
    }
  },
};

// Doctor API
export const doctorApi = {
  // Get all doctors with pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Doctor>> => {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Doctor>>>(`/doctors?page=${page}&limit=${limit}`);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch doctors');
    }
  },

  // Get doctor by ID
  getById: async (id: string): Promise<Doctor> => {
    try {
      const response = await api.get<ApiResponse<Doctor>>(`/doctors/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch doctor');
    }
  },

  // Create new doctor
  create: async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor> => {
    try {
      const response = await api.post<ApiResponse<Doctor>>('/doctors', doctor);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to create doctor');
    }
  },

  // Update doctor
  update: async (id: string, doctor: Partial<Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Doctor> => {
    try {
      const response = await api.put<ApiResponse<Doctor>>(`/doctors/${id}`, doctor);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to update doctor');
    }
  },

  // Delete doctor
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/doctors/${id}`);
    } catch (error) {
      throw new Error('Failed to delete doctor');
    }
  },

  // Get total count
  getCount: async (): Promise<number> => {
    try {
      const response = await api.get<ApiResponse<{ count: number }>>('/doctors/count');
      return response.data.data.count;
    } catch (error) {
      throw new Error('Failed to get doctor count');
    }
  },
};