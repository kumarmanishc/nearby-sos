import { database } from '../utils/database';
import { paginate, validatePaginationParams } from '../utils/pagination';
import { Doctor, CreateDoctorDto, UpdateDoctorDto, PaginatedResponse } from '../types';

export class DoctorService {
  async getAll(params: {
    page?: string;
    limit?: string;
    search?: string;
  }): Promise<PaginatedResponse<Doctor>> {
    const { page, limit } = validatePaginationParams(params.page, params.limit);
    const doctors = database.getAllDoctors();
    
    return paginate(doctors, {
      page,
      limit,
      search: params.search,
    });
  }

  async getById(id: string): Promise<Doctor> {
    const doctor = database.getDoctorById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async create(data: CreateDoctorDto): Promise<Doctor> {
    // Validate required fields
    if (!data.title || !data.description || !data.location) {
      throw new Error('Title, description, and location are required');
    }

    return database.createDoctor(data);
  }

  async update(id: string, data: UpdateDoctorDto): Promise<Doctor> {
    const doctor = database.updateDoctor(id, data);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async delete(id: string): Promise<void> {
    const deleted = database.deleteDoctor(id);
    if (!deleted) {
      throw new Error('Doctor not found');
    }
  }

  async getCount(): Promise<number> {
    return database.getDoctorCount();
  }
}

export const doctorService = new DoctorService();