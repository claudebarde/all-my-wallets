import type { BeaconWallet } from "@taquito/beacon-wallet";

export type TezosToken = "uUSD" | "tzBTC" | "USDt" | "YOU" | "Ctez";
export type TezosTokens = {
  [key in TezosToken]: { balance: number; thumbnail: string };
};

export const rpcUrl = "https://mainnet.ecadinfra.com";

export const connectWallet = async (wallet: BeaconWallet): Promise<string> => {
  await wallet.requestPermissions({
    network: { type: "mainnet" as any, rpcUrl }
  });
  return await wallet.getPKH();
};

export const disconnectWallet = async (wallet: BeaconWallet): Promise<void> => {
  await wallet.clearActiveAccount();
  await wallet.disconnect();
};

export const fetchBalance = async (address: string): Promise<number> => {
  try {
    const balance = await fetch(
      `https://api.tzkt.io/v1/accounts/${address}/balance`
    );
    return await balance.json();
  } catch (error) {
    throw new Error((error as any).toString());
  }
};

export const fetchTokensBalances = async (
  address: string
): Promise<TezosTokens> => {
  let result = {
    uUSD: { balance: 0, thumbnail: "" },
    tzBTC: { balance: 0, thumbnail: "" },
    USDt: { balance: 0, thumbnail: "" },
    YOU: { balance: 0, thumbnail: "" },
    Ctez: { balance: 0, thumbnail: "" }
  };

  const fetchTokens = await fetch(
    `https://api.tzkt.io/v1/tokens/balances?account.eq=${address}&token.metadata.symbol.in=uUSD,tzBTC,USDt,YOU,Ctez`
  );
  const tokens = await fetchTokens.json();
  if (tokens.length > 0) {
    for (let token of tokens) {
      const tokenName: TezosToken = token.token.metadata.symbol;
      result[tokenName] = {
        balance: token.balance,
        thumbnail: token.token.metadata.thumbnailUri
      };
    }
  }

  return result;
};

export const formatTokenBalance = (
  token: TezosToken,
  balance: number
): string => {
  switch (token) {
    case "Ctez":
      return (balance / 10 ** 6).toFixed(3);
    case "USDt":
      return (balance / 10 ** 6).toFixed(3);
    case "YOU":
      return (balance / 10 ** 12).toFixed(3);
    case "tzBTC":
      return (balance / 10 ** 8).toFixed(3);
    case "uUSD":
      return (balance / 10 ** 12).toFixed(3);
  }
};
