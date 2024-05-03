<script lang="ts">
  import { afterUpdate } from "svelte";
  import type { cryptoSymbol, crypto } from "$lib/global";
  import { availableCryptos } from "$lib/global";
  import { fetchBalance as fetchTezosBalance } from "$lib/tezos";
  import { fetchBalance as fetchSolanaBalance } from "$lib/solana";
  import store from "$lib/store";
  import { formatAmount, convertToUsd } from "$lib/utils";
  import TezosTokensDisplay from "./tezos/TezosTokensDisplay.svelte";
  import SolanaTokensDisplay from "./solana/SolanaTokensDisplay.svelte";

  export let symbol: cryptoSymbol, price: number;

  let crypto: crypto | undefined;

  afterUpdate(() => {
    crypto = availableCryptos.find(c => c.symbol === symbol);
  });
</script>

<style lang="scss">
  .wallet-display {
    width: 90%;
    display: grid;
    grid-template-columns: 20% 40% 40%;
    place-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #121b2f;
    border: solid 2px #36454f;
    border-radius: 20px;

    .wallet__header__left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      .wallet__header__icon {
        width: 48px;
        height: 48px;
      }
    }
  }
</style>

{#if !crypto}
  <div>Unable to load data for "{symbol}"</div>
{:else}
  <div class="wallet-display">
    <div class="wallet__header__left">
      <img
        class="wallet__header__icon"
        src={`crypto-icons-color/${symbol}.svg`}
        alt={`${symbol}`}
      />
      <div>{crypto.name}</div>
    </div>
    <div>1 {symbol.toUpperCase()} = ${price}</div>
    {#if symbol === "xtz" && $store.addresses.xtz}
      {#await fetchTezosBalance($store.addresses.xtz) then balance}
        <div>
          Balance: {formatAmount(balance, 6)}
          {symbol.toUpperCase()} (≈ ${convertToUsd(
            "xtz",
            balance,
            price
          ).toFixed(2)})
        </div>
      {/await}
      <TezosTokensDisplay />
    {:else if symbol === "sol" && $store.addresses.sol}
      {#await fetchSolanaBalance($store.addresses.sol) then balance}
        <div>
          Balance: {formatAmount(balance, 9)}
          {symbol.toUpperCase()} (≈ ${convertToUsd(
            "sol",
            balance,
            price
          ).toFixed(2)})
        </div>
      {/await}
      <SolanaTokensDisplay />
    {:else}
      <div>Balance: 0 {symbol} (=$0)</div>
    {/if}
  </div>
{/if}
