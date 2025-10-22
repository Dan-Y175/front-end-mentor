<script>
import searchIcon from "../assets/images/icon-search.svg";
import errorIcon from "../assets/images/icon-error.svg"
import reloadIcon from "../assets/images/icon-retry.svg"
import loadingIcon from "../assets/images/icon-loading.svg"

let search = $state("");
let results = $state();
let loading = $state();
let toggleDropdown = $state();
let location = $state();
let errorPage = $state(false);

let {toSend} = $props();

async function fetchLocation() {
  toggleDropdown = true;
  let searchParams = search.replace(" ", "+");
  results = true;
  loading = true;
  if (!search) {
    toggleDropdown = false;
  }
  try {
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchParams}&count=4&language=en&format=json`);
    if (response.status != 200) {
      throw new Error;
    }
    results = (await response.json()).results;
    loading = false;

  } catch (error) {
    errorPage = true;
  }  
}

async function submitLocation() {
  let response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&wind_speed_unit=kmh&temperature_unit=celsius&precipitation_unit=mm`);
  let weatherData = await response.json();
  toSend({location, weatherData});
  search = "";
  results = "";
  toggleDropdown = false;
}
</script>

{#if errorPage} 
<div class="error-page">
  <img src={errorIcon} alt="errorIcon" width=40px/>
  <h1>Something went wrong</h1>
  <p>We couldn't connect to the server (API error). Please try again in a few moments.</p>
  <button on:click={()=>window.location.reload()}><span><img src={reloadIcon} alt="reloadIcon" width=10px>Retry</span></button>
</div>

{:else}

<div class="container">
  <h1>How's the sky looking today?</h1>
  <div class="search-bar">
    <div class="search-box">
      <img src={searchIcon} alt="searchIcon"/>
      <input type="text" bind:value={search} on:input={fetchLocation} placeholder="Search for a place..."/>
      {#if toggleDropdown}
        <div class="dropdown">
          
            {#if loading}
            <li class="loading">
              <img src={loadingIcon} alt="loadingIcon" width=20px/>
              <p>Search in progress</p>
            </li>
            {:else if results}
            <ul>
              {#each results as country}
                <li on:click={() => location = country} class:choice={location == country}>{country.name}</li>
              {/each}
            </ul>
            {:else}
            <p>No search result found!</p>
      {/if}
          
        </div>
      {/if}
    </div>
    <button class="search" on:click={submitLocation}>Search</button>
  </div>
  
</div>

{/if}


<style>

  .error-page {
    text-align: center;
    max-inline-size: 500px;
    margin-inline: auto;
  }

  .error-page button {
    all: unset;
    background-color: hsl(243, 27%, 20%);
    padding: 5px 10px;
    border-radius: 5px;
  }

  .error-page span {
    display: flex;
    text-align: center;
    padding: 0;
    gap: 5px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container > h1 {
    font-size: 3rem;
    margin-block-end: 3rem;
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
    inline-size: 400px;
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

  .search:active  {
      box-shadow: 
      inset 0 0 0 2px hsl(248, 70%, 36%), 
      inset 0 0 0 4px black;
      
      
  }

  .dropdown {
    position: absolute;
    top: 125%;
    left: 0;
    background-color: hsl(243, 27%, 20%);
    border-radius: inherit;
    inline-size: 100%;
    z-index: 1;
    padding-inline-start: 10px;
  }

  .dropdown ul {
    list-style: none;
    padding-inline: 0;
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

  .loading {
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 10px;
  }




</style>