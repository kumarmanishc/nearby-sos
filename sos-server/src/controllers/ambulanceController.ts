import { Request, Response, NextFunction } from 'express';
import { ambulanceService } from '../services/ambulanceService';
import { PaginationQuery, CreateAmbulanceDto, UpdateAmbulanceDto } from '../types';

export class AmbulanceController {
  // GET /api/ambulances
  async getAll(
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit, search } = req.query;
      const result = await ambulanceService.getAll({ page, limit, search });
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/ambulances/:id
  async getById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ambulance = await ambulanceService.getById(req.params.id);
      res.json({
        success: true,
        data: ambulance,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/ambulances
  async create(
    req: Request<{}, {}, CreateAmbulanceDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ambulance = await ambulanceService.create(req.body);
      res.status(201).json({
        success: true,
        data: ambulance,
        message: 'Ambulance created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/ambulances/:id
  async update(
    req: Request<{ id: string }, {}, UpdateAmbulanceDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ambulance = await ambulanceService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: ambulance,
        message: 'Ambulance updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/ambulances/:id
  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await ambulanceService.delete(req.params.id);
      res.status(204).json({
        success: true,
        message: 'Ambulance deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/ambulances/count
  async getCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const count = await ambulanceService.getCount();
      res.json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const ambulanceController = new AmbulanceController();