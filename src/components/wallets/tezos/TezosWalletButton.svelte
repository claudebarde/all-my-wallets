<script lang="ts">
  import type { cryptoSymbol } from "$lib/global";
  import store from "$lib/store";
  import { connectWallet, disconnectWallet } from "$lib/tezos";
  import { truncate } from "$lib/utils";

  const symbol: cryptoSymbol = "xtz";
  const name = "Tezos";

  const handle = async () => {
    if ($store.connectedWallets[symbol] && $store.tezosWallet) {
      // wallet is connected
      await disconnectWallet($store.tezosWallet);
      store.updateConnectedWallet("xtz", false);
      store.updateTezosWallet(undefined);
    } else if (!$store.connectedWallets[symbol] && $store.tezosWallet) {
      // wallet is not connected
      const userAddress = await connectWallet($store.tezosWallet);
      store.updateAddress(symbol, userAddress);
      store.updateConnectedWallet(symbol, true);
      store.updateTezosWallet($store.tezosWallet);
      // Tezos.setWalletProvider(wallet);
    }
  };
</script>

<button class="connect" on:click={handle}>
  <img src={`crypto-icons-color/${symbol}.svg`} alt={`${symbol}-color`} />
  {#if $store.connectedWallets[symbol]}
    <div>
      <div>{truncate($store.addresses[symbol] || "")}</div>
      <div>Disconnect</div>
    </div>
  {:else}
    <span>Connect {name} wallet</span>
  {/if}
  <div></div>
</button>
