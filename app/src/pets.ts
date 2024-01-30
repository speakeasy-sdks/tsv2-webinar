import { setupServer } from "msw/node";
import { handlers } from "./mocks/pets.js";
setupServer(...handlers).listen();

import { SDK } from "@speakeasy-sdks/super-sdk";

const sdk = new SDK();

const result = await sdk.pets.adopt();

switch (result.pet?.type) {
  case "cat":
    console.log(
      `🐱 You adopted ${result.pet.name} who likes ${result.pet.preferredFood}`
    );
    break;
  case "dog":
    console.log(
      `🐶 You adopted ${result.pet.name} who likes ${result.pet.favoriteToy}`
    );
    break;
}
