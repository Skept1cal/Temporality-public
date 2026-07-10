let last = performance.now();
let is_first_iteration_after_inf = true;

function updatePre_m(diff) {
    updateYears(diff);
    updateDils(diff);
}

function loop() {
    const now = performance.now();
    const diff = (now - last) / 1000;

    updatePre_m(diff);
    updateHTML();

    if (isInfinite(player.years) && is_first_iteration_after_inf) {
        is_first_iteration_after_inf = false;

        updateBuyButtons();
    };

    last = now;
}

window.addEventListener("load", () => {
    if (!localStorage.getItem("temporality_save_file")) {
        saveGame();
    };

    try {
        loadSave();

        updatePre_m((player.lastSavedTime !== 0) ? (Date.now() - player.lastSavedTime) / 1000 : 0);
        updateHTML();

        if (isInfinite(player.years) && is_first_iteration_after_inf) {
            is_first_iteration_after_inf = false;

            updateBuyButtons();
        };

    } catch (err) {
        console.log(`DEBUG: Failed to load save file. Error: ${err}\n\n Savefile: ${localStorage.getItem("temporality_save_file")}`);
    };
});

setInterval(loop, 16.67);

setInterval(save_btn_pressed, 60000);