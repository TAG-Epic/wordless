<svelte:head>
    <title>Today | Wordle</title>
</svelte:head>
<svelte:window on:keydown={handleKeydown}/>
<div class="game">
    <Board tiles={tiles} />
</div>
{#if !playing && !dismissed_modal}
    <div class="tint">
        <div class="game-over-modal">
            <h2>Game Over</h2>
            <p>The word was {word}</p>
            <button on:click={shareResults}>Share results</button>
            <button on:click={() => {dismissed_modal = true;}}>Close</button>
        </div>
    </div>
{/if}
<script>
    import Board from "../components/board.svelte";
    import { initBoard, getTodaysWord, formatRow } from "../lib/utils.js";
    import { compress } from "../lib/compression.js";
    
    let tiles = initBoard(6, 5);
    let word = getTodaysWord();

    let row = 0;
    let letter = 0;
    let playing = true;
    let dismissed_modal = false;

    
    function handleKeydown(e) {
        let keyCode = e.keyCode;
        
        if (!playing) {
            return;
        }

        // Special keys
        if (keyCode === 13) {
            // Enter
            if (letter !== 5) {
                // Not at the end of the row
                return;
            }
            e.preventDefault();
            submitRow();
            return;
        }
        if (keyCode === 8) {
            // Backspace
            if (letter === 0) {
                // Not at the beginning of the row
                return;
            }
            e.preventDefault();
            removeLetter();
            return;
        }

        // Normal keys
        if (keyCode < 65 || keyCode > 90) {
            // Non english characters. Ignore!
            return;
        }
        e.preventDefault();
        
        registerLetter(keyCode);
    }

    function registerLetter(keyCode) {
        let key = String.fromCharCode(keyCode).toLowerCase();

        if (letter >= 5) {
            // Reached row limit.
            return;
        }
        // Set it
        tiles[row][letter] = {
            letter: key,
            state: "set"
        };
        letter++;

    }
    function removeLetter() {
        // Remove it
        console.log(`Removing letter at ${row}, ${letter}`);
        tiles[row][letter-1] = {
            letter: "",
            state: "empty"
        };
        letter--;
    }

    function submitRow() {
        tiles[row] = formatRow(word, tiles[row]);

        if (tiles[row].filter(tile => tile.state === "correct").length === 5) {
            // Row is correct
            playing = false;
            return;
        }

        row++;
        letter = 0;

        if (row == 6) {
            // Game is over
            playing = false;

            // TODO: Display correct word
        }
    }

    function shareResults() {
        let compressed = compress(tiles);
        let encoded = encodeURIComponent(compressed);
        let url = `${window.location.origin}/view?t=${encoded}`;

        navigator.clipboard.writeText(url);
    }
</script>

<style>
    .tint {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10;
    }

    .game-over-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 200px;
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    button {
        margin: 3px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 300px;
    }
    .game {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
