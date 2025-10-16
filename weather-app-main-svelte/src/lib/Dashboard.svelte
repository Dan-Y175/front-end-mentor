<script>
  import sunIcon from "../assets/images/icon-sunny.webp";
  import drizzleIcon from "../assets/images/icon-drizzle.webp";
  import fogIcon from "../assets/images/icon-fog.webp";
  import overcastIcon from "../assets/images/icon-overcast.webp";
  import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
  import rainIcon from "../assets/images/icon-rain.webp";
  import snowIcon from "../assets/images/icon-snow.webp";
  import stormIcon from "../assets/images/icon-storm.webp"
  import errorIcon from "../assets/images/icon-error.svg"
  import dropImg from "../assets/images/icon-dropdown.svg";

  let {location, weatherData, windSpeedUnit, precipitationUnit} = $props();

  let dayDrop = $state(false);
  let selectedDay = $state(new Date().toLocaleDateString('en-US', {weekday: "long"}));
  let dropDown;

  const dailyDateFormat = new Intl.DateTimeFormat('en-NZ', {
    weekday: "short"
  });

  let dailyDates = $derived((weatherData.daily.time).map(date => dailyDateFormat.format(new Date(date))));

  const mainCardFormatter = new Intl.DateTimeFormat('en-NZ', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  let formattedDate = mainCardFormatter.format(new Date());

  const dayDropFormatter = new Intl.DateTimeFormat('en-NZ', {
    weekday: 'long'
  });

  let hourlyDataObj = $derived.by(() => {
    let result ={};
    weatherData.hourly.time.forEach((e, i)=> {
      let [date, hour] = e.split("T");
      date = dayDropFormatter.format(new Date(date));
      if (!result[date]) result[date] = [];
      result[date].push({
        hour,
        temperature: weatherData.hourly.temperature_2m[i],
        weatherCode: weatherData.hourly.weather_code[i]
      })
    });
    return result;
  });

  function onWindowClick(e) {
    if (dropDown.contains(e.target) == false) {
      dayDrop = false;
    }
  }

  function timeConverter(t) {
    let timeString = t.split(":")[0]
    if (t == "00:00") {
      return "12 AM"
    } else if (t == "12:00") {
      return "12 PM";
    } else if (Number(timeString) < 12) {
      return timeString.replace(/^0+/, '') + " AM"
    } else {
      let timeNum = (Number(timeString)) - 12;
      return timeNum + " PM"
    }
  }

  function getWeatherCode(weatherCode) {
    switch (weatherCode) {
      case 0:
      case 1:
        return sunIcon;
      case (2):
        return partlyCloudyIcon;
      case (3):
        return overcastIcon;
      case 45:
      case 48:
        return fogIcon;
      case 51:
      case 53:
      case 55:
        return drizzleIcon;
      case 61:
      case 63:
      case 65:
        return rainIcon;
      case 71:
      case 73:
      case 75:
        return snowIcon;
      case 95:
      case 96:
      case 99:
        return stormIcon;
      default:
        return errorIcon;
      }
    };

</script>

<svelte:window on:click={onWindowClick} />

{#if location}
<div class="frame">
  <section>
    <div class="main-card">
      <div class="main-card-content">
        <div class="location">
          <h2>{location.name}, {location.country}</h2>
          <p>{formattedDate}</p>
        </div>
        <div class="main-card-temp">
          <img src={getWeatherCode(weatherData.current.weather_code)} alt="sunIcon" width="100px">
          <p>{weatherData.current.temperature_2m}</p>
        </div>
      </div>
    </div>

    <div class="main-card-lower-section">
      <div class="main-card-boxes">
        <p>Feels like</p>
        <h3>{weatherData.current.apparent_temperature}°</h3>
      </div>
      <div class="main-card-boxes">
        <p>Humidity</p>
        <h3>{weatherData.current.relative_humidity_2m}%</h3>
      </div>
      <div class="main-card-boxes">
        <p>Wind</p>
        <h3>{weatherData.current.wind_speed_10m} {#if windSpeedUnit == "kmh"}km/h{:else}mph{/if}</h3>
      </div>
      <div class="main-card-boxes">
        <p>Precipitation</p>
        <h3>{weatherData.current.precipitation} {#if precipitationUnit == "mm"}mm{:else}in{/if}</h3>
      </div>
    </div>
  </section>

  <section class=daily-forecast>
    <h3>Daily forecast</h3>
    <div class="forecast-row">
    {#each dailyDates as day, i}
      <div class="forecast-cards">
        <p>{day}</p>
        <img src={getWeatherCode(weatherData.daily.weather_code[i])} alt="weatherIcon" width="40px"/>
        <div class="min-max-temp">
          <p>{Math.floor(weatherData.daily.temperature_2m_max[i])}°</p>
          <p>{Math.floor(weatherData.daily.temperature_2m_min[i])}°</p>
        </div>
      </div>
    {/each}
    </div>
  </section>

  <section class="hourly-forecast">
    <div class="hourly-forecast-header">
      <h3>Hourly forecast</h3>
      <div class="dayDrop" bind:this={dropDown}>
      <button on:click={() => dayDrop = !dayDrop}>
        <span>
        <p>{selectedDay}</p>
        <img src={dropImg} alt="dropImg"/>
        </span>
      </button>
      
      {#if dayDrop}
        <ul class="dayOptions">
        {#each Object.keys(hourlyDataObj) as day}
          <li class:active={selectedDay == day} on:click={() => selectedDay = day}>{day}</li>
        {/each}
        </ul>
      {/if}
      </div>
    </div>
    <div class="scroll-container">
      {#each hourlyDataObj[selectedDay] as day}
      <div class="hourly-card">
        <div class="hourly-card-left">
          <img src={getWeatherCode(day.weatherCode)} alt="weatherIcon" width="40px"/>
          <p>{timeConverter(day.hour)}</p>
        </div>
        <p>{Math.floor(day.temperature)}°</p>
      </div>
      {/each}
    </div>
  </section>

</div>

{/if}



<style>
  
  .frame {
    display: grid;
    grid-template-areas: 
    "main-card hourly-forecast"
    "daily-forecast hourly-forecast";
    margin-inline: 100px;
    gap: 20px;
    margin-block: 30px;
    
  }

  .main-card {
    grid-area: main-card;
    background-image: url("../assets/images/bg-today-large.svg");
    background-repeat: no-repeat;
    background-size:auto;
    block-size: 200px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .main-card-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-inline: 20px;
  }

  .location {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main-card-temp {
    display: flex;
    align-items: center;
  }

  .main-card-temp p {
    font-size: 5rem;
  }

  .main-card-lower-section {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-block-start: 20px;
  }

  .main-card-boxes {
    background-color: hsl(243, 27%, 20%);
    inline-size: 125px;
    block-size: 75px;
    border-radius: 10px;
    border: solid hsl(243, 23%, 24%) 2px;
    padding: 10px;
  }

  .main-card-boxes p {
    margin-block-start: 5px;
  }

  .main-card-boxes h3 {
    margin-block: 5px;
    font-weight:normal;
    font-size: 1.5rem;
  }

  .hourly-forecast {
    grid-area: hourly-forecast;
    inline-size: 300px;
    background-color: hsl(243, 27%, 20%);
    border: solid hsl(243, 23%, 24%) 2px;
    border-radius: 10px;
    padding-inline: 15px;
    position: relative;
    max-block-size: 520px;
  }

  .scroll-container {
    overflow: auto;
    max-block-size: 80%;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }

  .daily-forecast {
    grid-area: daily-forecast;
  }

  
  .forecast-row {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .forecast-cards {
    border: solid hsl(243, 23%, 24%) 2px;
    background-color: hsl(243, 27%, 20%);
    border-radius: 10px;
    padding-inline: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .forecast-cards p {
    margin-block: 10px;
  }

  .min-max-temp {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }


  .dayOptions {
    position: absolute;
    list-style: none;
    background-color: hsl(243, 27%, 20%);
    border: solid hsl(243, 23%, 24%) 2px;
    border-radius: 5px;
    right: 0px;
    top: 120%;
    margin: 0;
    width: 100%;
    inline-size: 150px;
    padding: 5px;
  }

  .dayOptions li {
    padding: 5px;
    border-radius: 5px;
  }

  .active {
    background-color: hsl(243, 23%, 30%);
  }

  .dayOptions li:hover {
    background-color: hsl(243, 23%, 30%);
  }

  .dayDrop {
    background-color: hsl(243, 27%, 20%);
    border-radius: 5px;
    position: relative;
  }

  .dayDrop button {
    all: unset;
    padding: 5px 10px;
    background-color: hsl(243, 23%, 30%);
    border-radius: 5px;
  }

  .dayDrop span {
    display: flex;
    align-items: center;
    gap: 5px; 
  }

  .dayDrop p {
    margin: 0;
  }

  .hourly-forecast-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .hourly-card{
    background-color: hsl(243, 23%, 30%);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-block: 5px;
  }
  .hourly-card img {
    margin-inline-start: 10px;
  }

  .hourly-card p {
    margin-inline-end: 10px;
  }

  .hourly-card-left {
    display: flex;
    flex-direction: row;
  }



</style>