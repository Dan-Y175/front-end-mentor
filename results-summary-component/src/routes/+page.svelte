<script>
    import Component from './Results-summary.svelte';
    import { onMount } from "svelte";

    let data;
    let loading = true;

    onMount(async () => {
        let res = await fetch('data.json');
        data = await res.json();
        loading = false;
    })

</script>


{#if loading}
    <h1>Loading...</h1>
{:else}
    <Component {data}/>
{/if}


<style>

    :global(body) {
        margin: 25%;
        background-color: hsl(221, 100%, 96%);
    }



</style>