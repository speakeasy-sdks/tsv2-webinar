import { setupServer } from "msw/node";
import { handlers } from "./mocks/banking.js";
setupServer(...handlers).listen();

import { SDK } from "@speakeasy-sdks/super-sdk";
import { Decimal } from "@speakeasy-sdks/super-sdk/types/index.js";

const sdk = new SDK();

const iter = await sdk.banking.listTransactions("acc123");

for await (const page of iter) {
  page.transactions?.results.map((transaction) => {
    const { accountId, createdAt, amount, currency } = transaction;
    const amt = new Decimal(amount);
    const sign = amt.gte(0) ? "<=" : "=>";
    const val = amt.abs();

    console.log(
      `[${createdAt.toISOString()}] ${accountId} ${sign} ${val} ${currency}`
    );
  });
}
