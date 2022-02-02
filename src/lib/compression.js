import { initBoard, formatRow, daysPassed, getWordByDayId } from "./utils.js";

function compressedBody(board) {
    let output = "";
    for (let row_id = 0; row_id < board.length; row_id++) {
        let row = board[row_id];
        for (let tile_id = 0; tile_id < row.length; tile_id++) {
            output += board[row_id][tile_id].letter;
        }
    
        // Winning row check
        if (row.filter(tile => tile.state === "correct").length === 5) {
            return output;
        }
    }
    return output;

}
function compress(board) {
    let output = "";

    // Save the timestamp for getting the word via getWordByDate.
    let dayId = daysPassed(Date.now(), new Date(2020, 0, 1));
    output += `${dayId}-`;
    let body = compressedBody(board);
    output += body.split("").reverse().join("");
    return output;
}

function decompress(output) {
    let board = initBoard(6, 5);

    let splitted = output.split("-");
    let dayId = splitted[0];
    let boardData = splitted[1].split("").reverse().join("");
    let word = getWordByDayId(dayId);

    for (let row_id = 0; row_id < board.length; row_id++) {
        let row = board[row_id];
        for (let tile_id = 0; tile_id < row.length; tile_id++) {
            let contents = boardData[row_id * 5 + tile_id];
            if (contents === undefined) {
                return board;
            }
            board[row_id][tile_id].letter = contents;
        }
        board[row_id] = formatRow(word, row);
    }
    return board;
}

export { compress, decompress };
