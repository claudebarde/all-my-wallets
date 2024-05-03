<script lang="ts">
  import { afterUpdate } from "svelte";
  import { findConnectedWallets } from "$lib/utils";
  import type { cryptoSymbol, tokenData } from "$lib/global";
  import store from "$lib/store";
  import WalletDisplay from "../../components/wallets/WalletDisplay.svelte";

  export let data: tokenData;

  let connectedWallets: Array<cryptoSymbol> = [];

  afterUpdate(() => {
    connectedWallets = [...findConnectedWallets($store.connectedWallets)];
  });
</script>

<style lang="scss">
  main {
    width: calc(100% - 100px);
    height: 100%;

    &.no-wallets {
      display: grid;
      place-items: center;
    }

    &.wallets {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      gap: 20px;
      padding: 50px;
    }
  }
</style>

<main class={connectedWallets.length > 0 ? `wallets` : `no-wallets`}>
  {#if connectedWallets.length > 0}
    {#each connectedWallets as wallet (wallet)}
      <WalletDisplay symbol={wallet} price={data.prices[wallet]} />
    {/each}
  {:else}
    <div>Connect a wallet to start</div>
  {/if}
</main>
