import { Request, Response, NextFunction } from 'express';
import { doctorService } from '../services/doctorService';
import { PaginationQuery, CreateDoctorDto, UpdateDoctorDto } from '../types';

export class DoctorController {
  // GET /api/doctors
  async getAll(
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit, search } = req.query;
      const result = await doctorService.getAll({ page, limit, search });
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/doctors/:id
  async getById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctor = await doctorService.getById(req.params.id);
      res.json({
        success: true,
        data: doctor,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/doctors
  async create(
    req: Request<{}, {}, CreateDoctorDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctor = await doctorService.create(req.body);
      res.status(201).json({
        success: true,
        data: doctor,
        message: 'Doctor created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/doctors/:id
  async update(
    req: Request<{ id: string }, {}, UpdateDoctorDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctor = await doctorService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: doctor,
        message: 'Doctor updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/doctors/:id
  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await doctorService.delete(req.params.id);
      res.status(204).json({
        success: true,
        message: 'Doctor deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/doctors/count
  async getCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const count = await doctorService.getCount();
      res.json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const doctorController = new DoctorController();