import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'testing_category',
      daily_rate: 400,
      description: 'Hatchback Compacto',
      fine_amount: 150,
      license_plate: 'ABC1D23',
      model: 'Sportback',
      name: 'A1',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by model', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'testing_category',
      daily_rate: 400,
      description: 'Hatchback Compacto',
      fine_amount: 150,
      license_plate: 'ABC1D23',
      model: 'Sportback',
      name: 'A1',
    });

    const cars = await listCarsUseCase.execute({
      model: 'A1',
    });

    expect(cars).toEqual([car]);
  });
});
