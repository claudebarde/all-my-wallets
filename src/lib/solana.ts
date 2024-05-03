import { Connection, PublicKey, type ParsedAccountData } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export type SolanaToken = "BONK" | "WEN" | "WIF" | "USDC" | "PEPE";

export const tokenAddress: { [key in SolanaToken]: string } = {
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  WEN: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
  WIF: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  PEPE: "FDqp7ioPenKRzQqseFv84kxDMUT83CX1qZxgDTQDkwT2"
};

export const rpcUrl =
  "https://mainnet.helius-rpc.com/?api-key=c92f5ee3-9e8e-4c03-b426-5460f1ead6cc";

export interface PhantomProvider {
  isConnected: boolean;
  publicKey: Object;
  connect(p?: { onlyIfTrusted: boolean }): Promise<any>;
  disconnect(): Promise<void>;
}

export const connectWallet = async (
  onlyIfTrusted: boolean
): Promise<string | "no-phantom" | undefined> => {
  if ((window as any).phantom?.solana?.isPhantom) {
    // Phantom is installed
    const provider: PhantomProvider = (window as any).phantom?.solana;
    const userAddress: string | undefined = await (async () => {
      if (provider.isConnected) {
        return provider.publicKey.toString();
      } else {
        try {
          const resp = await provider.connect({ onlyIfTrusted });
          return resp.publicKey.toString();
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
          console.log("Error connecting Phantom:", err);
          return undefined;
        }
      }
    })();
    return userAddress;
  } else {
    return "no-phantom";
  }
};

export const disconnectWallet = async (): Promise<void> => {
  if ((window as any).phantom?.solana?.isPhantom) {
    // Phantom is installed
    const provider = (window as any).phantom?.solana;
    await provider.disconnect();
  }
};

export const fetchBalance = async (address: string): Promise<number> => {
  // const connection = new Connection(rpcUrl);
  // const balance = await connection.getBalance(new PublicKey(address));
  // return balance;

  // mockup for now in order to save my credits
  return 1142615275;
};

export const fetchTokensBalances = async (
  address: string
): Promise<Array<[SolanaToken, number]>> => {
  const fakeTokens: Array<[SolanaToken, number]> = [
    ["USDC", 62.3432],
    ["WEN", 643652],
    ["BONK", 15161149.317]
  ];

  /* const filters = [
    {
      dataSize: 165 //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: address //our search criteria, a base58 encoded string
      }
    }
  ];

  const connection = new Connection(rpcUrl);
  const tokensBalances = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  );
  if (tokensBalances.length > 0) {
    const tokenAddresses = Object.values(tokenAddress);
    const existingTokens: Array<[SolanaToken, number]> = tokensBalances
      .filter(tk => {
        if (tk.account.data.hasOwnProperty("parsed")) {
          return tokenAddresses.includes(
            (tk.account.data as ParsedAccountData).parsed.info.mint
          );
        } else {
          return false;
        }
      })
      .map(tk => {
        const contractAddress = (tk.account.data as ParsedAccountData).parsed
          .info.mint;
        const tokenName = Object.keys(tokenAddress).find(
          key => tokenAddress[key as SolanaToken] === contractAddress
        ) as SolanaToken;
        const balance = (tk.account.data as ParsedAccountData).parsed.info
          .tokenAmount.uiAmount;
        return [tokenName, balance];
      });

    return existingTokens;
  } else {
    return [];
  } */

  return fakeTokens;
};
