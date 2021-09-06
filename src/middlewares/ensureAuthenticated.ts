import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from 'src/modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('Token is missing.');
  }
  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      'c83159ea57c9e22e01228f059ac836a8'
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new Error('User does not exist');
    }
    next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}
