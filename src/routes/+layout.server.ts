import { get } from "svelte/store";
import { availableCryptos } from "$lib/global";
import type { cryptoSymbol } from "$lib/global";
import serverStore from "$lib/server-store";
import { coingeckoTokensRequest } from "$lib/utils";

export async function load({ params }) {
  let store = get(serverStore);
  let currentTime = new Date().getTime();

  if (
    store.lastFetchPrices === 0 ||
    currentTime > store.lastFetchPrices + 5 * 60 * 1_000
  ) {
    const cryptos = availableCryptos.map(crypto => {
      if (crypto.symbol === "stx") {
        return "blockstack"; // the Stacks token has a different name on Coingecko
      } else {
        return crypto.name.toLowerCase();
      }
    });
    const request = coingeckoTokensRequest(cryptos, undefined);
    const res = await fetch(request);
    const json = await res.json();
    if (json.length == availableCryptos.length) {
      for (const data of json) {
        let symbol = data.symbol as cryptoSymbol;
        serverStore.updatePrice(symbol, data.current_price);
        serverStore.updateMove24h(
          symbol,
          data.price_change_24h > 0,
          data.price_change_24h
        );
        serverStore.updateMarketCap(symbol, data.market_cap);
      }
      serverStore.updateLastFetched();

      return store.tokenData;
    } else {
      throw new Error("unexpected number of cryptos returned by Coingecko");
    }
  } else {
    console.log("no refresh");
    return store.tokenData;
  }

  /* return {
    prices: {
      eth: 2000,
      sol: 150,
      stx: 2.8,
      xtz: 1.07,
      ada: 0.5
    },
    move24h: {
      eth: [true, 100],
      sol: [true, 10],
      stx: [true, 35],
      xtz: [true, 1],
      ada: [false, 22]
    },
    marketCap: {
      eth: 100_000_000_000,
      sol: 69_000_000_000,
      stx: 3_000_000_001,
      xtz: 1001.5,
      ada: 420_000_000_000
    },
    lastFetchPrices: new Date().getTime()
  }; */
}
