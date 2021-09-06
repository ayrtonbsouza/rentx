import { Router } from 'express';
import { AuthenticateUserController } from 'src/modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/authenticate', authenticateUserController.handle);
