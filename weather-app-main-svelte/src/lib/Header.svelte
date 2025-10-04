<script>
    import logo from "../assets/images/logo.svg"
    import unit from "../assets/images/icon-units.svg";
    import dropImg from "../assets/images/icon-dropdown.svg";

    let unitsDrop = false;
    export let toggled = {
        "temperature" : "celsius",
        "windSpeed": "kmh",
        "precipitation": "milimeters"
    };

</script>
  
<div class="header">
    <div class="weather-now-header">
        <img src={logo} alt="logo"/>
    </div>

    <div class="units">
        <button on:click={() => unitsDrop = !unitsDrop}>
        <span>
            <img src={unit} alt="unit" width="15px"/>
            <p>Units</p>
            <img src={dropImg} alt="dropImg"/>
        </span>
        </button>
        {#if unitsDrop}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <ul class="dropdown">
                <li class="toggled">Switch to Imperial</li>
                <p>Temperature</p>

                <li class:active={toggled.temperature == "celsius"} on:click={() => toggled.temperature = "celsius"}>Celsius (*C)
                    <span> {#if toggled.temperature == "celsius"} ✔ {/if}</span></li>

                <li class:active={toggled.temperature == "fahrenheit"} on:click={() => toggled.temperature = "fahrenheit"}>Fahrenheit (*F)
                    <span> {#if toggled.temperature == "fahrenheit"} ✔ {/if}</span></li>
                <hr>
                <p>Wind Speed</p>
                <li class:active={toggled.windSpeed == "kmh"} on:click={() => toggled.windSpeed = "kmh"}>km/h
                    <span> {#if toggled.windSpeed == "kmh"} ✔ {/if}</span></li>
                <li class:active={toggled.windSpeed == "mph"} on:click={() => toggled.windSpeed = "mph"}>mph
                    <span> {#if toggled.windSpeed == "mph"} ✔ {/if}</span></li>
                <hr>
                <p>Precipitation</p>
                <li class:active={toggled.precipitation == "milimeters"} on:click={() => toggled.precipitation = "milimeters"}>Milimeters (mm)
                    <span> {#if toggled.precipitation == "milimeters"} ✔ {/if}</span></li>
                <li class:active={toggled.precipitation == "inches"} on:click={() => toggled.precipitation = "inches"}>Inches (in)
                    <span> {#if toggled.precipitation == "inches"} ✔ {/if}</span></li>
            </ul>
        {/if}
    </div>
</div>


<style>


    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .units {
        background-color: hsl(243, 27%, 20%);
        border-radius: 5px;
        position: relative;
    }

    .units button {
        all: unset;
        padding: 5px;
    }

    .units span{
        display:flex;
        flex-direction: row;
        gap:5px;
    }

    .units p {
        margin: 0;
    }

    .dropdown {
        list-style: none;
        background-color: hsl(243, 23%, 24%);
        border-radius: 5px;
        position: absolute;
        right: 0px;
        top: 120%;
        margin: 0;
        width: 100%;
        inline-size: 150px;
        padding: 5px;
    }

    .dropdown li, .dropdown p {
        padding: 5px;
        border-radius: 5px;
    }

    .dropdown p {
        color:hsl(240, 6%, 70%);
    }

    .dropdown hr {
        border: none;
        border-top: 2px solid hsl(243, 23%, 30%);
    }

    .dropdown span {
        font-size: 0.9rem;
    }

    .dropdown li:hover {
        background-color: hsl(243, 23%, 30%);
    }

    .dropdown li {
        display: flex;
        justify-content: space-between;
    }

    .active {
        background-color: hsl(243, 23%, 30%);
    }


</style>