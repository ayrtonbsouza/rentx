import { Specification } from '../../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifations: Specification[];

  constructor() {
    this.specifations = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifations.push(specification);
  }

  list(): Specification[] {
    return this.specifations;
  }

  findByName(name: string): Specification {
    const specification = this.specifations.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}
