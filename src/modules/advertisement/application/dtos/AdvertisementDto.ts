export class AdvertisementDto {
  constructor(
    public id: string,
    public product_id: string,
    public title: string,
    public valid_until: string,
    public discount_percentage: number
  ) {}
}
