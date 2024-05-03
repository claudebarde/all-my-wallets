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
  amount: number,
  rate: number,
  symbol: cryptoSymbol | undefined
) => number = function (amount, rate, symbol) {
  switch (symbol) {
    case "xtz":
      return (amount / 10 ** 6) * rate;
    case "sol":
      return (amount / 10 ** 9) * rate;
    default:
      return +(amount * rate).toFixed(2);
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

export const coingeckoTokenPrices: (
  cryptos: Array<string>
) => Promise<{ string: number } | undefined> = async function (cryptos) {
  const result = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos
      .map(tk => {
        if (tk === "usdc") {
          return "usd-coin";
        } else {
          return tk;
        }
      })
      .join(",")}&vs_currencies=usd`
  );
  if (result) {
    const prices: { string: { usd: number } } = await result.json();
    let resp: any = {};
    for (let [token, value] of Object.entries(prices)) {
      if (token === "usd-coin") {
        resp.usdc = value.usd;
      } else {
        resp[token] = value.usd;
      }
    }

    return resp;
  } else {
    return undefined;
  }
};
