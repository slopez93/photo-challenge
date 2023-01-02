import { QueryBus } from "@nestjs/cqrs";
import { Advertisement } from "src/modules/advertisement/domain/entities/Advertisement";
import { AdvertisementRepository } from "src/modules/advertisement/domain/repositories/AdvertisementRepository";
import { AdvertisementMother } from "src/modules/advertisement/domain/__tests__/AdvertisementMother";
import {
  anyOfClass,
  anyString,
  instance,
  mock,
  reset,
  verify,
  when,
} from "ts-mockito";
import { UpdateAdvertisementCommand } from "../../command/UpdateAdvertisementCommand";
import { FindAdvertisementQuery } from "../../query/FindAdvertisementQuery";
import { UpdateAdvertisementCommandHandler } from "../UpdateAdvertisementCommandHandler";

describe("Test UpdateAdvertisementCommandHandler", () => {
  const mockRepository = mock<AdvertisementRepository>();
  const mockQueryBus = mock<QueryBus>();

  afterEach(() => {
    reset(mockRepository);
  });

  test("when update title then check save repository", async () => {
    const advertisement = AdvertisementMother.create({});

    when(mockQueryBus.execute(anyOfClass(FindAdvertisementQuery))).thenResolve(
      advertisement
    );
    when(mockRepository.save(anyOfClass(Advertisement))).thenResolve(undefined);

    const repository = instance(mockRepository);
    const queryBus = instance(mockQueryBus);

    const commandHandler = new UpdateAdvertisementCommandHandler(
      repository,
      queryBus
    );

    await commandHandler.execute(
      new UpdateAdvertisementCommand(
        advertisement.productId.value,
        advertisement.id.value,
        "Updated title",
        advertisement.validUntil.toISOString(),
        advertisement.discountPercentage
      )
    );

    expect(advertisement.title).toEqual("Updated title");
    verify(mockRepository.save(anyOfClass(Advertisement))).once();
  });
});
