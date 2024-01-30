/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SDK_METADATA, SDKOptions, serverURLFromOptions } from "../lib/config";
import { HTTPClient } from "../lib/http";
import { ClientSDK, RequestOptions } from "../lib/sdks";
import * as components from "../models/components";
import * as errors from "../models/errors";
import * as operations from "../models/operations";
import { isBlobLike } from "../types";

export class Files extends ClientSDK {
    private readonly options$: SDKOptions;

    constructor(options: SDKOptions = {}) {
        super({
            client: options.httpClient || new HTTPClient(),
            baseURL: serverURLFromOptions(options),
        });

        this.options$ = options;
        void this.options$;
    }
    async upload(
        input: components.UploadForm,
        options?: RequestOptions
    ): Promise<operations.UploadResponse> {
        const headers$ = new Headers();
        headers$.set("user-agent", SDK_METADATA.userAgent);
        headers$.set("Accept", "application/json");

        const payload$ = components.UploadForm$.outboundSchema.parse(input);
        const body$ = new FormData();

        if (isBlobLike(payload$.file)) {
            body$.append("file", payload$.file);
        } else {
            body$.append(
                "file",
                new Blob([payload$.file.content], { type: "application/octet-stream" }),
                payload$.file.fileName
            );
        }
        if (payload$.path !== undefined) {
            body$.append("path", payload$.path);
        }

        const path$ = this.templateURLComponent("/upload")();

        const response = await this.fetch$(
            { method: "POST", path: path$, headers: headers$, body: body$ },
            options
        );

        const responseFields$ = {
            ContentType: response.headers.get("content-type") ?? "application/octet-stream",
            StatusCode: response.status,
            RawResponse: response,
        };

        if (this.matchResponse(response, 200, "application/json")) {
            const responseBody = await response.json();
            const result = operations.UploadResponse$.inboundSchema.parse({
                ...responseFields$,
                UploadResult: responseBody,
            });
            return result;
        } else {
            const responseBody = await response.text();
            throw new errors.SDKError("Unexpected API response", response, responseBody);
        }
    }
}
