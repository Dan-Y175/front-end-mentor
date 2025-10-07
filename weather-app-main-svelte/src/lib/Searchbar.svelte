<script>
import searchIcon from "../assets/images/icon-search.svg";

let search = $state("");
let results = $state();
let selected = $state();
let coord = $state();

let {toSend} = $props();

async function fetchLocation() {
  let searchParams = search.replace(" ", "+");
  let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchParams}&count=3&language=en&format=json`)
  results = (await response.json()).results;
}

function submitLocation() {
  coord = {"latitude": selected.latitude, "longitude": selected.longitude}
  toSend(coord);
}

</script>


<div class="container">
  <h1>How's the sky looking today?</h1>
  <div class="search-bar">
    <div class="search-box">
      <img src={searchIcon} alt="searchIcon"/>
      <input type="text" bind:value={search} on:input={fetchLocation} placeholder="Search for a place..."/>
      {#if results}
        <div class="dropdown">
          <ul>
          {#each results as country}
            <li on:click={() => selected = country} class:choice={selected == country}>{country.name}</li>
          {/each}
          </ul>
        </div>
      {/if}
    </div>
    <button class="search" on:click={submitLocation}>Submit</button>
  </div>
  
</div>



<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-bar {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .search-box {
    background-color:hsl(243, 27%, 20%);
    display: inline-block;
    padding: 10px;
    padding-inline-start: 10px;
    border-radius: 10px;
    inline-size: 300px;
    text-align: start;
    display: flex;
    flex-direction: row;
    border: 2px solid transparent;
    position: relative;
  }

  .search-box:focus-within {
    border: 2px solid white;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
  }

  input::placeholder {
    color: inherit;
  }

  .search {
    all: unset;
    background-color: hsl(233, 67%, 56%);
    padding: 10px;
    padding-inline: 15px;
    border-radius: 10px;
  }

  .search:hover {
    background-color:hsl(248, 70%, 36%);
  }

  .search:active {

  }

  .dropdown {
    position: absolute;
    top: 125%;
    left: 0;
    background-color: hsl(243, 27%, 20%);
    border-radius: inherit;
    inline-size: 100%;
  }

  .dropdown ul {
    list-style: none;
    padding-inline: 5px;
    padding-block: 10px;
    margin: 0;
  }

  .dropdown ul li {
    padding: 5px;
    border-radius: 5px;
    border: solid 2px hsl(243, 27%, 20%);
  }


  .dropdown ul li:hover {
    background-color: hsl(243, 23%, 30%);
  }

  .dropdown ul li.choice {
    border: solid white 2px;
  }





</style>