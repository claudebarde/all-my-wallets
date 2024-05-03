import { json } from "@sveltejs/kit";
import { coingeckoTokensRequest } from "$lib/utils";
import { tokenAddress } from "$lib/solana.js";

const expectedOrigin = "http://localhost:5173";

export async function GET(event) {
  const origin = event.url.origin;

  if (origin === expectedOrigin) {
    // right origin
    const chain = event.url.searchParams.get("chain");
    if (chain) {
      const tokens = (() => {
        if (chain === "solana") {
          return Object.keys(tokenAddress).map(tk => tk.toLowerCase());
        } else {
          return [];
        }
      })();

      if (tokens.length > 0) {
        const request = coingeckoTokensRequest(tokens, "solana");
        const res = await fetch(request);
        const jsonRes = await res.json();

        console.log(jsonRes);
      }
    }
  }

  return json(null);
}
