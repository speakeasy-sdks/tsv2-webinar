import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { Cat$ } from "@speakeasy-sdks/super-sdk/models/components/cat.js";
import { Dog$ } from "@speakeasy-sdks/super-sdk/models/components/dog.js";

export const handlers = [
  http.post("http://localhost:35123/adopt", () => {
    const pet = faker.helpers.arrayElement(["cat", "dog"]);

    return HttpResponse.json(pet === "cat" ? fakeCat() : fakeDog());
  }),
];

function fakeCat(): Cat$.Inbound {
  return {
    id: faker.string.hexadecimal({ length: 6, prefix: "", casing: "lower" }),
    name: faker.person.firstName(),
    type: "cat",
    preferred_food: faker.helpers.arrayElement(["wet food", "dry food"]),
  };
}

function fakeDog(): Dog$.Inbound {
  return {
    id: faker.string.hexadecimal({ length: 6, prefix: "", casing: "lower" }),
    name: faker.person.firstName(),
    type: "dog",
    favorite_toy: faker.helpers.arrayElement(["squeeky duck", "tennis ball"]),
  };
}
