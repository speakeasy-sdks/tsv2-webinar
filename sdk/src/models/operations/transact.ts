/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import * as components from "../../models/components";
import { Decimal as Decimal$ } from "../../types";
import { z } from "zod";

export enum Currency {
    Usd = "USD",
    Eur = "EUR",
    Gbp = "GBP",
}

export type TransactRequestBody = {
    currency: Currency;
    amount: Decimal$ | number;
};

export type TransactRequest = {
    id: string;
    requestBody: TransactRequestBody;
};

export type TransactResponse = {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * HTTP response status code for this operation
     */
    statusCode: number;
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse: Response;
    /**
     * OK
     */
    transaction?: components.Transaction | undefined;
};

/** @internal */
export const Currency$ = z.nativeEnum(Currency);

/** @internal */
export namespace TransactRequestBody$ {
    export type Inbound = {
        currency: Currency;
        amount: string;
    };

    export const inboundSchema: z.ZodType<TransactRequestBody, z.ZodTypeDef, Inbound> = z
        .object({
            currency: Currency$,
            amount: z.string().transform((v) => new Decimal$(v)),
        })
        .transform((v) => {
            return {
                currency: v.currency,
                amount: v.amount,
            };
        });

    export type Outbound = {
        currency: Currency;
        amount: string;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, TransactRequestBody> = z
        .object({
            currency: Currency$,
            amount: z.union([z.instanceof(Decimal$), z.number()]).transform((v) => `${v}`),
        })
        .transform((v) => {
            return {
                currency: v.currency,
                amount: v.amount,
            };
        });
}

/** @internal */
export namespace TransactRequest$ {
    export type Inbound = {
        id: string;
        RequestBody: TransactRequestBody$.Inbound;
    };

    export const inboundSchema: z.ZodType<TransactRequest, z.ZodTypeDef, Inbound> = z
        .object({
            id: z.string(),
            RequestBody: z.lazy(() => TransactRequestBody$.inboundSchema),
        })
        .transform((v) => {
            return {
                id: v.id,
                requestBody: v.RequestBody,
            };
        });

    export type Outbound = {
        id: string;
        RequestBody: TransactRequestBody$.Outbound;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, TransactRequest> = z
        .object({
            id: z.string(),
            requestBody: z.lazy(() => TransactRequestBody$.outboundSchema),
        })
        .transform((v) => {
            return {
                id: v.id,
                RequestBody: v.requestBody,
            };
        });
}

/** @internal */
export namespace TransactResponse$ {
    export type Inbound = {
        ContentType: string;
        StatusCode: number;
        RawResponse: Response;
        Transaction?: components.Transaction$.Inbound | undefined;
    };

    export const inboundSchema: z.ZodType<TransactResponse, z.ZodTypeDef, Inbound> = z
        .object({
            ContentType: z.string(),
            StatusCode: z.number().int(),
            RawResponse: z.instanceof(Response),
            Transaction: components.Transaction$.inboundSchema.optional(),
        })
        .transform((v) => {
            return {
                contentType: v.ContentType,
                statusCode: v.StatusCode,
                rawResponse: v.RawResponse,
                ...(v.Transaction === undefined ? null : { transaction: v.Transaction }),
            };
        });

    export type Outbound = {
        ContentType: string;
        StatusCode: number;
        RawResponse: never;
        Transaction?: components.Transaction$.Outbound | undefined;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, TransactResponse> = z
        .object({
            contentType: z.string(),
            statusCode: z.number().int(),
            rawResponse: z.instanceof(Response).transform(() => {
                throw new Error("Response cannot be serialized");
            }),
            transaction: components.Transaction$.outboundSchema.optional(),
        })
        .transform((v) => {
            return {
                ContentType: v.contentType,
                StatusCode: v.statusCode,
                RawResponse: v.rawResponse,
                ...(v.transaction === undefined ? null : { Transaction: v.transaction }),
            };
        });
}