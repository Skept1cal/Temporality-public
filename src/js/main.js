let last = Date.now();
let diff = 1/60;
let is_first_iteration = true;

function updatePre_m(diff) {
    updateYears(diff);
    updateDils(diff);
}

function loop() {
    let now = Date.now();
    diff = (Date.now() - last) / 1000;

    updatePre_m(diff);
    updateHTML();

    last = now;
}

loadSave();

setInterval(loop, 16.67);

setInterval(saveGame, 60000);