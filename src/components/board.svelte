{#each tiles as row}
    <div class="row">
        {#each row as tile}
            <Tile state={tile.state} letter={tile.letter} />
        {/each}
    </div>
{/each}

<script>
    import Tile from "./tile.svelte";

    export let tiles;
</script>

<style>
    .row {
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin: 5px;
        width: 90%;
        max-width: max-content;
    }
</style>
