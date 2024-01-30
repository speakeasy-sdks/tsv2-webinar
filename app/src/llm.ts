import { SDK } from "@speakeasy-sdks/super-sdk";

const sdk = new SDK();

const result = await sdk.llm.chat({
  prompt: "How do I create a great developer experience when building an SDK?",
  stream: true,
});

const stream = result.chatStream || [];

for await (const event of stream) {
  if (event.data === "[DONE]") {
    console.log("\n<end of chat>\n");
    break;
  }

  process.stdout.write(event.data.content || "");
}
