function pickBG() {
    let pick = Math.floor(Math.random() * 8) + 1;
    console.log(pick);
    return "BG-" + pick + ".jpg";
}

window.onload = function () {
    let BG = pickBG();
    document.body.style.backgroundImage = `url(/images/${BG})`;
};
