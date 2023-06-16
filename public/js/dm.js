// Audio
const rollSound = new Audio("/audio/roll.wav");

// Modal
const modal = document.getElementById("modal");

// Text boxes / inputs
const results = document.getElementById("result-text");
const enemyNameInput = document.getElementById("enemyNameInput");
const enemyHealthInput = document.getElementById("enemyHealthInput");
const playerNameInput = document.getElementById("playerNameInput");
const playerDexInput = document.getElementById("playerDexInput");
const playerColorInput = document.getElementById("playerColorInput");
const addRemoveEnemyDiv = document.getElementById("addRemoveEnemy");
const initAddPlayerDiv = document.getElementById("initAddPlayer");
const playerRollInput = document.getElementById("initEnterRolls");
const initTitle = document.getElementById("init-title");

// Tables and containers
const rollTable = document.getElementById("history-table-row");
const enemyTable = document.getElementById("enemy-table");
const initButtons = document.getElementById("init-button-container");
const initPlayerStorage = document.getElementById("playerStorage");
const initPlayerRollInput = document.getElementById("playerRollInput");
const initNameHolder = document.getElementById("initRollNameHolder");

// D4
const addD4Button = document.getElementById("add-d4");
const subD4Button = document.getElementById("sub-d4");
const d4Holder = document.getElementById("d4-holder");

// D6
const addD6Button = document.getElementById("add-d6");
const subD6Button = document.getElementById("sub-d6");
const d6Holder = document.getElementById("d6-holder");

// D8
const addD8Button = document.getElementById("add-d8");
const subD8Button = document.getElementById("sub-d8");
const d8Holder = document.getElementById("d8-holder");

// D10
const addD10Button = document.getElementById("add-d10");
const subD10Button = document.getElementById("sub-d10");
const d10Holder = document.getElementById("d10-holder");

// D12
const addD12Button = document.getElementById("add-d12");
const subD12Button = document.getElementById("sub-d12");
const d12Holder = document.getElementById("d12-holder");

// D20
const addD20Button = document.getElementById("add-d20");
const subD202Button = document.getElementById("sub-d20");
const d20Holder = document.getElementById("d20-holder");

// Buttons
const closeModalButton = document.getElementById("closeModal");
const clearDiceButton = document.getElementById("dice-clear-btn");
const rollButton = document.getElementById("roll-btn");
const rollHistoryClearButton = document.getElementById("history-clear-btn");
const addEnemyButton = document.getElementById("add-enemy");
const addPlayerButton = document.getElementById("add-player");
const clearPlayersButton = document.getElementById("clear-players");
const clearEnemiesButton = document.getElementById("clear-enemies");
const acceptEnemyButton = document.getElementById("acceptEnemy");
const acceptPlayerButton = document.getElementById("acceptPlayer");
const acceptInitRollButton = document.getElementById("acceptRoll");
const startCombatButton = document.getElementById("start-combat");
const nextTurnButton = document.getElementById("next-turn");
const endCombatButton = document.getElementById("end-combat");

// Classes

class Bag {
    constructor() {
        this.dice = [];
    }
    rollAll() {
        let total = 0;
        this.dice.forEach((dice) => {
            dice.roll();
            console.log(dice.value());
            total += dice.value();
        });
        if (total > 0) {
            history.addItem(total);
            rollSound.play();
            localStorage.setItem(
                "storedRollHist",
                JSON.stringify(history.rollArr)
            );
        }
        return total;
    }
    clear() {
        this.dice = [];
        results.innerHTML = "";
    }
    addDice(sides, holder) {
        const newDice = new Dice(sides);
        this.dice.push(newDice);
        console.log(`New D${sides} added to bag.`);
        let count = 0;
        this.dice.forEach((dice) => {
            if (dice.numOfFaces === sides) count++;
        });
        holder.innerHTML = count;
    }
    removeDice(sides, holder) {
        for (let i = this.dice.length - 1; i >= 0; i--) {
            if (this.dice[i].numOfFaces === sides) {
                this.dice.splice(i, 1);
                break;
            }
        }
        let count = 0;
        this.dice.forEach((dice) => {
            if (dice.numOfFaces === sides) count++;
        });
        holder.innerHTML = count === 0 ? "" : count;
    }
}

