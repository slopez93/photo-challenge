export class CreateProductCommand {
  constructor(
    public name: string,
    public price: number,
    public description: string
  ) {}
}
