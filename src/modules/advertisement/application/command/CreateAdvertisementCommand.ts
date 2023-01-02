export class CreateAdvertisementCommand {
  constructor(
    public productId: string,
    public title: string,
    public validUntil: Date,
    public discountPercentage: number
  ) {}
}
