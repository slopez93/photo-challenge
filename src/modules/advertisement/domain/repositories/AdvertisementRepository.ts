import { Advertisement } from "../entities/Advertisement";

export const ADVERTISEMENT_REPOSITORY = "ADVERTISEMENT_REPOSITORY";

export interface AdvertisementRepository {
  save(advertisement: Advertisement): Promise<void>;
  find(productId: string, adversitmentId: string): Promise<Advertisement>;
  findAll(productId: string): Promise<Advertisement[]>;
  delete(productId: string, adversitmentId: string): Promise<void>;
}
