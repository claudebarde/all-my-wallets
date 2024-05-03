<script lang="ts">
  import { afterUpdate } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { availableCryptos, type crypto } from "$lib/global";
  import store from "$lib/store";
  import TezosWalletButton from "./wallets/tezos/TezosWalletButton.svelte";
  import SolanaWalletButton from "./wallets/solana/SolanaWalletButton.svelte";

  export let close: () => void;

  let connectedWallets: Array<crypto> = [];
  let disconnectedWallets: Array<crypto> = [];

  afterUpdate(() => {
    connectedWallets = [];
    disconnectedWallets = [];
    for (let crypto of availableCryptos) {
      if ($store.connectedWallets[crypto.symbol]) {
        connectedWallets = [...connectedWallets, crypto];
      } else {
        disconnectedWallets = [...disconnectedWallets, crypto];
      }
    }
  });
</script>

<style lang="scss">
  @import "../lib/global.scss";

  .column-container-background {
    z-index: 990;
    width: 100vw;
    height: 100vh;
    background-color: rgba(54, 69, 79, 0.8);
    position: absolute;
    top: 0px;
    left: 0px;
    display: grid;
    grid-template-columns: 80% 20%;
  }

  aside {
    z-index: 999;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 20vw;
    height: 100vh;
    background-color: $bg-color;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    button#close-wallets-column {
      font-size: 28px;
    }

    .wallets-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
    }
  }
</style>

<div
  class="column-container-background"
  transition:fade={{ duration: 200 }}
></div>
<aside transition:fly={{ duration: 500, x: 500 }}>
  <button class="transparent scale" id="close-wallets-column" on:click={close}>
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="wallets-container">
    {#if connectedWallets.length > 0}
      <p>Connected Wallets</p>
      {#each connectedWallets as crypto}
        {#if crypto.symbol === "xtz"}
          <TezosWalletButton />
        {:else if crypto.symbol === "sol"}
          <SolanaWalletButton />
        {:else}
          <button class="connect">
            <img
              src={`crypto-icons-color/${crypto.symbol}.svg`}
              alt={`${crypto.symbol}-white`}
            />
            <span>Disconnect</span>
            <div></div>
          </button>
        {/if}
      {/each}
    {/if}
    {#if disconnectedWallets.length > 0}
      <p>Disconnected Wallets</p>
      {#each disconnectedWallets as crypto}
        {#if crypto.symbol === "xtz"}
          <TezosWalletButton />
        {:else}
          <button class="connect">
            <img
              src={`crypto-icons-color/${crypto.symbol}.svg`}
              alt={`${crypto.symbol}-white`}
            />
            <span>Connect {crypto.name} wallet</span>
            <div></div>
          </button>
        {/if}
      {/each}
    {/if}
  </div>
</aside>
