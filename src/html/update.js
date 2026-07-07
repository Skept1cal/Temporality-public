function updateHTML() {
    document.getElementById("years-label").innerHTML = `<p>You have: <span style="font-size: 2vw">${disp(player.years)}</span> years</p>`;
    document.getElementById("dilation-label").innerHTML = `<p><span style="font-size: 1.5vw">${disp(player.dilation)} γ</span> Dilation</p>`;

    for (let i = 1; i <= dilators.length; i++) { // Updates the amount labels
        document.getElementById(`dil${i}-amount-label`).innerHTML = `<h2>Amount: ${disp(Math.floor(dilators[i - 1].amount))} (${disp(dilators[i - 1].compressThreshold)} to compress)</h2>`;
    }

    for (let i = 1; i <= dilators.length; i++) { // Updates the dilator labels (basically the mult labels)
        document.getElementById(`dil${i}-label`).innerHTML = `<h2>Dilator #${i}: × ${disp(dilators[i - 1].mult)}</h2>`;
    }

    for (let i = 1; i <= dilators.length; i++) { // Updates the cost labels
        document.getElementById(`dil${i}-cost-label`).innerHTML = `<h2>Cost: ${disp(dilators[i - 1].cost)} Years</h2>`;
    }

    for (let i = 0; i < dilators.length; i++) { // Updates classes for purchase buttons
        isAffordable(i);
    }

    for (let i = 0; i < dilators.length; i++) { // Updates classes for compression buttons
        isCompressable(i);
    }

    for (let i = 0; i < dilators.length; i++) { // Updates classes for mass compression purchase
        isMaxable();
    }

    if (player.years >= Number.MAX_VALUE || [Infinity, null, NaN, undefined].includes(player.years)) {player.years = Infinity}; // Clamps years to infinity after passing ~1.797e308
}

function updateBuyButtons() {
    for (let i = 0; i < dilators.length; i++) {
        document.getElementById(`dil${i + 1}-buy`).innerHTML = `<h2>Buy 1 (${disp(dilators[i].bought)})</h2>`;
        document.getElementById(`dil${i + 1}-buymax`).innerHTML = `<h2>Buy max (${disp(dilators[i].bought)})</h2>`;
    };
}