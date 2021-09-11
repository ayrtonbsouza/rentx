import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create user session', async () => {
    const user: ICreateUserDTO = {
      driver_license: '1234567890',
      email: 'johndoe@test.com',
      password: '12345678',
      name: 'John Doe',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to create user session when user does not exists', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'not-existent@test.com',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user session when password is incorrect', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '1234567890',
        email: 'johndoe@test.com',
        password: '12345678',
        name: 'John Doe',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
