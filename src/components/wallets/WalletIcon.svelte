<script lang="ts">
  import type { cryptoSymbol } from "$lib/global";
  import store from "$lib/store";
  import TezosWalletIcon from "./tezos/TezosWalletIcon.svelte";
  import SolanaWalletIcon from "./solana/SolanaWalletIcon.svelte";

  export let cryptoSymbol: cryptoSymbol;
</script>

<style lang="scss">
  :global(.header__wallet-button) {
    margin: 0px 4px;

    img {
      width: 28px;
      height: 28px;
    }
  }
</style>

{#if cryptoSymbol === "xtz"}
  <TezosWalletIcon />
{:else if cryptoSymbol === "sol"}
  <SolanaWalletIcon />
{:else}
  <div class="header__wallet-button">
    <button class="transparent scale">
      <img
        src={$store.connectedWallets[cryptoSymbol]
          ? `crypto-icons-color/${cryptoSymbol}.svg`
          : `crypto-icons-white/${cryptoSymbol}.svg`}
        alt={`${cryptoSymbol}-white`}
      />
    </button>
  </div>
{/if}
