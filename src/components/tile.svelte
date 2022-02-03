<svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</svelte:head>


<div class={"tile" + " " + state}>
    <span class="letter">{letter}</span>
</div>


<script>
    export let state;
    export let letter;

    // let tileClasses = "tile " + state;
</script>

<style>
    .tile {
        width: 100px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px solid red;
        position: relative;
    }
    .incorrect {
        background-color: #3a3a3c;
        border: 4px solid #3a3a3c;
    }
    .partial {
        background-color: #B59F3B;
        border: 4px solid #B59F3B;
    }
    .correct {
        background-color: #538d4e;
        border: 4px solid #538d4e;
    }
    .empty {
        background-color: #00000000;
        border: 4px solid #272729;
    }
    .set {
        border: 4px solid #565758;
    }
    .invalid {
        border: 4px solid #FF0000;
    }
    .letter {
        font-size: min(10vw, 4em);
        font-family: "Roboto", sans-serif;
        color: white;
        text-transform: uppercase;
    }
</style>
