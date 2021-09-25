import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
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

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
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

    const cars = await listAvailableCarsUseCase.execute({
      name: 'A1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
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

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'testing_category',
    });

    expect(cars).toEqual([car]);
  });
});
