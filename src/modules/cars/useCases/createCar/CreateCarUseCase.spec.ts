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
    await createCarUseCase.execute({
      name: 'Azera',
      description: 'Premium Sedan',
      daily_rate: 350,
      license_plate: 'ABC1D23',
      fine_amount: 100,
      brand: 'Hyundai',
      model: 'GLS 3.3 265cv',
      category_id: 'Sedan',
    });
  });
});
