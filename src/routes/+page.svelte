<script lang="ts">
  import DisplayToken from "../components/DisplayToken.svelte";
  import { availableCryptos, type tokenData } from "$lib/global";

  export let data: tokenData;
</script>

<style lang="scss">
  main {
    display: grid;
    grid-template-rows: 10% 90%;

    .tokens {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-wrap: wrap;
      gap: 30px;
      max-height: 75vh;
      overflow: auto;
      padding: 30px 0px;
    }

    h1 {
      text-align: center;
    }
  }
</style>

<main>
  <h1>Your token balances on your favorite blockchains</h1>
  <div class="tokens">
    {#each availableCryptos as crypto}
      <DisplayToken
        tokenData={{
          name: crypto.name,
          symbol: crypto.symbol,
          price: data.prices[crypto.symbol],
          move24h: data.move24h[crypto.symbol],
          marketCap: data.marketCap[crypto.symbol]
        }}
      />
    {/each}
  </div>
</main>
