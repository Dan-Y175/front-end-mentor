<script>
    import { slide } from "svelte/transition";
    import Tesseract from "tesseract.js";

    let output;
    let medications;
    let medicationStems = $state([]);
    let openStates = $state([]);

    async function readImg(img) {
        const worker = await Tesseract.createWorker('eng');
        await worker.setParameters({
            tessedit_pageseg_mode: Tesseract.PSM.SINGLE_COLUMN})
        const ret = await worker.recognize(img);
        await worker.terminate();
        return ret.data;
    }

    async function handleSubmit(event) {
        medicationStems = [];
        const data = new FormData(event.target);
        let selectedImg = data.get("image")
        let result = await readImg(selectedImg);
        output = result.text
        medications = output.split("\n").filter(e => e != "");
        sanitize(medications);
        openStates = Array(medicationStems.length).fill(false);
    }

    function sanitize(input) {
        for (let i = 0; i < input.length; i++) {
            const word = (input[i].split(' '))[0];
            medicationStems.push(word);
        }
    }

    function toggle(index) {
        openStates[index] = !openStates[index];
        openStates = [...openStates];
    }



</script>
<div class="container">

    <div class="form-container">
        <h2>Input image:</h2>
        <form on:submit|preventDefault={handleSubmit}>
        <label for="image" class="file-label">Choose image</label>
        <input id="image" name="image" type="file" accept=".jpg, .jpeg, .png"/> 
        <label for="submit" class="submit">Analyze</label>
        <input id="submit" type="submit" value="Analyze">
        </form>
    </div>

    <div class="medication-list">
        <ul>
            {#each medicationStems, i}
                <div class="medListElement">
                    <li>{medicationStems[i]}</li>
                    <span class="toggle" on:click={() => toggle(i)}>{openStates[i] ? "v" : "<"}</span>
                    {#if openStates[i]}
                        <input type="text" bind:value={medicationStems[i]} in:slide out:slide class="editBox"/>
                    {/if} 
                </div>
            {/each}
        </ul>
    </div>



</div>


<style>

    :global(body) {
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #eeedda;
    }

    .container {
        margin: 25%;
        min-block-size: 300px;
        block-size: auto;
        max-inline-size: 500px;
        border-radius: 15px;
        background-color: #202020;
        display: flex;
        flex-direction: column;
        color: white;
    }

    .form-container {
        background-color: rgb(61, 116, 182);
        margin: 5px;
        border-radius: 10px;
        color: white;
    }

    .form-container h2 {
        margin: 5px;
        display: flex;
        flex-direction: column;
    }

    #image, #submit{
        display: none;
    }

    .file-label, .submit{
        display: inline-block;
        margin-inline: 5px;
        cursor: pointer;
        border: solid black;
        border-radius: 10px;
        padding-inline: 5px;
        margin-block-end: 5px;
        background-color: black;
    }

    .toggle {
        cursor: pointer;
        user-select: none;
        transition: 1s ease;
        grid-area: tag;
    }

    .medListElement {
        display: grid;
        grid-template-areas: 
        "med-name tag"
        "input input";
    }

    .medListElement li {
        grid-area: med-name;
        inline-size: 20px;
    }

    .editBox {
        max-inline-size: 100px;
        grid-area: input;
    }


</style>