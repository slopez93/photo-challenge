import { Advertisement } from "src/modules/advertisement/domain/entities/Advertisement";
import { AdvertisementRepository } from "src/modules/advertisement/domain/repositories/AdvertisementRepository";
import { AdvertisementMother } from "src/modules/advertisement/domain/__tests__/AdvertisementMother";
import { anyOfClass, instance, mock, reset, verify, when } from "ts-mockito";
import { CreateAdvertisementCommand } from "../../command/CreateAdvertisementCommand";
import { CreateAdvertisementCommandHandler } from "../CreateAdvertisementCommandHandler";

describe("Test CreateAdvertisementCommandHandler", () => {
  const mockRepository = mock<AdvertisementRepository>();

  afterEach(() => {
    reset(mockRepository);
  });

  test("when create new advertisment then call to repository", async () => {
    const advertisement = AdvertisementMother.create({});

    when(mockRepository.save(anyOfClass(Advertisement))).thenResolve(undefined);

    const repository = instance(mockRepository);

    const commandHandler = new CreateAdvertisementCommandHandler(repository);

    await commandHandler.execute(
      new CreateAdvertisementCommand(
        advertisement.productId.value,
        advertisement.title,
        advertisement.validUntil,
        advertisement.discountPercentage
      )
    );

    verify(mockRepository.save(anyOfClass(Advertisement))).once();
  });
});
