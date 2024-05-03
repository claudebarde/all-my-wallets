<script lang="ts">
  import { onMount } from "svelte";
  import { fetchTokensBalances, formatTokenBalance } from "$lib/tezos";
  import type { TezosToken } from "$lib/tezos";
  import store from "$lib/store";
  import { formatReadableAmount } from "$lib/utils";

  let tokens: Array<[TezosToken, { balance: string; thumbnail: string }]> = [];

  onMount(async () => {
    const balances = await fetchTokensBalances($store.addresses.xtz || "");
    for (const [token, data] of Object.entries(balances)) {
      if (data.balance > 0) {
        const formattedBalance = formatTokenBalance(
          token as TezosToken,
          data.balance
        );
        if (+formattedBalance > 0) {
          tokens = [
            ...tokens,
            [
              token as TezosToken,
              {
                balance: formattedBalance,
                thumbnail: data.thumbnail
              }
            ]
          ];
        }
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
</style>

{#if tokens.length > 0}
  <div>Tokens</div>
  <div></div>
  <div></div>
  {#each tokens as [token, data]}
    <div></div>
    <div class="token-display">
      <img src={`tezos-tokens/${token.toLowerCase()}.png`} alt="tezos-token" />
      <span>{token}</span>
    </div>
    <div>{formatReadableAmount(+data.balance)}</div>
  {/each}
{/if}
