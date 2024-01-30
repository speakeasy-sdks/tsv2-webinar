<!-- Start SDK Example Usage [usage] -->
```typescript
import { SDK } from "@speakeasy-sdks/super-sdk";

async function run() {
    const sdk = new SDK();

    const result = await sdk.pets.adopt();

    // Handle the result
    console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->