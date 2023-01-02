import { createMap, forMember, mapFrom } from "@automapper/core";
import type { Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { ProductDto } from "../dtos/ProductDto";
import { Product } from "../../domain/entities/Product";
import { ProductId } from "../../domain/valueObjects/ProductId";
import { ProductPrice } from "../../domain/valueObjects/ProductPrice";

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ProductDto,
        Product,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => ProductId.create(source.id))
        ),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)
        ),
        forMember(
          (destination) => destination.price,
          mapFrom((source) => ProductPrice.create(source.price))
        )
      );

      createMap(
        mapper,
        Product,
        ProductDto,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id.toString())
        ),
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)
        ),
        forMember(
          (destination) => destination.price,
          mapFrom((source) => source.price.value)
        )
      );
    };
  }
}
