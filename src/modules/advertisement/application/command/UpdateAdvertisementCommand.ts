export class UpdateAdvertisementCommand {
  constructor(
    public productId: string,
    public advertisementId: string,
    public title: string,
    public validUntil: string,
    public discountPercentage: number
  ) {}
}
