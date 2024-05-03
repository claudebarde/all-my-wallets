<script lang="ts">
  import WalletsColumn from "./WalletsColumn.svelte";
  import { availableCryptos } from "$lib/global";
  import WalletIcon from "./wallets/WalletIcon.svelte";

  let openWalletsDrawer = false;
</script>

<style lang="scss">
  @import "../lib/global.scss";

  .wallets {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;

    .wallet-manager {
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        margin: 0px 4px;
      }
    }
  }
</style>

<div class="wallets">
  <div class="wallet-manager">
    <div>Wallets manager</div>
    {#each availableCryptos as crypto}
      <WalletIcon cryptoSymbol={crypto.symbol} />
    {/each}
  </div>
  <div>
    <button
      class="transparent scale"
      on:click={() => (openWalletsDrawer = true)}
    >
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
  {#if openWalletsDrawer}
    <WalletsColumn close={() => (openWalletsDrawer = false)} />
  {/if}
</div>
