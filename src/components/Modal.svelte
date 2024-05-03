<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import type { ModalType } from "$lib/global";

  export let active: boolean, type: ModalType, msg: string | undefined, close;

  const installPhantom = () => {
    window.open("https://phantom.app/", "_blank");
  };
</script>

<style lang="scss">
  .modal-background {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(54, 69, 79, 0.8);
    z-index: 998;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 30%;
    z-index: 999;
    padding: 20px;
    background-color: #121b2f;
    border: solid 2px #36454f;
    border-radius: 20px;
    display: grid;
    grid-template-rows: 15% 70% 15%;

    & > div {
      width: 100%;
      text-align: center;
    }

    .modal__header {
      display: flex;
      justify-content: end;
      align-items: start;
    }

    .modal__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }

    .modal__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    img {
      height: 42px;
    }
  }
</style>

{#if active}
  <div class="modal-background" transition:fade={{ duration: 300 }}></div>
  <div
    class="modal"
    transition:fly={{ duration: 500, y: 200, easing: cubicInOut }}
  >
    <div class="modal__header">
      <button class="transparent scale" on:click={close}>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="modal__body">
      {#if type === "no-phantom"}
        <img
          src="solana/Phantom-Icon_Transparent_Purple.png"
          alt="phantom-wallet"
        />
        <div>The Phantom wallet is not installed</div>
        <div style="font-size:0.8rem">
          (Support for other Solana wallets is coming soon!)
        </div>
      {:else if type === "message"}
        <div>{msg}</div>
      {:else if type === "error"}
        <div>An error has occured</div>
        <div>{msg}</div>
      {:else}
        Empty modal
      {/if}
    </div>
    <div class="modal__footer">
      {#if type === "no-phantom"}
        <button class="primary" on:click={installPhantom}>
          Install Phantom
        </button>
        <button class="primary" on:click={close}>Close</button>
      {:else}
        <button class="primary" on:click={close}>Close</button>
      {/if}
    </div>
  </div>
{/if}
