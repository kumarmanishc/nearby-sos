import { Router } from 'express';
import { doctorController } from '../controllers/doctorController';
import {
  validateCreateDoctor,
  validateUpdateDoctor,
  validateId,
  validatePagination,
} from '../middleware/validation';

const router = Router();

// GET /api/doctors
router.get('/', validatePagination, doctorController.getAll.bind(doctorController));

// GET /api/doctors/count
router.get('/count', doctorController.getCount.bind(doctorController));

// GET /api/doctors/:id
router.get('/:id', validateId, doctorController.getById.bind(doctorController));

// POST /api/doctors
router.post('/', validateCreateDoctor, doctorController.create.bind(doctorController));

// PUT /api/doctors/:id
router.put('/:id', validateId, validateUpdateDoctor, doctorController.update.bind(doctorController));

// DELETE /api/doctors/:id
router.delete('/:id', validateId, doctorController.delete.bind(doctorController));

export default router;