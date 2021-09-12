import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC1D23',
      fine_amount: 50,
      brand: 'Car Brand',
      model: 'Car Model',
      category_id: 'Car Category',
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car when the provided license plate is already taken', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name [1]',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'ABC1D23',
        fine_amount: 50,
        brand: 'Car Brand',
        model: 'Car Model',
        category_id: 'Car Category',
      });

      await createCarUseCase.execute({
        name: 'Car Name [2]',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'ABC1D23',
        fine_amount: 50,
        brand: 'Car Brand',
        model: 'Car Model',
        category_id: 'Car Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to get availability field as true by default when a new car is created', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC1D23',
      fine_amount: 50,
      brand: 'Car Brand',
      model: 'Car Model',
      category_id: 'Car Category',
    });
    expect(car.available).toBe(true);
  });
});
