import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated, ensureAdmin);
specificationsRoutes.post('/', createSpecificationController.handle);