class Dice {
    constructor(numOfFaces) {
        this.numOfFaces = numOfFaces;
        this.faceUpValue = null;
    }
    roll() {
        this.faceUpValue = Math.floor(Math.random() * this.numOfFaces + 1);
    }
    value() {
        return this.faceUpValue;
    }
}

class rollHistory {
    constructor() {
        this.rollArr = [];
    }
    addItem(data) {
        let newTd = document.createElement("td");
        newTd.setAttribute("class", "history-td");
        newTd.innerHTML = data;
        rollTable.prepend(newTd);
        this.rollArr.unshift(Number(data));
    }
    clear() {
        history = new rollHistory();
        while (rollTable.firstChild) {
            rollTable.removeChild(rollTable.firstChild);
        }
        localStorage.setItem("storedRollHist", []);
    }
}

class Enemy {
    constructor(name, maxHp, hp, id) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = hp;
        this.id = id;
    }
    subHealth(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.hp = 0;
            console.log(`${this.name} has been slain!`);
        }
        localStorage.setItem(
            "storedEnemies",
            JSON.stringify(enemies.enemyArray)
        );
    }
    addHealth(heal) {
        this.hp += heal;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
        localStorage.setItem(
            "storedEnemies",
            JSON.stringify(enemies.enemyArray)
        );
    }
    returnHealth() {
        return `${this.hp}/${this.maxHp}`;
    }
    createTableData() {
        let newTr = document.createElement("tr");
        let nameTd = document.createElement("td");
        let healthTd = document.createElement("td");
        let healDamageFieldTd = document.createElement("td");
        let buttonsTd = document.createElement("td");
        newTr.setAttribute("class", "enemy-info-row");
        newTr.setAttribute("id", `enemy-${this.id}`);
        nameTd.setAttribute("class", "enemy-name");
        healthTd.setAttribute("class", "enemy-health");
        healDamageFieldTd.setAttribute("class", "healDamageInput");
        buttonsTd.setAttribute("class", "enemy-buttons");
        nameTd.innerHTML = this.name;
        healthTd.innerHTML = this.returnHealth();
        healDamageFieldTd.innerHTML = `<input type="number" id="input-${this.id}" class="healDamageInputBox">`;
        buttonsTd.innerHTML = `<button class="health-plus-btn green-btn" id="heal-${this.id}">+</button><button class="health-minus-btn red-btn" id="damage-${this.id}">-</button>`;
        newTr.append(nameTd, healthTd, healDamageFieldTd, buttonsTd);
        enemyTable.append(newTr);
    }
}

class Enemies {
    constructor() {
        this.enemyArray = [];
    }
    addEnemy(name, maxHp, hp) {
        let id = this.generateId(enemies);
        let newEnemy = new Enemy(name, maxHp, hp, id);
        this.enemyArray.push(newEnemy);
        localStorage.setItem("storedEnemies", JSON.stringify(this.enemyArray));
        newEnemy.createTableData();
    }
    loadExistingEnemy(enemy) {
        let id = enemy.id;
        let name = enemy.name;
        let maxHp = enemy.maxHp;
        let hp = enemy.hp;
        let newEnemy = new Enemy(name, maxHp, hp, id);
        this.enemyArray.push(newEnemy);
        newEnemy.createTableData();
    }
    clearEnemies() {
        this.enemyArray = [];
        while (enemyTable.firstChild) {
            enemyTable.removeChild(enemyTable.firstChild);
        }
        localStorage.removeItem("storedEnemies");
    }
    generateId(currentEnemies) {
        let id = 0;
        if (currentEnemies.enemyArray.length > 0) {
            id =
                currentEnemies.enemyArray[currentEnemies.enemyArray.length - 1]
                    .id + 1;
        }
        return id;
    }
}

class Player {
    constructor(name, dex, color, init = 0) {
        this.name = name;
        this.dex = dex;
        this.color = color;
        this.init = init;
    }
    setInit(roll) {
        this.init = Number(roll) + this.dex;
    }
    createPlayer() {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "init-player");
        newDiv.innerHTML = this.name;
        newDiv.style.backgroundColor = this.color;
        initPlayerStorage.append(newDiv);
    }
}

