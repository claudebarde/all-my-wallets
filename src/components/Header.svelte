<script>
  import WalletManager from "./WalletManager.svelte";
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap");

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;

    .title {
      font-family: "Dancing Script", cursive;
      font-optical-sizing: auto;
      font-weight: 500;
      font-size: 2rem;

      a {
        font-weight: inherit;
        font-size: inherit;
        text-decoration: none;
      }
    }
  }
</style>

<header>
  <div class="title">
    <a href="/"> All My Wallets </a>
  </div>
  <WalletManager />
</header>
