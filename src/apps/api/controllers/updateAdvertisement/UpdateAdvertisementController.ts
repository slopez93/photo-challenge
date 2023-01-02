import { Body, Controller, Param, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { UpdateAdvertisementCommand } from "src/modules/advertisement/application/command/UpdateAdvertisementCommand";
import { UpdateAdvertisementRequest } from "./UpdateAdvertisementRequest";

type Params = {
  id: string;
  productId: string;
};

@Controller()
export class UpdateAdvertisementController {
  constructor(private commandBus: CommandBus) {}

  @Put(":productId/advertisements/:id")
  async createAccount(
    @Param() params: Params,
    @Body() body: UpdateAdvertisementRequest
  ) {
    const { id, productId } = params;
    const { title, validUntil, discountPercentage } = body;

    await this.commandBus.execute(
      new UpdateAdvertisementCommand(
        productId,
        id,
        title,
        validUntil,
        discountPercentage
      )
    );
  }
}
