import { Product } from "../entities/Product";

export const PRODUCT_REPOSITORY = "PRODUCT_REPOSITORY";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  save(product: Product): Promise<void>;
}
