/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { z } from "zod";

export type ChatRequest = {
    prompt: string;
    stream?: true | undefined;
};

/** @internal */
export namespace ChatRequest$ {
    export type Inbound = {
        prompt: string;
        stream?: true | undefined;
    };

    export const inboundSchema: z.ZodType<ChatRequest, z.ZodTypeDef, Inbound> = z
        .object({
            prompt: z.string(),
            stream: z.literal(true),
        })
        .transform((v) => {
            return {
                prompt: v.prompt,
                ...(v.stream === undefined ? null : { stream: v.stream }),
            };
        });

    export type Outbound = {
        prompt: string;
        stream?: true;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, ChatRequest> = z
        .object({
            prompt: z.string(),
            stream: z.literal(true),
        })
        .transform((v) => {
            return {
                prompt: v.prompt,
                ...(v.stream === undefined ? null : { stream: v.stream }),
            };
        });
}
