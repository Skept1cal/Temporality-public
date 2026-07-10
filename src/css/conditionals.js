function isAffordable(ind) {
    const buy1 = document.getElementById(`dil${ind + 1}-buy`);
    const buymax = document.getElementById(`dil${ind + 1}-buymax`);

    const isDisabled = dilators[ind].cost > player.years || isInfinite(player.years);

    buy1.classList.toggle("disabled", isDisabled);
    buy1.classList.toggle("enabledGreen", !isDisabled);

    buymax.classList.toggle("disabled", isDisabled);
    buymax.classList.toggle("enabledGreen", !isDisabled);
}


function isCompressable(ind) {
    const compress_button = document.getElementById(`dil${ind + 1}-compress-button`);

    const isDisabled = dilators[ind].amount < dilators[ind].compressThreshold || isInfinite(player.years);

    compress_button.classList.toggle("disabled", isDisabled);
    compress_button.classList.toggle("enabledGreen", !isDisabled);
}


function isMaxable() {
    const max_all_button = document.getElementById("max-all-btn");
    const compress_all_button = document.getElementById("compress-all-btn");

    let isMaxable = dilators.some(dil => dil.cost <= player.years && !isInfinite(player.years));

    max_all_button.classList.toggle("disabled", !isMaxable);
    max_all_button.classList.toggle("enabledGreen", isMaxable);

    let can_any_be_compressed = dilators.some(dil => dil.amount >= dil.compressThreshold && !isInfinite(player.years));

    compress_all_button.classList.toggle("disabled", !can_any_be_compressed);
    compress_all_button.classList.toggle("enabledGreen", can_any_be_compressed);
}