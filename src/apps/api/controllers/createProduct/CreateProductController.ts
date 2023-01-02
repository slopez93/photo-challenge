import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateProductCommand } from "src/modules/product/application/command/CreateProductCommand";
import { CreateProductRequest } from "./CreateProductRequest";

@Controller()
export class CreateProductController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createAccount(@Body() body: CreateProductRequest) {
    const { name, description, price } = body;

    await this.commandBus.execute(
      new CreateProductCommand(name, price, description)
    );
  }
}
