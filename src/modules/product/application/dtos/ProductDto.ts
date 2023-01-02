export class ProductDto {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string
  ) {}
}
