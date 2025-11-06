import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Ambulance {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
}

export interface Doctor {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
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
}

// Ambulance API
export const ambulanceApi = {
  // Get all ambulances with pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Ambulance>> => {
    try {
      const response = await api.get(`/ambulances?_page=${page}&_limit=${limit}`);
      const total = parseInt(response.headers['x-total-count'] || '0');
      
      return {
        data: response.data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error('Failed to fetch ambulances');
    }
  },

  // Get ambulance by ID
  getById: async (id: string): Promise<Ambulance> => {
    try {
      const response = await api.get(`/ambulances/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch ambulance');
    }
  },

  // Create new ambulance
  create: async (ambulance: Omit<Ambulance, 'id'>): Promise<Ambulance> => {
    try {
      const response = await api.post('/ambulances', ambulance);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create ambulance');
    }
  },

  // Update ambulance
  update: async (id: string, ambulance: Partial<Omit<Ambulance, 'id'>>): Promise<Ambulance> => {
    try {
      const response = await api.patch(`/ambulances/${id}`, ambulance);
      return response.data;
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
      const response = await api.get('/ambulances');
      return response.data.length;
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
      const response = await api.get(`/doctors?_page=${page}&_limit=${limit}`);
      const total = parseInt(response.headers['x-total-count'] || '0');
      
      return {
        data: response.data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error('Failed to fetch doctors');
    }
  },

  // Get doctor by ID
  getById: async (id: string): Promise<Doctor> => {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctor');
    }
  },

  // Create new doctor
  create: async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
    try {
      const response = await api.post('/doctors', doctor);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create doctor');
    }
  },

  // Update doctor
  update: async (id: string, doctor: Partial<Omit<Doctor, 'id'>>): Promise<Doctor> => {
    try {
      const response = await api.patch(`/doctors/${id}`, doctor);
      return response.data;
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
      const response = await api.get('/doctors');
      return response.data.length;
    } catch (error) {
      throw new Error('Failed to get doctor count');
    }
  },
};