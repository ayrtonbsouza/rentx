import { Router } from 'express';
import { CreateUserController } from 'src/modules/accounts/useCases/CreateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);
