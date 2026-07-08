let last = Date.now();
let is_first_iteration_after_inf = true;

function updatePre_m(diff) {
    updateYears(diff);
    updateDils(diff);
}

function loop() {
    const now = Date.now();
    const diff = (now - last) / 1000;

    updatePre_m(diff);
    updateHTML();

    if ([Infinity, null, NaN, undefined].includes(player.years) && is_first_iteration_after_inf) {
        is_first_iteration_after_inf = false;

        updateBuyButtons();
    }

    last = now;
}

try {
    loadSave();
} catch (err) {
    console.log(`DEBUG: Failed to load save file. Error: ${err}\n\nNOTE: This is normal if there is no available save file. Savefile: ${localStorage.getItem("temporality_save_file")}`);
} finally {
    saveGame();
}

setInterval(loop, 16.67);

setInterval(save_btn_pressed, 60000);