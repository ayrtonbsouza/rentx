import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC1D23',
      fine_amount: 50,
      brand: 'Car Brand',
      model: 'Car Model',
      category_id: 'Car Category',
    });

    const specifications_id = ['0987654321'];
    await createCarSpecification.execute({ car_id: car.id, specifications_id });
  });

  it('should not be able to add a new specification to a unexistent car', async () => {
    expect(async () => {
      const car_id = '1234567890';
      const specifications_id = ['0987654321'];
      await createCarSpecification.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
