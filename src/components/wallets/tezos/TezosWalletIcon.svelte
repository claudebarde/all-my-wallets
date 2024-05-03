<script lang="ts">
  import { onMount } from "svelte";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import type { cryptoSymbol } from "$lib/global";
  import type { NetworkType } from "@airgap/beacon-dapp";
  import store from "$lib/store";
  import { connectWallet } from "$lib/tezos";

  const symbol: cryptoSymbol = "xtz";

  let wallet: BeaconWallet;

  const connect = async () => {
    if ($store.tezosWallet && !$store.connectedWallets[symbol]) {
      const userAddress = await connectWallet($store.tezosWallet);
      store.updateAddress(symbol, userAddress);
      store.updateConnectedWallet(symbol, true);
      store.updateTezosWallet(wallet);
      // Tezos.setWalletProvider(wallet);
    }
  };

  onMount(async () => {
    wallet = new BeaconWallet({
      name: "All My Wallets",
      preferredNetwork: "mainnet" as NetworkType
    });
    await wallet.client.subscribeToEvent(
      "ACTIVE_ACCOUNT_SET" as any,
      account => {
        // An active account has been set, update the dApp UI
        console.log(`ACTIVE_ACCOUNT_SET triggered: `, account);
      }
    );
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const userAddress = await wallet.getPKH();
      store.updateAddress(symbol, userAddress);
      store.updateConnectedWallet(symbol, true);
      store.updateTezosWallet(wallet);
    }
    store.updateTezosWallet(wallet);
  });
</script>

<div class="header__wallet-button">
  <button class="transparent scale" on:click={connect}>
    <img
      src={$store.connectedWallets[symbol]
        ? `crypto-icons-color/${symbol}.svg`
        : `crypto-icons-white/${symbol}.svg`}
      alt="xtz-white"
    />
  </button>
</div>
