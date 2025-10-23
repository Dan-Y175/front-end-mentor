<script>
    import logo from "../assets/images/logo.svg"
    import unit from "../assets/images/icon-units.svg";
    import dropImg from "../assets/images/icon-dropdown.svg";
    import checkImg from "../assets/images/icon-checkmark.svg"

    let unitsDrop = false;
    let imperial = false;
    let dropDown;
    export let toggled = {
        "temperature" : "celsius",
        "windSpeed": "kmh",
        "precipitation": "mm"
    };

    function imperialSwitch() {
        toggled = {
        "temperature" : "fahrenheit",
        "windSpeed": "mph",
        "precipitation": "inch"
    };
        imperial = true;
    }

    function metricSwitch() {
        toggled = {
        "temperature" : "celsius",
        "windSpeed": "kmh",
        "precipitation": "mm"
    }
        imperial = false;
    }

    function onWindowClick(e) {
        if (dropDown.contains(e.target) == false) {
            unitsDrop = false;
        }
    }

</script>

<svelte:window on:click={onWindowClick} />
  
<div class="header">
    <div class="weather-now-header">
        <img class="logo" src={logo} alt="logo"/>
    </div>

    <div class="units" bind:this={dropDown} class:button-active={unitsDrop}>
        <button on:click={() => unitsDrop = !unitsDrop} >
        <span>
            <img src={unit} alt="unit" width="13px"/>
            <p>Units</p>
            <img src={dropImg} alt="dropImg"/>
        </span>
        </button>
        {#if unitsDrop}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <ul class="dropdown">
                {#if !imperial}
                    <li class="toggled" on:click={() => imperialSwitch()}>Switch to Imperial</li>
                {:else}
                    <li class="toggled" on:click={() => metricSwitch()}>Switch to Metric</li>
                {/if}
                <p>Temperature</p>

                <li class:active={toggled.temperature == "celsius"} on:click={() => toggled.temperature = "celsius"}>Celsius (°C)
                    <span> {#if toggled.temperature == "celsius"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>

                <li class:active={toggled.temperature == "fahrenheit"} on:click={() => toggled.temperature = "fahrenheit"}>Fahrenheit (°F)
                    <span> {#if toggled.temperature == "fahrenheit"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>
                <hr>
                <p>Wind Speed</p>
                <li class:active={toggled.windSpeed == "kmh"} on:click={() => toggled.windSpeed = "kmh"}>km/h
                    <span> {#if toggled.windSpeed == "kmh"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>
                <li class:active={toggled.windSpeed == "mph"} on:click={() => toggled.windSpeed = "mph"}>mph
                    <span> {#if toggled.windSpeed == "mph"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>
                <hr>
                <p>Precipitation</p>
                <li class:active={toggled.precipitation == "mm"} on:click={() => toggled.precipitation = "mm"}>Milimeters (mm)
                    <span> {#if toggled.precipitation == "mm"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>
                <li class:active={toggled.precipitation == "inch"} on:click={() => toggled.precipitation = "inch"}>Inches (in)
                    <span> {#if toggled.precipitation == "inch"} <img src={checkImg} alt="checkImg" width=15px/> {/if}</span></li>
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
        margin-inline: 10%;
        margin-block-start: 2%;

        transform: scale(1);
        transform-origin: top;
        
            
        @media (max-width: 376px) {
            margin-inline: 0;
            inline-size: 375px;
            transform: scale(0.8);
    }
    }

    .units {
        background-color: hsl(243, 27%, 20%);
        border-radius: 5px;
        position: relative;
        z-index: 1;
        font-size: 0.8rem;
        border: solid transparent;
    }

    .units button {
        all: unset;
        padding: 8px 10px;
    }

    .button-active {
        border: solid white;
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
        background-color: hsl(243, 27%, 20%);
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