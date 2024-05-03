<script lang="ts">
  import { onMount } from "svelte";
  import type { cryptoSymbol, ModalType } from "$lib/global";
  import store from "$lib/store";
  import Modal from "../../Modal.svelte";
  import { connectWallet } from "$lib/solana";

  const symbol: cryptoSymbol = "sol";
  let showModal = false;
  let modalType: ModalType = "message";
  let modalMsg: undefined | string = undefined;

  const connect = async () => {
    if (!$store.connectedWallets[symbol]) {
      // wallet is not connected
      const walletConnection = await connectWallet(false);
      if (walletConnection === "no-phantom") {
        // Phantom is not installed
        modalType = "no-phantom";
        modalMsg = undefined;
        showModal = true;
      } else if (!!walletConnection && typeof walletConnection === "string") {
        store.updateAddress("sol", walletConnection);
        store.updateConnectedWallet("sol", true);
      } else {
        modalType = "error";
        modalMsg = "Cannot connect Phantom Wallet";
        showModal = true;
      }
    }
  };

  onMount(async () => {
    const walletConnection = await connectWallet(true);
    if (!!walletConnection && typeof walletConnection === "string") {
      // updates the store
      store.updateAddress("sol", walletConnection);
      store.updateConnectedWallet("sol", true);
    }
  });
</script>

<div class="header__wallet-button">
  <button class="transparent scale" on:click={connect}>
    <img
      src={$store.connectedWallets[symbol]
        ? `crypto-icons-color/${symbol}.svg`
        : `crypto-icons-white/${symbol}.svg`}
      alt="sol-white"
    />
  </button>
</div>
<Modal
  active={showModal}
  type={modalType}
  msg={modalMsg}
  close={() => (showModal = false)}
/>
