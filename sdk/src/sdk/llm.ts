/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SDK_METADATA, SDKOptions, serverURLFromOptions } from "../lib/config";
import * as enc$ from "../lib/encodings";
import { HTTPClient } from "../lib/http";
import { ClientSDK, RequestOptions } from "../lib/sdks";
import * as components from "../models/components";
import * as errors from "../models/errors";
import * as operations from "../models/operations";

export class Llm extends ClientSDK {
    private readonly options$: SDKOptions;

    constructor(options: SDKOptions = {}) {
        super({
            client: options.httpClient || new HTTPClient(),
            baseURL: serverURLFromOptions(options),
        });

        this.options$ = options;
        void this.options$;
    }
    async chat(
        input: components.ChatRequest,
        options?: RequestOptions & { serverURL?: string }
    ): Promise<operations.ChatResponse> {
        const headers$ = new Headers();
        headers$.set("user-agent", SDK_METADATA.userAgent);
        headers$.set("Content-Type", "application/json");
        headers$.set("Accept", "text/event-stream");

        const payload$ = components.ChatRequest$.outboundSchema.parse(input);
        const body$ = enc$.encodeJSON("body", payload$, { explode: true });

        const path$ = this.templateURLComponent("/completion")();

        const baseURL$ =
            options?.serverURL ||
            this.templateURLComponent(operations.ChatServerList[0], { charEncoding: "percent" })();

        const response = await this.fetch$(
            { method: "POST", baseURL: baseURL$, path: path$, headers: headers$, body: body$ },
            options
        );

        const responseFields$ = {
            ContentType: response.headers.get("content-type") ?? "application/octet-stream",
            StatusCode: response.status,
            RawResponse: response,
        };

        if (this.matchResponse(response, 200, "text/event-stream")) {
            const result = operations.ChatResponse$.inboundSchema.parse({
                ...responseFields$,
                ChatStream: response.body,
            });
            return result;
        } else {
            const responseBody = await response.text();
            throw new errors.SDKError("Unexpected API response", response, responseBody);
        }
    }
}
