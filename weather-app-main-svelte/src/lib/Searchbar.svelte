<script>
import searchIcon from "../assets/images/icon-search.svg";

let search = $state("");

async function fetchLocation() {
  let searchParams = search.replace(" ", "+");

  let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchParams}&count=5&language=en&format=json`)
  let result = await response.json();

  console.log(result);
}


</script>


<div class="container">
  <h1>How's the sky looking today?</h1>
  <div class="search-bar">
    <div class="search-box">
      <img src={searchIcon} alt="searchIcon"/>
      <input type="text" bind:value={search} placeholder="Search for a place..."/>
    </div>
    <button class="search" on:click={fetchLocation}>Submit</button>
  </div>
  
</div>




<style>
  
  .container {
    border: dotted white;
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




</style>