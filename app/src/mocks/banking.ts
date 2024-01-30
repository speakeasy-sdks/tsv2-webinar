import { Transactions$ } from "@speakeasy-sdks/super-sdk/models/components/transactions.js";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import {
  Currency,
  Transaction$,
} from "@speakeasy-sdks/super-sdk/models/components/transaction.js";

export const handlers = [
  http.get(
    "http://localhost:35123/accounts/:id/transactions",
    ({ request, params }) => {
      const { id } = params;

      const url = new URL(request.url);
      const rawCursor = url.searchParams.get("cursor") ?? "0";
      const cursor = parseInt(rawCursor, 10);
      if (cursor > 3) {
        return HttpResponse.json({
          next: null,
          results: [],
        } satisfies Transactions$.Inbound);
      }

      const fixture: Transactions$.Inbound = {
        next: `${cursor + 1}`,
        results: Array.from({ length: 5 }).map(() => fakeTransaction(`${id}`)),
      };

      return HttpResponse.json(fixture);
    }
  ),
];

function fakeTransaction(accountId: string): Transaction$.Inbound {
  return {
    id: faker.string.hexadecimal({ length: 6, prefix: "", casing: "lower" }),
    created_at: faker.date.past().toISOString(),
    account_id: accountId,
    amount: faker.number
      .float({ min: -100, max: 100, fractionDigits: 2 })
      .toString(),
    currency: faker.helpers.arrayElement([
      Currency.Eur,
      Currency.Usd,
      Currency.Gbp,
    ]),
  };
}
