import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Product } from "../../domain/entities/Product";
import { ProductNotFound } from "../../domain/exceptions/ProductNotFound";
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from "../../domain/repositories/ProductRepository";
import { FindProductQuery } from "../query/FindProductQuery";

@QueryHandler(FindProductQuery)
export class FindProductQueryHandler
  implements IQueryHandler<FindProductQuery>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private repository: ProductRepository
  ) {}

  async execute({ id }: FindProductQuery): Promise<Product> {
    const account = await this.repository.findById(id);

    if (!account) {
      throw new ProductNotFound(id);
    }

    return account;
  }
}
