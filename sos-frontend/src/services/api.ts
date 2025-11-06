import { ApiURLs } from '@/config';
import axios from 'axios';

const api = axios.create({
  baseURL: ApiURLs.BASE,
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


/**
 * @description Generic API service for a given resource
 * 
 * @param resourceURL /doctors or ${resourceURL} etc.
 * @returns 
 */

const ApiService = <T>(resourceURL: string) => ({
  // Get all resources with pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<T>> => {
    try {
      const response = await api.get(`${resourceURL}?_page=${page}&_limit=${limit}`);

      // Get total count from separate call if header not available
      let total = parseInt(response.headers['x-total-count'] || '0');
      if (total === 0) {
        const allResponse = await api.get(resourceURL);
        total = allResponse.data.length;
      }

      return {
        data: response.data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error('Failed to fetch resources');
    }
  },

  // Get resource by ID
  getById: async (id: string): Promise<T> => {
    try {
      const response = await api.get(`${resourceURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resource');
    }
  },

  // Create new resource
  create: async (resource: Omit<T, 'id'>): Promise<T> => {
    try {
      const response = await api.post(resourceURL, resource);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create resource');
    }
  },

  // Update resource
  update: async (id: string, resource: Partial<Omit<T, 'id'>>): Promise<T> => {
    try {
      const response = await api.patch(`${resourceURL}/${id}`, resource);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update resource');
    }
  },

  // Delete resource
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`${resourceURL}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete resource');
    }
  },

  // Get total count
  getCount: async (): Promise<number> => {
    try {
      const response = await api.get(resourceURL);
      return response.data.length;
    } catch (error) {
      throw new Error('Failed to get resource ');
    }
  },
});