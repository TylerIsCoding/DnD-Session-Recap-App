const results = document.getElementById('result-text');

// D4
const addD4Button = document.getElementById('add-d4');
const subD4Button = document.getElementById('sub-d4');
const d4Holder = document.getElementById('d4-holder');

// D6
const addD6Button = document.getElementById('add-d6');
const subD6Button = document.getElementById('sub-d6');
const d6Holder = document.getElementById('d6-holder');

// D8
const addD8Button = document.getElementById('add-d8');
const subD8Button = document.getElementById('sub-d8');
const d8Holder = document.getElementById('d8-holder');

// D10
const addD10Button = document.getElementById('add-d10');
const subD10Button = document.getElementById('sub-d10');
const d10Holder = document.getElementById('d10-holder');

// D12
const addD12Button = document.getElementById('add-d12');
const subD12Button = document.getElementById('sub-d12');
const d12Holder = document.getElementById('d12-holder');

// D20
const addD20Button = document.getElementById('add-d20');
const subD202Button = document.getElementById('sub-d20');
const d20Holder = document.getElementById('d20-holder');

const rollAll = document.getElementById('roll');

class Bag {
    constructor() {
        this.dice = []
    }
    rollAll() {
        let total = 0;
        this.dice.forEach(dice => {
            dice.roll()
            console.log(dice.value())
            total += dice.value()
        })
        return total;
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

function addDice(sides, holder) {
    const newDice = new Dice(sides);
    bag.dice.push(newDice)
    console.log(`New D${sides} added to bag.`)
    let count = 0;
    bag.dice.forEach(dice => {
        if (dice.numOfFaces === 4) count++
    })
    holder.innerHTML = count;
}

function removeDice(sides, holder) {
    for (let i = bag.dice.length - 1; i >= 0; i--) {
       if (bag.dice[i].numOfFaces === sides) {
        bag.dice.pop();
        break;
       }
    }
    holder.innerHTML = bag.dice.length === 0 ? '' : bag.dice.length;
}

let addArray = [addD4Button, addD6Button, addD8Button, addD10Button, addD12Button, addD20Button]
let subArray = [subD4Button, subD6Button, subD8Button, subD10Button, subD12Button, subD202Button]

rollAll.addEventListener('click', () => {
    const roll = bag.rollAll();
    results.innerHTML = roll === 0 ? '' : roll;
})

addArray.forEach(button => {
    button.addEventListener('click', () => {
    addDice(4, d4Holder)})
})

subArray.forEach(button => {
   button.addEventListener('click', () => {
    removeDice(4, d4Holder);
   }) 
})