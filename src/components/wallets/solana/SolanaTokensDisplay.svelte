<script lang="ts">
  import { onMount } from "svelte";
  import { fetchTokensBalances } from "$lib/solana";
  import type { SolanaToken } from "$lib/solana";
  import store from "$lib/store";
  import {
    formatReadableAmount,
    convertToUsd,
    coingeckoTokenPrices
  } from "$lib/utils";

  export let balanceInUsd: number;

  let tokens: Array<[SolanaToken, number]> = [];
  let tokenPrices: any = {};
  let totalTokenBalanceInUsd = 0;

  onMount(async () => {
    const existingTokens = await fetchTokensBalances(
      $store.addresses.sol || ""
    );
    if (existingTokens.length > 0) {
      tokens = existingTokens;
      // const cryptos = existingTokens.map(tk => tk[0].toLowerCase());
      // const res = await coingeckoTokenPrices(cryptos);
      // if (res) {
      //   tokenPrices = res;
      //   console.log(tokenPrices);
      // }
      // TODO: remove hardcoded values to save on API calls
      tokenPrices = { bonk: 0.00002647, usdc: 0.999459, wen: 0.00003635 };
      totalTokenBalanceInUsd = +balanceInUsd.toFixed(2);
      for (let [token, balance] of tokens) {
        totalTokenBalanceInUsd += convertToUsd(
          balance,
          tokenPrices[token.toLowerCase()],
          undefined
        );
      }
    }
  });
</script>

<style lang="scss">
  .token-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .total-tokens-display {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;

    img {
      width: 32px;
      height: 32px;
    }
  }
</style>

{#if tokens.length > 0}
  <div>Tokens</div>
  <div></div>
  <div></div>
  {#each tokens as [token, balance]}
    <div></div>
    <div class="token-display">
      <img src={`solana/${token.toLowerCase()}.png`} alt="solana-token" />
      <span>{token}</span>
    </div>
    <div>
      <span>{formatReadableAmount(balance)}</span>
      {#if tokenPrices[token.toLowerCase()]}
        <span
          >(≈ ${convertToUsd(
            balance,
            tokenPrices[token.toLowerCase()],
            undefined
          )})</span
        >
      {/if}
    </div>
  {/each}
  <div>Total</div>
  <div class="total-tokens-display">
    <img src="crypto-icons-color/sol.svg" alt="solana-token" />
    {#each tokens as [token, _], index}
      <img
        src={`solana/${token.toLowerCase()}.png`}
        alt="solana-token"
        style={`transform: translateX(-${(index + 1) * 12}px)`}
      />
    {/each}
  </div>
  <div>≈ ${totalTokenBalanceInUsd}</div>
{/if}
