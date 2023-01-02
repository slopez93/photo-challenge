import { Controller, Delete, Param } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { DeleteAdvertisementCommand } from "src/modules/advertisement/application/command/DeleteAdvertisementCommand";

type Params = {
  productId: string;
  id: string;
};

@Controller()
export class DeleteAdvertisementsController {
  constructor(private commandBus: CommandBus) {}

  @Delete(":productId/advertisements/:id")
  async getAccount(@Param() params: Params) {
    const { id, productId } = params;

    await this.commandBus.execute(
      new DeleteAdvertisementCommand(productId, id)
    );
  }
}
