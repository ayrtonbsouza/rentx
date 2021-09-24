import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
