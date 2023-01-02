import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FindProductsQuery } from "src/modules/product/application/query/FindProductsQuery";

@Controller()
export class FindProductsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getAccount() {
    const products = await this.queryBus.execute(new FindProductsQuery());

    return products;
  }
}
