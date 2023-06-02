// Modals
const addEnemyModal = document.getElementById("enemyModal");

// Text boxes / inputs
const results = document.getElementById("result-text");
const enemyNameInput = document.getElementById("enemyNameInput");
const enemyHealthInput = document.getElementById("enemyHealthInput");

// Tables
const rollTable = document.getElementById("history-table-row");
const enemyTable = document.getElementById("enemy-table");

// Audio
const rollSound = new Audio("/audio/roll.wav");

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
const clearEnemiesButton = document.getElementById("clear-enemies");
const acceptEnemyButton = document.getElementById("acceptEnemy");

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
    addItem(data) {
        let newTd = document.createElement("td");
        newTd.setAttribute("class", "history-td");
        newTd.innerHTML = data;
        rollTable.prepend(newTd);
    }
    clear() {
        while (rollTable.firstChild) {
            rollTable.removeChild(rollTable.firstChild);
        }
    }
}

class Enemy {
    constructor(name, hp, id) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.id = id;
    }
    subHealth(dmg = 5) {
        this.hp -= dmg;
        if (hp <= 0) {
            console.log(`${this.name} has been slain!`);
        }
    }
    addHealth(heal = 5) {
        this.hp += heal;
    }
    returnHealth() {
        return `${this.hp}/${this.maxHp}`;
    }
}

class Enemies {
    constructor() {
        this.enemyArray = [];
    }
    addEnemy(name, hp) {
        let id = enemies.generateId();
        let newEnemy = new Enemy(name, hp, id);
        this.enemyArray.push(newEnemy);
        let newTr = document.createElement("tr");
        let nameTd = document.createElement("td");
        let healthTd = document.createElement("td");
        let healDamageFieldTd = document.createElement("td");
        let buttonsTd = document.createElement("td");
        newTr.setAttribute("class", "enemy-info-row");
        nameTd.setAttribute("class", "enemy-name");
        healthTd.setAttribute("class", "enemy-health");
        healDamageFieldTd.setAttribute("class", "healDamageInput");
        buttonsTd.setAttribute("class", "enemy-buttons");
        nameTd.innerHTML = newEnemy.name;
        healthTd.innerHTML = newEnemy.returnHealth();
        healDamageFieldTd.innerHTML = `<input type="number" id="input-${newEnemy.id}" class="healDamageInputBox">`;
        buttonsTd.innerHTML = `<button class="health-plus-btn green-btn" id="heal-${newEnemy.id}">+</button><button class="health-minus-btn red-btn" id="damage-${newEnemy.id}">-</button>`;
        newTr.append(nameTd, healthTd, healDamageFieldTd, buttonsTd);
        enemyTable.append(newTr);
    }
    clearEnemies() {
        this.enemyArray = [];
        while (enemyTable.firstChild) {
            enemyTable.removeChild(enemyTable.firstChild);
        }
    }
    generateId() {
        let id = 0;
        if (this.enemyArray.length > 0) {
            id = this.enemyArray[this.enemyArray.length - 1].id + 1;
        }
        return Number(id);
    }
}

// Instantiation

const bag = new Bag();
const history = new rollHistory();
const enemies = new Enemies();

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
let healButtons = [];
let damageButtons = [];

// Functions

function closeModal() {
    enemyNameInput.value = "";
    enemyHealthInput.value = "";
    addEnemyModal.style.display = "none";
}

// Event Listeners

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

addEnemyButton.addEventListener("click", () => {
    addEnemyModal.style.display = "flex";
});

clearEnemiesButton.addEventListener("click", () => {
    enemies.clearEnemies();
});

addArray.forEach((button, i) => {
    let num =
        i === 0
            ? 4
            : i === 1
            ? 6
            : i === 2
            ? 8
            : i === 3
            ? 10
            : i === 4
            ? 12
            : 20;
    button.addEventListener("click", () => {
        bag.addDice(num, holderArray[i]);
    });
});

subArray.forEach((button, i) => {
    let num =
        i === 0
            ? 4
            : i === 1
            ? 6
            : i === 2
            ? 8
            : i === 3
            ? 10
            : i === 4
            ? 12
            : 20;
    button.addEventListener("click", () => {
        bag.removeDice(num, holderArray[i]);
    });
});

acceptEnemyButton.addEventListener("click", () => {
    let name = enemyNameInput.value;
    let hp = parseInt(enemyHealthInput.value);
    if (!name || !hp || name.length > 15 || hp < 1 || hp > 999) {
        closeModal();
        return;
    }
    enemies.addEnemy(name, hp);
    closeModal();
});

closeModalButton.addEventListener("click", closeModal);

window.onclick = function (event) {
    if (event.target == addEnemyModal) {
        closeModal();
    }
};
