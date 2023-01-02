import { Body, Controller, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateAdvertisementCommand } from "src/modules/advertisement/application/command/CreateAdvertisementCommand";
import { CreateAdvertisementRequest } from "./CreateAdvertisementRequest";

type Params = {
  id: string;
  productId: string;
};

@Controller()
export class CreateAdvertisementController {
  constructor(private commandBus: CommandBus) {}

  @Post(":productId/advertisements")
  async createAccount(
    @Param() params: Params,
    @Body() body: CreateAdvertisementRequest
  ) {
    const { productId } = params;
    const { title, validUntil, discountPercentage } = body;

    await this.commandBus.execute(
      new CreateAdvertisementCommand(
        productId,
        title,
        new Date(validUntil),
        discountPercentage
      )
    );
  }
}
