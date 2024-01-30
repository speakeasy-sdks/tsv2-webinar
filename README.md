# Speakeasy webinar: TypeScript and Zod with Colin McDonnell

- `./sdk`: a sample TypeScript SDK generated by Speakeasy
- `./app`: an app that uses the SDK

## Setup

1. Clone this repo
2. In `./sdk`, run `npm install`
3. In `./app`, run `npm install`
4. In `./app`, run one of the following:
    - `npm run pets`: demo how unions (oneOf) are handled
    - `npm run banking`: demo of pagination using async generators
    - `npm run llm`: demo of chatting with an LLM (requires [llamafile server](https://github.com/Mozilla-Ocho/llamafile))
