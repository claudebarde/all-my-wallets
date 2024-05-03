import type { BeaconWallet } from "@taquito/beacon-wallet";

export type cryptoSymbol = "eth" | "sol" | "stx" | "xtz" | "ada";
export type SolanaToken = "bonk" | "wen";

export type crypto = {
  name: string;
  symbol: cryptoSymbol;
};

export const availableCryptos: Array<crypto> = [
  { name: "Ethereum", symbol: "eth" },
  { name: "Solana", symbol: "sol" },
  { name: "Stacks", symbol: "stx" },
  { name: "Tezos", symbol: "xtz" },
  { name: "Cardano", symbol: "ada" }
];

export type ConnectedWallets = {
  [key in cryptoSymbol]: boolean;
};

export type UserAddresses = {
  [key in cryptoSymbol]: string | undefined;
};

export type CryptoPrices = {
  [key in cryptoSymbol]: number | undefined;
};

export interface State {
  connectedWallets: ConnectedWallets;
  addresses: UserAddresses;
  prices: CryptoPrices;
  tezosWallet: BeaconWallet | undefined;
}

export type tokenData = {
  prices: { [key in cryptoSymbol]: number };
  move24h: { [key in cryptoSymbol]: [boolean, number] };
  marketCap: { [key in cryptoSymbol]: number };
  lastFetchPrices: number;
};

export type ModalType = "message" | "error" | "no-phantom";
