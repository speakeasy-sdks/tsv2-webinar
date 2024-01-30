import { SDK } from "@speakeasy-sdks/super-sdk";
import { openAsBlob } from "node:fs";

async function run() {
  const sdk = new SDK();

  const result = await sdk.files.upload({
    file: await openAsBlob("./src/sample-file.txt"),
  });

  // Handle the result
  console.log(result);
}

run();
