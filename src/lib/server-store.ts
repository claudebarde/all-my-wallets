import { writable } from "svelte/store";
import type { tokenData, cryptoSymbol } from "$lib/global";

const initialState: { tokenData: tokenData; lastFetchPrices: number } = {
  tokenData: {
    prices: {
      eth: 0,
      sol: 0,
      stx: 0,
      xtz: 0,
      ada: 0
    },
    move24h: {
      eth: [true, 0],
      sol: [true, 0],
      stx: [true, 0],
      xtz: [true, 0],
      ada: [true, 0]
    },
    marketCap: {
      eth: 0,
      sol: 0,
      stx: 0,
      xtz: 0,
      ada: 0
    },
    lastFetchPrices: 0
  },
  lastFetchPrices: 0
};

const store = writable(initialState);

const state = {
  subscribe: store.subscribe,
  updatePrice: (symbol: cryptoSymbol, price: number) => {
    store.update(store => ({
      ...store,
      tokenData: {
        ...store.tokenData,
        prices: { ...store.tokenData.prices, [symbol]: price }
      }
    }));
  },
  updateMove24h: (symbol: cryptoSymbol, dir: boolean, val: number) => {
    store.update(store => ({
      ...store,
      tokenData: {
        ...store.tokenData,
        move24h: { ...store.tokenData.move24h, [symbol]: [dir, val] }
      }
    }));
  },
  updateMarketCap: (symbol: cryptoSymbol, val: number) => {
    store.update(store => ({
      ...store,
      tokenData: {
        ...store.tokenData,
        marketCap: { ...store.tokenData.marketCap, [symbol]: val }
      }
    }));
  },
  updateLastFetched: () => {
    store.update(store => ({
      ...store,
      lastFetchPrices: new Date().getTime()
    }));
  }
};

export default state;
