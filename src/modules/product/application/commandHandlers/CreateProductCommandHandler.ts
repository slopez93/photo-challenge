import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Product } from "../../domain/entities/Product";
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from "../../domain/repositories/ProductRepository";
import { CreateProductCommand } from "../command/CreateProductCommand";

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private repository: ProductRepository
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { name, price, description } = command;

    const product = Product.create({ name, price, description });

    await this.repository.save(product);

    return product;
  }
}
