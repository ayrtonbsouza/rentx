import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Password e/or e-mail is incorrect.');
    }
    const passwordIsCorrect = await compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new AppError('Password e/or e-mail is incorrect.');
    }
    const token = sign({}, 'c83159ea57c9e22e01228f059ac836a8', {
      subject: user.id,
      expiresIn: '1d',
    });
    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenResponse;
  }
}
