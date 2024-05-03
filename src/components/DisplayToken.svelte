<script lang="ts">
  import type { cryptoSymbol } from "$lib/global";

  export let tokenData: {
    name: string;
    symbol: cryptoSymbol;
    price: number;
    move24h: [boolean, number];
    marketCap: number;
  };
</script>

<style lang="scss">
  @import "../lib/global.scss";

  .token-data {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 300px;
    padding: 20px;
    background-color: #121b2f;
    border: solid 2px #36454f;
    border-radius: 20px;

    .token-data__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .token-data__icon {
        width: 48px;
        height: 48px;
      }
    }

    .token-data__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;

      .up {
        color: $green;
      }
      .down {
        color: $red;
      }
    }
  }
</style>

<div class="token-data">
  <div class="token-data__header">
    <img
      class="token-data__icon"
      src={`crypto-icons-color/${tokenData.symbol}.svg`}
      alt={`${tokenData.symbol}`}
    />
    <div>
      <div>{tokenData.name}</div>
      <div>$ {tokenData.price}</div>
    </div>
  </div>
  <div class="token-data__info">
    <div>
      <p>24h %</p>
      <p>Market cap</p>
    </div>
    <div>
      <p class:up={tokenData.move24h[0]} class:down={!tokenData.move24h[0]}>
        {#if tokenData.move24h[0]}
          <i class="fa-solid fa-caret-up" style="color: inherit"></i>
        {:else}
          <i class="fa-solid fa-caret-down" style="color: inherit"></i>
        {/if}
        <span style="color: inherit">{tokenData.move24h[1].toFixed(3)}%</span>
      </p>
      <p>$ {new Intl.NumberFormat("en-US").format(tokenData.marketCap)}</p>
    </div>
  </div>
</div>
