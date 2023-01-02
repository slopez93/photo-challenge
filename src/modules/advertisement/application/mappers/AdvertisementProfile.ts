import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { ProductId } from "src/modules/product/domain/valueObjects/ProductId";
import { Advertisement } from "../../domain/entities/Advertisement";
import { AdvertisementId } from "../../domain/valueObjects/AdvertisementId";
import { AdvertisementDto } from "../dtos/AdvertisementDto";

@Injectable()
export class AdvertisementProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AdvertisementDto,
        Advertisement,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => AdvertisementId.create(source.id))
        ),
        forMember(
          (destination) => destination.productId,
          mapFrom((source) => ProductId.create(source.product_id))
        ),
        forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        ),
        forMember(
          (destination) => destination.validUntil,
          mapFrom((source) => new Date(source.valid_until))
        ),
        forMember(
          (destination) => destination.discountPercentage,
          mapFrom((source) => source.discount_percentage)
        )
      );

      createMap(
        mapper,
        Advertisement,
        AdvertisementDto,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id.value)
        ),
        forMember(
          (destination) => destination.product_id,
          mapFrom((source) => source.productId.value)
        ),
        forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        ),
        forMember(
          (destination) => destination.valid_until,
          mapFrom((source) => source.validUntil.toISOString())
        ),
        forMember(
          (destination) => destination.discount_percentage,
          mapFrom((source) => source.discountPercentage)
        )
      );
    };
  }
}
