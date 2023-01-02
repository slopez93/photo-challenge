import { ProductId } from "../valueObjects/ProductId";
import { ProductPrice } from "../valueObjects/ProductPrice";

type Params = {
  id?: string;
  name: string;
  price: number;
  description: string;
};

export class Product {
  public id: ProductId;
  public name: string;
  public price: ProductPrice;
  public description: string;

  constructor(
    id: ProductId,
    name: string,
    price: ProductPrice,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  static create({ id, name, price, description }: Params) {
    return new Product(
      ProductId.create(id),
      name,
      ProductPrice.create(price),
      description
    );
  }
}
