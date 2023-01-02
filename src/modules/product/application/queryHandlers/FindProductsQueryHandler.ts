import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Product } from "../../domain/entities/Product";
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from "../../domain/repositories/ProductRepository";
import { ProductDto } from "../dtos/ProductDto";
import { FindProductsQuery } from "../query/FindProductsQuery";

@QueryHandler(FindProductsQuery)
export class FindProductsQueryHandler
  implements IQueryHandler<FindProductsQuery>
{
  constructor(
    @InjectMapper() private mapper: Mapper,
    @Inject(PRODUCT_REPOSITORY) private repository: ProductRepository
  ) {}

  async execute(): Promise<ProductDto[]> {
    const products = await this.repository.findAll();

    return this.mapper.mapArray(products, Product, ProductDto);
  }
}
