export class ProductPrice {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number) {
    if (value <= 0) {
      throw new Error("Product cash should be greater than 0");
    }

    return new ProductPrice(value);
  }
}
