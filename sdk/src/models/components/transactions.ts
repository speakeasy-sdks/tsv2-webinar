/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { Transaction, Transaction$ } from "./transaction";
import { z } from "zod";

export type Transactions = {
    next?: string | null | undefined;
    results: Array<Transaction>;
};

/** @internal */
export namespace Transactions$ {
    export type Inbound = {
        next?: string | null | undefined;
        results: Array<Transaction$.Inbound>;
    };

    export const inboundSchema: z.ZodType<Transactions, z.ZodTypeDef, Inbound> = z
        .object({
            next: z.nullable(z.string()).optional(),
            results: z.array(Transaction$.inboundSchema),
        })
        .transform((v) => {
            return {
                ...(v.next === undefined ? null : { next: v.next }),
                results: v.results,
            };
        });

    export type Outbound = {
        next?: string | null | undefined;
        results: Array<Transaction$.Outbound>;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, Transactions> = z
        .object({
            next: z.nullable(z.string()).optional(),
            results: z.array(Transaction$.outboundSchema),
        })
        .transform((v) => {
            return {
                ...(v.next === undefined ? null : { next: v.next }),
                results: v.results,
            };
        });
}
