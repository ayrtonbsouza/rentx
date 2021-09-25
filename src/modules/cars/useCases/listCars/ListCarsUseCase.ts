import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  model?: string;
}

export class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, category_id, model }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      model
    );
    return cars;
  }
}
