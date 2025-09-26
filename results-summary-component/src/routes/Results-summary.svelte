<script>
    export let data;

    import reactionImg from '$lib/assets/images/icon-reaction.svg';
    import memoryImg from '$lib/assets/images/icon-memory.svg';
    import verbalImg from '$lib/assets/images/icon-verbal.svg';
    import visualImg from '$lib/assets/images/icon-visual.svg';

    let result = Math.floor((data[0].score + data[1].score + data[2].score + data[3].score) / 4);

</script>

<div class="container">
    <section class="result">
        <h1>Your Result</h1>
        <div class="result-circle">
            <p class="score">{result}</p>
            <p class="of-100">of 100</p>
        </div>
        <h2>Great</h2>
        <p class="result-text">You scored higher than 65% of the people who have taken these tets.</p>

    </section>

    <section class="summary">
        <div class="summary-content">
            <h3>Summary</h3>
            <div class="summary-rows-container">
                <div class="summary-rows red-bg">
                    <div class="summary-header">
                        <img src={reactionImg} alt="reaction">
                        <p class="red-text">Reaction</p>
                    </div>
                    <p> {data[0].score} / <span>100</span> </p>
                </div>
                <div class="summary-rows yellow-bg">
                    <div class="summary-header">
                        <img src={memoryImg} alt="memory">
                        <p class="yellow-text">Memory</p>
                    </div>
                    <p> {data[1].score} / <span>100</span> </p>
                </div>
                <div class="summary-rows green-bg">
                    <div class="summary-header">
                        <img src={verbalImg} alt="verbal">
                        <p class="green-text">Verbal</p>
                    </div>
                    <p> {data[2].score} / <span>100</span> </p>
                </div>
                <div class="summary-rows blue-bg">
                    <div class="summary-header">
                        <img src={visualImg} alt="visual">
                        <p class="blue-text">Visual</p>
                    </div>
                    <p> {data[3].score} / <span>100</span> </p>
                </div>
                <button>Continue</button>
            </div>
            
            
        </div>

    </section>

</div>


<style>

    * {
        font-size: 18px;
        font-family: "Hanken Grotesk";
    }

    .container {
        display: flex;
        inline-size: 375px;
        background-color: white;
        border-radius:15px;
        box-shadow: 0.2px 0.2px 15px hsl(219, 33%, 88%);
    }

    .result {
        background-image: linear-gradient(hsl(252, 100%, 67%), hsl(241, 81%, 54%) );
        text-align: center;
        border-radius: 15px;
        block-size: 275px;
        inline-size: 175px;
        color: white;
    }

    h1 {
        margin-block: 20px;
        font-weight: normal;
    }

    .result-circle {
        inline-size: 100px;
        block-size: 100px;
        border-radius: 50%;
        margin: auto;
        background-image: linear-gradient(hsla(256, 72%, 46%, 1), hsla(241, 72%, 46%, 0) );
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.1;
    }

    .score {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
    }

    .of-100 {
        margin: 0;
        font-size: 0.6rem;
    }

    .result-text {
        font-size: 0.6rem;
        margin-inline: 25px;
    }

    .summary {
        inline-size: 200px;
    }

    h3 {
        margin-block: 15px;
    }

    .summary-content {
        margin-inline: 20px;
    }

    .summary-rows-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .summary-header {
        display: flex;
        gap: 2px;
        font-weight: bold;
    }

    img {
        inline-size: 20px;
        margin-inline-start: 5px;
    }

    .summary-rows {
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
    }

    .summary-rows p {
        font-size: 0.7rem;
        margin-inline-end: 5px;
    }

    button {
        border-radius: 20px;
        background-color: hsl(224, 30%, 27%);
        color: white;
        inline-size: 100%;
        block-size: 25px;
        font-size: 0.7rem;
    }

    .red-bg {
        background-color: hsla(0, 100%, 67%, 0.2);
    }

    .yellow-bg {
        background-color: hsla(39, 100%, 56%, 0.2);
    }

    .green-bg {
        background-color: hsla(166, 100%, 37%, 0.2);
    }

    .blue-bg {
        background-color: hsla(234, 85%, 45%, 0.2);
    }

    .red-text {
        color: hsl(0, 100%, 67%);
    }

    .yellow-text {
        color: hsl(39, 100%, 56%);
    }  

    .green-text {
        color:  hsl(166, 100%, 37%)
    }

    .blue-text {
        color:  hsl(234, 85%, 45%)
    }

    span {
        color: rgb(161, 156, 156);
        font-size: inherit;
    }







</style>