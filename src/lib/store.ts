import { writable } from "svelte/store";
import type { State, cryptoSymbol, CryptoPrices } from "$lib/global";
import type { BeaconWallet } from "@taquito/beacon-wallet";

const initialState: State = {
  connectedWallets: {
    eth: false,
    sol: false,
    stx: false,
    xtz: false,
    ada: false
  },
  addresses: {
    eth: undefined,
    sol: undefined,
    stx: undefined,
    xtz: undefined,
    ada: undefined
  },
  prices: {
    eth: undefined,
    sol: undefined,
    stx: undefined,
    xtz: undefined,
    ada: undefined
  },
  tezosWallet: undefined
};

const store = writable(initialState);

const state = {
  subscribe: store.subscribe,
  updateConnectedWallet: (symbol: cryptoSymbol, connected: boolean) => {
    store.update(store => ({
      ...store,
      connectedWallets: { ...store.connectedWallets, [symbol]: connected }
    }));
  },
  updateAddress: (symbol: cryptoSymbol, address: string | undefined) => {
    store.update(store => ({
      ...store,
      addresses: { ...store.addresses, [symbol]: address }
    }));
  },
  updatePrices: (prices: CryptoPrices) => {
    store.update(store => ({ ...store, prices }));
  },
  updateTezosWallet: (wallet: BeaconWallet | undefined) => {
    store.update(store => ({ ...store, tezosWallet: wallet }));
  }
};

export default state;
