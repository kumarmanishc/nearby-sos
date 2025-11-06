import { Router } from 'express';
import { ambulanceController } from '../controllers/ambulanceController';
import {
  validateCreateAmbulance,
  validateUpdateAmbulance,
  validateId,
  validatePagination,
} from '../middleware/validation';

const router = Router();

// GET /api/ambulances
router.get('/', validatePagination, ambulanceController.getAll.bind(ambulanceController));

// GET /api/ambulances/count
router.get('/count', ambulanceController.getCount.bind(ambulanceController));

// GET /api/ambulances/:id
router.get('/:id', validateId, ambulanceController.getById.bind(ambulanceController));

// POST /api/ambulances
router.post('/', validateCreateAmbulance, ambulanceController.create.bind(ambulanceController));

// PUT /api/ambulances/:id
router.put('/:id', validateId, validateUpdateAmbulance, ambulanceController.update.bind(ambulanceController));

// DELETE /api/ambulances/:id
router.delete('/:id', validateId, ambulanceController.delete.bind(ambulanceController));

export default router;