class Players {
    constructor() {
        this.playersArr = [];
    }
    clear() {
        this.playersArr = [];
        while (initPlayerStorage.firstChild) {
            initPlayerStorage.removeChild(initPlayerStorage.firstChild);
        }
        localStorage.removeItem("storedPlayers");
    }
    loadExistingPlayers(player) {
        let name = player.name;
        let dex = player.dex;
        let color = player.color;
        let init = player.init;
        let newPlayer = new Player(name, dex, color, init);
        this.playersArr.push(newPlayer);
        newPlayer.createPlayer();
    }
    renderPlayers(inputArr) {
        let stored = [...inputArr];
        this.clear();
        stored.forEach((player) => {
            this.playersArr.push(player);
            player.createPlayer();
        });
        localStorage.setItem("storedPlayers", JSON.stringify(stored));
    }
    sortPlayers() {
        let sorted = this.playersArr.sort((a, b) => b.init - a.init);
        this.renderPlayers(sorted);
    }
    showInitButtons() {
        initTitle.innerText = "Initiative";
        initTitle.style.backgroundColor = "#a34c50";
        startCombatButton.classList.remove("hidden");
        nextTurnButton.classList.add("hidden");
        addPlayerButton.classList.remove("disabled");
        clearPlayersButton.classList.remove("disabled");
        endCombatButton.classList.add("disabled");
    }
    hideInitButtons(current) {
        initNameHolder.innerHTML = current.name;
        initPlayerRollInput.value = "";
        startCombatButton.classList.add("hidden");
        nextTurnButton.classList.remove("hidden");
        addPlayerButton.classList.add("disabled");
        clearPlayersButton.classList.add("disabled");
        endCombatButton.classList.remove("disabled");
    }
    startCombat(index) {
        let current = this.playersArr[index];
        modal.style.display = "flex";
        playerRollInput.style.display = "flex";
        this.hideInitButtons(current);
        acceptInitRollButton.addEventListener("click", () => {
            let current = this.playersArr[index];
            index++;
            let roll = initPlayerRollInput.value;
            if (roll > 0) {
                current.setInit(roll);
                closeModal();
                if (this.playersArr[index]) {
                    setTimeout(this.startCombat(index), 1000);
                } else {
                    this.sortPlayers();
                    this.nextTurn();
                }
            }
        });
    }
    endCombat() {
        this.showInitButtons();
        let players = document.getElementsByClassName("init-player");
        players[0].classList.remove("hidden");
    }
    nextTurn() {
        this.renderPlayers(this.playersArr);
        let currentPlayer = this.playersArr[0];
        initTitle.style.backgroundColor = currentPlayer.color;
        initTitle.innerText = currentPlayer.name;
        let removed = this.playersArr.shift();
        this.playersArr.push(removed);
        let players = document.getElementsByClassName("init-player");
        players[0].classList.add("hidden");
    }
}

// Instantiation

const bag = new Bag();
const enemies = new Enemies();
const players = new Players();
let history = new rollHistory();

let addArray = [
    addD4Button,
    addD6Button,
    addD8Button,
    addD10Button,
    addD12Button,
    addD20Button,
];
let holderArray = [
    d4Holder,
    d6Holder,
    d8Holder,
    d10Holder,
    d12Holder,
    d20Holder,
];
let subArray = [
    subD4Button,
    subD6Button,
    subD8Button,
    subD10Button,
    subD12Button,
    subD202Button,
];

//=== Functions ===//

function closeModal() {
    enemyNameInput.value = "";
    enemyHealthInput.value = "";
    playerNameInput.value = "";
    playerDexInput.value = "";
    playerColorInput.value = "#C84141";
    modal.style.display = "none";
    addRemoveEnemyDiv.style.display = "none";
    initAddPlayerDiv.style.display = "none";
    playerRollInput.style.display = "none";
    initNameHolder.innerHTML = "";
    initPlayerRollInput.value = "";
}

//=== Event Listeners ===//

// Dice

addArray.forEach((button, i) => {
    let keyVals = { 0: 4, 1: 6, 2: 8, 3: 10, 4: 12, 5: 20 };
    let num = Object.values(keyVals)[i];
    button.addEventListener("click", () => {
        bag.addDice(num, holderArray[i]);
    });
});

subArray.forEach((button, i) => {
    let keyVals = { 0: 4, 1: 6, 2: 8, 3: 10, 4: 12, 5: 20 };
    let num = Object.values(keyVals)[i];
    button.addEventListener("click", () => {
        bag.removeDice(num, holderArray[i]);
    });
});

