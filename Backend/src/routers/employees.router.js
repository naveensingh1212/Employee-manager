import { Router } from 'express';
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employees.controller.js';

const router = Router();

// CRUD routes
router.get('/', getEmployees);       
router.get('/:id', getEmployee);    
router.post('/', addEmployee);       
router.put('/:id', updateEmployee);  
router.delete('/:id', deleteEmployee); 

export default router;
