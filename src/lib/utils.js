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
    const wordLetters = Array.from(word);
    const rowLetters = row.map((tile) => tile.letter);
    const newRow = row.map((tile) => ({
        state: "incorrect",
        letter: tile.letter,
    }));
    for (let i = 0; i < row.length; i++) {
        let tile = row[i];
        if (word[i] === tile.letter) {
            newRow[i].state = "correct";
            wordLetters[i] = null;
            rowLetters[i] = null;
        }
    }
    for (let i = 0; i < row.length; i++) {
        let tile = row[i];
        if (rowLetters[i] !== null && wordLetters.indexOf(tile.letter) !== -1) {
            newRow[i].state = "partial";
            wordLetters[wordLetters.indexOf(tile.letter)] = null;
        }
    }    
    return newRow;
}

export { initBoard, getTodaysWord, formatRow, getWordByDayId, daysPassed };