clearDiceButton.addEventListener("click", () => {
    bag.clear();
    holderArray.forEach((holder) => {
        holder.innerHTML = "";
    });
});

rollButton.addEventListener("click", () => {
    const roll = bag.rollAll();
    results.innerHTML = roll === 0 ? "" : roll;
});

rollHistoryClearButton.addEventListener("click", history.clear);

// Health Tracker

addEnemyButton.addEventListener("click", () => {
    modal.style.display = "flex";
    addRemoveEnemyDiv.style.display = "flex";
});

clearEnemiesButton.addEventListener("click", () => {
    enemies.clearEnemies();
});

acceptEnemyButton.addEventListener("click", () => {
    let name = enemyNameInput.value;
    let hp = parseInt(enemyHealthInput.value);
    let maxHp = hp;
    if (!name || !hp || hp < 1 || hp > 999) {
        closeModal();
        return;
    }
    enemies.addEnemy(name, maxHp, hp);
    closeModal();
});

acceptPlayerButton.addEventListener("click", () => {
    let name = playerNameInput.value;
    let dex = parseInt(playerDexInput.value) || 0;
    let color = playerColorInput.value;
    if (name && color) {
        let player = new Player(name, dex, color);
        players.playersArr.push(player);
        localStorage.setItem(
            "storedPlayers",
            JSON.stringify(players.playersArr)
        );
        player.createPlayer();
    }
    closeModal();
});

enemyTable.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("health-plus-btn") ||
        e.target.classList.contains("health-minus-btn")
    ) {
        let id = e.target.id.slice(e.target.id.indexOf("-") + 1);
        let enemy = enemies.enemyArray[id];
        let hp = Number(document.getElementById(`input-${id}`).value);
        let enemyHealthText = document
            .getElementById(`enemy-${id}`)
            .querySelector(".enemy-health");
        if (e.target.classList.contains("health-plus-btn")) {
            enemy.addHealth(hp);
        } else {
            enemy.subHealth(hp);
        }
        enemyHealthText.innerHTML = enemy.returnHealth();
        document.getElementById(`input-${id}`).value = "";
    }
});

// Initiative Tracker

initButtons.addEventListener("click", (e) => {
    if (e.target.closest(".disabled")) {
        e.stopPropagation();
    } else if (e.target.id === "add-player") {
        modal.style.display = "flex";
        initAddPlayerDiv.style.display = "flex";
        initAddPlayerDiv.style.height = "100%";
    } else if (e.target.id === "clear-players") {
        players.clear();
    } else if (e.target.id === "start-combat") {
        if (players.playersArr.length > 1) {
            players.startCombat(0);
        }
    } else if (e.target.id === "end-combat") {
        players.endCombat();
    } else if (e.target.id === "next-turn") {
        players.nextTurn();
    }
});

// Modals

closeModalButton.addEventListener("click", closeModal);

window.onclick = function (e) {
    if (e.target == modal) {
        closeModal();
    }
};

//=== localStorage ===//

// Roll History

if (!localStorage.getItem("storedRollHist")) {
    localStorage.setItem("storedRollHist", []);
    history.rollArr = [];
} else {
    let arr = JSON.parse(localStorage.getItem("storedRollHist"));
    history.rollArr = arr;
    if (arr.length > 0) {
        arr.forEach((number) => {
            let newTd = document.createElement("td");
            newTd.setAttribute("class", "history-td");
            newTd.innerHTML = number;
            rollTable.append(newTd);
        });
    }
}

// Enemy Health Tracker

if (!localStorage.getItem("storedEnemies")) {
    localStorage.setItem("storedEnemies", []);
    enemies.enemyArray = [];
} else {
    let arr = JSON.parse(localStorage.getItem("storedEnemies"));
    console.log(arr);
    if (arr.length > 0) {
        arr.forEach((enemy) => {
            enemies.loadExistingEnemy(enemy);
        });
    }
}

// Initiative Tracker

if (!localStorage.getItem("storedPlayers")) {
    localStorage.setItem("storedPlayers", []);
    players.playersArr = [];
} else {
    let arr = JSON.parse(localStorage.getItem("storedPlayers"));
    console.log(arr);
    if (arr.length > 0) {
        arr.forEach((player) => {
            players.loadExistingPlayers(player);
        });
    }
}
