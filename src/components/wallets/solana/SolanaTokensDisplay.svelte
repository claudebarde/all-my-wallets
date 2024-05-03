<script lang="ts">
  import { onMount } from "svelte";
  import { fetchTokensBalances } from "$lib/solana";
  import type { SolanaToken } from "$lib/solana";
  import store from "$lib/store";
  import { formatReadableAmount } from "$lib/utils";

  let tokens: Array<[SolanaToken, number]> = [];

  onMount(async () => {
    const existingTokens = await fetchTokensBalances(
      $store.addresses.sol || ""
    );
    if (existingTokens.length > 0) {
      tokens = existingTokens;
      const res = await fetch("/tokens?chain=solana");
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
    <div>{formatReadableAmount(balance)}</div>
  {/each}
{/if}
