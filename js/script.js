window.onbeforeunload = function() { return true }

const formSubmit = document.querySelector("form");
const playerName = document.getElementById("name");
const playerPaid = document.getElementById("cb1");
const paidLabel = document.getElementById("cb1-label");
const headerElement = document.getElementById("pool-registration");
const formElement = document.getElementById("form-registration");
const spanNamesTbl1 = document.querySelectorAll(".names-tb1");
const spanNamesTbl2 = document.querySelectorAll(".names-tb2");
const gameContainer = document.getElementById("games");
const startDiv = document.querySelector(".start");
const startGames = document.getElementById("start");
const buyNameDiv = document.querySelector(".buy-name");
const buyNameSpan = document.getElementById("buy-name");

function Player(name, paid) {
    this.name = name;
    this.paid = paid;
}

function Stats(name, wins, losses) {
    this.name = name;
    this.wins = wins;
    this.losses = losses;
}

let players = [], // Arrays
    stats = [],
    nextRound = [],
    playersLength = 4; // Initial amount of players to start games.

// Checkbox Listener
playerPaid.addEventListener("change", () => {
    if (playerPaid.checked) {
        paidLabel.textContent = "Paid!";
    } else {
        paidLabel.textContent = "Not Paid.";
    }
});

// Submit Player into game
addEventListener("submit", (e) => {
    e.preventDefault();
    let name = playerName.value;
    let paid = playerPaid.checked;
    players.push(new Player(name, paid));
    console.log(players.length, name);

    if (players.length >= playersLength) {
        startDiv.style.display = "flex";
        startGames.style.display = "block";
    }

    setTimeout(() => {
        playerName.value = "";
        playerPaid.checked = false;
    }, 200);
});

// Start Game Button listener
startGames.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you Sure you want to start the Games?")) {
        startTheTournament(players);
    } else {
        playersLength += 1;
        startGames.style.display = "none";
    }
});

// Start Games Function
let buy;
function startTheTournament(players) {
    headerElement.style.display = "none"; // Hide Header Element
    formElement.style.display = "none"; // Hide Form Element
    startGames.style.display = "none"; // Hide Start Games Button

    let playersArr = players;
    let round = [];

    if (playersArr.length % 2 !== 0) {
        let x = Math.floor(Math.random() * playersArr.length);
        buy = playersArr.splice(x, 1);
        let name = buy[0].name;
        stats.push(new Stats(name, 1, 0));
        buyNameDiv.style.display = "flex";
        buyNameSpan.style.display = "block";
        startDiv.style.display = "none";
        buyNameSpan.innerText = `${name} has a Buy.`;
    }

    do {
        let x = Math.floor(Math.random() * playersArr.length);
        let y = playersArr.splice(x, 1);
        round.push(y[0].name);
    } while (players.length > 0);

    addPlayerName(round);

    gameContainer.style.display = "flex";
}

let addPlayerArr = [];
function addPlayerName(players){
    addPlayerArr = players;
    if (addPlayerArr.length >= 2) {
        spanNamesTbl1.forEach(name => {
            if (name.innerText == "") {
                let element = name.id;
                let nameOfPlayer = addPlayerArr.splice(0, 1);
                document.getElementById(element).innerText = nameOfPlayer;
                addPlayerName(addPlayerArr);
            }
        });
        spanNamesTbl2.forEach(name => {
            if (name.innerText == "") {
                let element = name.id;
                let nameOfPlayer = addPlayerArr.splice(0, 1);
                document.getElementById(element).innerText = nameOfPlayer;
            }
        });
    }
}

const tb1 = document.querySelectorAll('input[type="radio"][name="tb1-winner"]');
const tb2 = document.querySelectorAll('input[type="radio"][name="tb2-winner"]');
const tb1Button = document.getElementById("tb1-button");
const tb2Button = document.getElementById("tb2-button");

tb1.forEach(tb1Winner => {
    tb1Winner.addEventListener("click", (e) => {
        document.getElementById("tb1-button").innerText = "Winner!";
        tb1Button.disabled = false;
    })
});

tb2.forEach(tb2Winner => {
    tb2Winner.addEventListener("click", (e) => {
        document.getElementById("tb2-button").innerText = "Winner!";
        tb2Button.disabled = false;
    })
});

tb1Button.addEventListener("click", (e) => {
    radioButtonChecked("tb1-winner");
});

tb2Button.addEventListener("click", (e) => {
    radioButtonChecked("tb2-winner");
    // radiosEmtpyActions();
});

function radioButtonChecked(groupName) {
    const radios = document.querySelectorAll(`input[type="radio"][name="${groupName}"]`);
    let winner = "";
    let losser = "";
    let table = "";

    if (groupName === "tb1-winner") {
        table = "tb1";
    } else {
        table = "tb2";
    }

    radios.forEach(radio => {
        if (radio.checked && radio.id === `player-1-${table}`) {
            winner = document.getElementById(`${table}-name1`).innerText;
            losser = document.getElementById(`${table}-name2`).innerText;
        } 
        if (radio.checked && radio.id === `player-2-${table}`) {
            losser = document.getElementById(`${table}-name1`).innerText;
            winner = document.getElementById(`${table}-name2`).innerText;
        }
        radio.checked = false;
    });

    updateStats(winner, 1, 0);
    updateStats(losser, 0, 1);

    const tableOne = document.querySelectorAll(".names-tb1");
    const tableTwo = document.querySelectorAll(".names-tb2");

    if (table === "tb1") {
        tableOne.forEach((e) => {
            e.innerText = "";
        });
    }
    if (table === "tb2") {
        tableTwo.forEach((e) => {
            e.innerText = "";
        });
    }

    addPlayerName(addPlayerArr);
    radiosInputsEmtpyActions(table, radios);
    console.log(stats);
}

function radiosInputsEmtpyActions(table, radios) {
    let inputs = Array.from(document.querySelectorAll(`.names-${table}`));
    const checkRadios = Array.from(document.querySelectorAll(`#${table}`));
    let btnElement = document.getElementById(`${table}-button`);
    if (areAllEmpty(inputs)) {
        btnElement.disabled = true;
        btnElement.innerText = "No Winner";
        radios.forEach(radio => {
            radio.disabled = true;
        });
        console.log("All inputs are empty!");
    } else {
        console.log("At least one input is filled.");
    }

    if (areAllEmptyRadios(checkRadios)) {
        btnElement.disabled = true;
        btnElement.innerText = "No Winner";
        radios.forEach(radio => {
            radio.checked = false;
        });
    }
}

function areAllEmptyRadios(elements) {
    for (let el of elements) {
        if (el.checked) {
            return false
        }
    }
    return true
}

function areAllEmpty(elements) {
    for (let el of elements) {
        if (el.innerText !== "") {
            return false
        }
    }
    return true
}

function updateStats(name, updateWins, updateLosses) {
    let person = stats.find(p => p.name === name);
    if (person) {
        if (updateWins == 1) person.wins += 1;
        if (updateLosses == 1) person.losses += 1;
    } else {
        stats.push(new Stats(name, updateWins, updateLosses));
    }
}

