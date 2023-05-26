const results = document.getElementById('result-text');

// D4
const addD4Button = document.getElementById('add-d4');
const subD4Button = document.getElementById('sub-d4');
const d4Holder = document.getElementById('d4-holder');

const rollAll = document.getElementById('roll');

addD4Button.addEventListener('click', addD4)
subD4Button.addEventListener('click', removeD4)
rollAll.addEventListener('click', rollDice)

class Bag {
    constructor() {
        this.dice = []
    }
    rollAll() {
        let total = 0;
        this.dice.forEach(dice => {
            dice.roll()
            total += dice.value()
        })
        console.log(total)
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

const bag = new Bag()

function addD4() {
    const newD4 = new Dice(4);
    bag.dice.push(newD4)
    console.log('D4 added to bag!')
    let count = 0;
    bag.dice.forEach(dice => {
        if (dice.numOfFaces === 4) count++
    })
    d4Holder.innerHTML = count;
}

function removeD4() {
    for (let i = bag.dice.length - 1; i >= 0; i--) {
       if (bag.dice[i].numOfFaces === 4) {
        bag.dice.pop();
        break;
       }
    }
    d4Holder.innerHTML = bag.dice.length === 0 ? '' : bag.dice.length;
}

function rollDice() {
    results.innerHTML = bag.rollAll();
}