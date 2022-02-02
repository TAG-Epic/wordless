<svelte:head>
    <title>Highlight | Wordsy</title>
</svelte:head>

<div class="game">
    <Board tiles={tiles} />
</div>
{#if showing_spoilers_dialog}
    <div class="dialog">
        <h1>Spoilers!</h1>
        <p>Do you want to show the letters guessed?</p>
        <div class="action-buttons">
            <button class="accept-button dialog-button" on:click={() => {setShowSpoilers(true)}}>Yes</button>
            <button class="deny-button dialog-button" on:click={() => {setShowSpoilers(false)}}>No</button>
        </div>
    </div>
{/if}



<script>
    import Board from "../components/board.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { decompress } from "../lib/compression.js";

    let tiles = [];
    let showing_spoilers_dialog = true;
    let allow_spoilers = false;

    function load() {
        const urlParams = new URLSearchParams(window.location.search);

        let raw_data = urlParams.get("t");
        tiles = decompress(raw_data);
        
        if (!allow_spoilers) {
            for (let row_id = 0; row_id < tiles.length; row_id++) {
                for (let tile_id = 0; tile_id < tiles[row_id].length; tile_id++) {
                    let tile = tiles[row_id][tile_id].letter = "";
                }
            }
        }
        
    }

    function setShowSpoilers(value) {
        showing_spoilers_dialog = false;
        allow_spoilers = value;
        load();
    }
</script>

<style>
    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
        height: 300px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .action-buttons {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
    }
    .dialog-button {
        background: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        font-size: 1.2em;
        cursor: pointer;
    }
    .dialog-button {
        height: 50px;
        width: 100px;
        margin: 3px;
        padding: 10px;
        border: none;
        cursor: pointer;
    }

    .accept-button {
        background: #00ff00;
    }
    .deny-button {
        background: #ff0000;
    }
    .game {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

</style>
