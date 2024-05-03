import type { State, cryptoSymbol } from "$lib/global";

export const findConnectedWallets: (
  wallets: State["connectedWallets"]
) => Array<cryptoSymbol> = function (wallets) {
  return Object.entries(wallets)
    .filter(([_, isConnected]) => isConnected == true)
    .map(([crypto, _]) => crypto as cryptoSymbol);
};

export const truncate: (hash: string) => string = function (hash) {
  return hash.slice(0, 6) + "..." + hash.slice(-6);
};

export const formatAmount: (amount: number, decimals: number) => string =
  function (amount, decimals) {
    return (amount / 10 ** decimals).toFixed(3);
  };

export const convertToUsd: (
  symbol: cryptoSymbol,
  amount: number,
  rate: number
) => number = function (symbol, amount, rate) {
  switch (symbol) {
    case "xtz":
      return (amount / 10 ** 6) * rate;
    case "sol":
      return (amount / 10 ** 9) * rate;
    default:
      console.warn(`Missing crypto "${symbol}" for conversion to USD`);
      return 0;
  }
};

export const formatReadableAmount: (amount: number) => string = function (
  amount
) {
  return new Intl.NumberFormat().format(amount);
};

export const coingeckoTokensRequest: (
  cryptos: Array<string>,
  category: "solana" | undefined
) => string = function (cryptos, category) {
  const list = cryptos.join(",");
  if (category) {
    const categories = {
      solana: "solana-ecosystem"
    };

    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${list}&order=market_cap_desc&category=${categories[category]}&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
  }
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${list}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
};
