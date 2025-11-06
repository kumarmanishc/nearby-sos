import { database } from '../utils/database';
import { paginate, validatePaginationParams, PaginationOptions } from '../utils/pagination';
import { Ambulance, CreateAmbulanceDto, UpdateAmbulanceDto, PaginatedResponse } from '../types';

export class AmbulanceService {
  async getAll(params: {
    page?: string;
    limit?: string;
    search?: string;
  }): Promise<PaginatedResponse<Ambulance>> {
    const { page, limit } = validatePaginationParams(params.page, params.limit);
    const ambulances = database.getAllAmbulances();
    
    return paginate(ambulances, {
      page,
      limit,
      search: params.search,
    });
  }

  async getById(id: string): Promise<Ambulance> {
    const ambulance = database.getAmbulanceById(id);
    if (!ambulance) {
      throw new Error('Ambulance not found');
    }
    return ambulance;
  }

  async create(data: CreateAmbulanceDto): Promise<Ambulance> {
    // Validate required fields
    if (!data.title || !data.description || !data.location) {
      throw new Error('Title, description, and location are required');
    }

    return database.createAmbulance(data);
  }

  async update(id: string, data: UpdateAmbulanceDto): Promise<Ambulance> {
    const ambulance = database.updateAmbulance(id, data);
    if (!ambulance) {
      throw new Error('Ambulance not found');
    }
    return ambulance;
  }

  async delete(id: string): Promise<void> {
    const deleted = database.deleteAmbulance(id);
    if (!deleted) {
      throw new Error('Ambulance not found');
    }
  }

  async getCount(): Promise<number> {
    return database.getAmbulanceCount();
  }
}

export const ambulanceService = new AmbulanceService();