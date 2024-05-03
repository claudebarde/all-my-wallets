<script lang="ts">
  import Header from "../components/Header.svelte";
  import NavColumn from "../components/NavColumn.svelte";
  import type { tokenData } from "$lib/global";

  export let data: tokenData;
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

  main {
    display: grid;
    grid-template-rows: 7% 93%;
    height: 100vh;
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    overflow: hidden;

    .content {
      display: grid;
      grid-template-columns: 15% 85%;
    }
  }
</style>

<main>
  <Header />
  <div class="content">
    <NavColumn />
    <slot {data} />
  </div>
</main>
