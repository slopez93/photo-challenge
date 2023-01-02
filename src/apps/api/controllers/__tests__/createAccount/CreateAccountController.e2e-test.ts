import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "src/shared/infrastructure/nest/app.module";
import { CreateAdvertisementRequest } from "../../createAdvertisement/CreateAdvertisementRequest";

describe("CreateAdvertisementController e2e test", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("when post to /account then create account and return it", async () => {
    const createAdvertisementRequest: CreateAdvertisementRequest = {
      title: "New Advertisement",
      validUntil: "2023-01-02T10:05:37.901Z",
      discountPercentage: 0,
    };
    const { status } = await request(app.getHttpServer())
      .post(`/products/3a3399d8-4bfd-4398-9c4a-a64230bfd4a7/advertisements`)
      .send(createAdvertisementRequest);

    expect(status).toEqual(201);
  });
});
