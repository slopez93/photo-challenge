import { AdvertisementMother } from "../../__tests__/AdvertisementMother";

describe("Test Advertisement entity", () => {
  test("when update title then check updated title", () => {
    const advertisement = AdvertisementMother.create({});

    advertisement.setTitle("Updated title");

    expect(advertisement.title).toBe("Updated title");
  });
});
