function pre_m_buymax(ind) {
    const cost = dilators[ind].cost;

    if (player.years >= cost) {
        const scaling = 2;

        /*
        All of this is derived from the geometric sequence sum formula. I have no idea how to even begin going
        about doing the same for a dynamic scaling (e.g. cost *= 2 ** bought),
        hell I don't even know how to write up what any given term of such a sequence is, though I probably could
        if I tried.
        */

        const max_purchases = Math.floor(Math.log((player.years / cost) * (scaling - 1) + 1) / Math.log(scaling));

        const total_cost = cost * ((scaling ** max_purchases - 1) / (scaling - 1));

        player.years -= total_cost;

        dilators[ind].cost *= scaling ** max_purchases;
        dilators[ind].bought += max_purchases;
        dilators[ind].amount += max_purchases;

        updateBuyButtons();
    };
}

function pre_m_maxall() {
    for (let i = 0; i < dilators.length; i++) {
        pre_m_buymax(i);
    };
}

document.addEventListener("keydown", function(key) {
    if (key.key === "m") {
        pre_m_maxall();
    };
});

function pre_m_compressall() {
    for (let i = 0; i < dilators.length; i++) {
        compressDil(i);
    };
}

document.addEventListener("keydown", function(key) {
    if (key.key === "c") {
        pre_m_compressall();
    };
});