import wordlist from "./wordlist.json";

function initBoard(x, y) {
    let board = [];

    for (let i = 0; i < x; i++) {
        board[i] = [];
        for (let j = 0; j < y; j++) {
            board[i][j] = {
                state: "empty",
                letter: "",
            };
        }
    }
    return board;
}

function daysPassed(first, second) {
  return Math.ceil((first - second + 1) / 86400000);
}

function getWordByDayId(dayId) {
    let wordId = dayId % wordlist.length;
    return wordlist[wordId];
}

function getTodaysWord() {
    let now = Date.now();
    let dayId = daysPassed(now, new Date(2020, 0, 1));
    return getWordByDayId(dayId);
}

function formatRow(word, row) {
    let new_row = [];
    for (let i = 0; i < row.length; i++) {
        let tile = row[i];
        if (word[i] === tile.letter) {
            new_row.push({
                state: "correct",
                letter: tile.letter,
            });
        } else if (word.indexOf(tile.letter) !== -1) {
            new_row.push({
                state: "partial",
                letter: tile.letter,
            })
        } else {
            new_row.push({
                state: "incorrect",
                letter: tile.letter,
            })
        }
    }
    
    return new_row;
}

export { initBoard, getTodaysWord, formatRow, getWordByDayId, daysPassed };
