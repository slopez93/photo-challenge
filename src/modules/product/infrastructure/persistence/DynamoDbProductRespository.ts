import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { ProductDto } from "../../application/dtos/ProductDto";
import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

@Injectable()
export class DynamoDbAccountRepository implements ProductRepository {
  private readonly tableName: string;

  constructor(
    private dynamoDb: DynamoDbClient,
    @InjectMapper() private mapper: Mapper
  ) {
    if (!process.env.PHOTOBOX_TABLE) {
      throw new Error("Invalid table name");
    }
    this.tableName = process.env.PHOTOBOX_TABLE;
  }

  public async findAll(): Promise<Product[]> {
    const dynamoDbConfig = {
      FilterExpression: "begins_with(PK, :filter) AND begins_with(SK, :filter)",
      ExpressionAttributeValues: {
        ":filter": `PRODUCT#`,
      },
      TableName: this.tableName,
    };

    const dbItems = await this.dynamoDb.client.scan(dynamoDbConfig);

    if (!dbItems.Items || dbItems.Items.length === 0) {
      return [];
    }

    return this.mapper.mapArray(dbItems.Items, ProductDto, Product);
  }

  public async findById(productId: string): Promise<Product> {
    const dynamoDbConfig = {
      KeyConditionExpression: "PK = :productId",
      ExpressionAttributeValues: {
        ":productId": `PRODUCT#${productId}`,
      },
      TableName: this.tableName,
    };

    const dbItems = await this.dynamoDb.client.query(dynamoDbConfig);

    if (!dbItems.Items || dbItems.Items?.length === 0) {
      return;
    }

    const dbItem = dbItems.Items[0];

    return this.mapper.map(dbItem[0], ProductDto, Product);
  }

  public async save(product: Product): Promise<void> {
    const productId = product.id.toString();

    const dynamoDbConfig = {
      Item: {
        PK: `PRODUCT#${productId}`,
        SK: `PRODUCT#${productId}`,
        id: productId,
        name: product.name,
        price: product.price.value,
        description: product.description,
      },
      TableName: this.tableName,
    };

    console.log(dynamoDbConfig);

    await this.dynamoDb.client.put(dynamoDbConfig);
  }
}
