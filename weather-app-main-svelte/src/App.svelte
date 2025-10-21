<script>
  import Header from "./lib/Header.svelte";
  import Searchbar from "./lib/Searchbar.svelte";
  import Dashboard from "./lib/Dashboard.svelte";

  let toggled = $state();
  let location = $state();
  let weatherData = $state();

  function receiveData(data) {
    location = data.location;
    weatherData = data.weatherData;
  }
</script>

<main>
  <div class="frame">
    <Header bind:toggled/>
    <Searchbar toSend={receiveData}/>
    <Dashboard {location} {weatherData} windSpeedUnit={toggled.windSpeed} precipitationUnit={toggled.precipitation} temperatureUnit={toggled.temperature}/>
  </div>
</main>

<style>

    :global(body) {
      background-color: hsl(243, 96%, 9%);
      color: hsl(0, 0%, 100%);
      font-family: "DM Sans";
      font: 18px;
    }

    .frame {
      margin: 2rem 5rem;
    }

  </style>