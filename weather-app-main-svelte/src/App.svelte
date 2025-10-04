<script>
  import Header from "./lib/Header.svelte";
  import Searchbar from "./lib/Searchbar.svelte";

  let toggled = $state();

  $inspect(toggled);
</script>

<main>
  <Header bind:toggled/>
  <Searchbar/>


</main>

<style>

    :global(body) {
      background-color: hsl(243, 96%, 9%);
      color: hsl(0, 0%, 100%);
      font-family: "DM Sans";
      font: 18px;
    }

  </style>