import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { AdvertisementDto } from "../../application/dtos/AdvertisementDto";
import { Advertisement } from "../../domain/entities/Advertisement";
import { AdvertisementRepository } from "../../domain/repositories/AdvertisementRepository";

@Injectable()
export class DynamoDbAdvertisementRepository
  implements AdvertisementRepository
{
  private readonly tableName: string;

  constructor(
    private dynamoDb: DynamoDbClient,
    @InjectMapper() private mapper: Mapper
  ) {
    this.tableName = process.env.PHOTOBOX_TABLE;
  }

  public async find(
    productId: string,
    adversitmentId: string
  ): Promise<Advertisement> {
    const dynamoDbConfig = {
      KeyConditionExpression: "PK = :productId AND SK = :advertisementId",
      ExpressionAttributeValues: {
        ":productId": `PRODUCT#${productId}`,
        ":advertisementId": `ADVERTISEMENT#${adversitmentId}`,
      },
      TableName: this.tableName,
    };

    const dbItems = await this.dynamoDb.client.query(dynamoDbConfig);

    if (!dbItems.Items || dbItems.Items?.length === 0) {
      return;
    }

    const dbItem = dbItems.Items[0];

    return this.mapper.map(dbItem, AdvertisementDto, Advertisement);
  }

  public async findAll(productId: string): Promise<Advertisement[]> {
    const dynamoDbConfig = {
      KeyConditionExpression: "PK = :productId AND begins_with(SK, :filter)",
      ExpressionAttributeValues: {
        ":productId": `PRODUCT#${productId}`,
        ":filter": "ADVERTISEMENT#",
      },
      TableName: this.tableName,
    };

    const dbItems = await this.dynamoDb.client.query(dynamoDbConfig);

    if (!dbItems.Items || dbItems.Items.length === 0) {
      return [];
    }

    return this.mapper.mapArray(dbItems.Items, AdvertisementDto, Advertisement);
  }

  public async save(advertisement: Advertisement): Promise<void> {
    const advertisementId = advertisement.id.toString();
    const productId = advertisement.productId.toString();

    const dynamoDbConfig = {
      Item: {
        PK: `PRODUCT#${productId}`,
        SK: `ADVERTISEMENT#${advertisementId}`,
        id: advertisementId,
        product_id: productId,
        title: advertisement.title,
        valid_until: advertisement.validUntil.toISOString(),
        discount_percentage: advertisement.discountPercentage,
      },
      TableName: this.tableName,
    };

    await this.dynamoDb.client.put(dynamoDbConfig);
  }

  public async delete(
    productId: string,
    adversitmentId: string
  ): Promise<void> {
    const dynamoDbConfig = {
      Key: {
        PK: `PRODUCT#${productId}`,
        SK: `ADVERTISEMENT#${adversitmentId}`,
      },
      TableName: this.tableName,
    };

    await this.dynamoDb.client.delete(dynamoDbConfig);
  }
}
