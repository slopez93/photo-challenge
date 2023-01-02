import { AdvertisementRepository } from "src/modules/advertisement/domain/repositories/AdvertisementRepository";
import { AdvertisementMother } from "src/modules/advertisement/domain/__tests__/AdvertisementMother";
import { anyString, instance, mock, reset, verify, when } from "ts-mockito";
import { FindAdvertisementQuery } from "../../query/FindAdvertisementQuery";
import { FindAdvertisementQueryHandler } from "../FindAdvertisementQueryHandler";

describe("Test UpdateAdvertisementCommandHandler", () => {
  const mockRepository = mock<AdvertisementRepository>();

  afterEach(() => {
    reset(mockRepository);
  });

  test("when not exist advertisement then throw error", async () => {
    const advertisement = AdvertisementMother.create({});

    when(mockRepository.find(anyString(), anyString())).thenResolve(undefined);

    const repository = instance(mockRepository);

    const queryHandler = new FindAdvertisementQueryHandler(repository);

    try {
      await queryHandler.execute(
        new FindAdvertisementQuery(
          advertisement.productId.value,
          advertisement.id.value
        )
      );
    } catch (error) {
      expect(error.message).toEqual(
        `Advertisement with id ${advertisement.id.value} not found`
      );
    }

    verify(mockRepository.find(anyString(), anyString())).once();
  });
});
