<script lang="ts">
  import type { cryptoSymbol } from "$lib/global";
  import store from "$lib/store";
  import { connectWallet, disconnectWallet } from "$lib/solana";
  import { truncate } from "$lib/utils";

  const symbol: cryptoSymbol = "sol";
  const name = "Solana";

  const handle = async () => {
    if ($store.connectedWallets[symbol]) {
      // wallet is connected
      store.updateConnectedWallet("sol", false);
      await disconnectWallet();
    } else if (!$store.connectedWallets[symbol]) {
      // wallet is not connected
      const userAddress = await connectWallet(true);
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
