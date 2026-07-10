const resource_container = document.getElementById("resources-div");

function create_resourceDivs() {
    const years = document.createElement("div");

    years.innerHTML = `<p>You have: <span style="font-size: 2vw">${disp(player.years)}</span> years</p>`;
    years.className = "years-label";
    years.id = "years-label";

    const dilation = document.createElement("div");

    dilation.innerHTML = `<p><span style="font-size: 1.5vw">${disp(player.dilation)} γ</span> Dilation</p>`;
    dilation.className = "dilation-label";
    dilation.id = "dilation-label";

    resource_container.appendChild(years);
    resource_container.appendChild(dilation);
}

create_resourceDivs();



const singleBuy_container = document.getElementById("buy1-buttons-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Buy 1 (${disp(dilators[i - 1].bought)})</h2>`;
    div.className = "buy1-button hover";
    div.id = `dil${i}-buy`;
    div.onclick = function() {buyDil_single(i - 1);};

    singleBuy_container.appendChild(div);
}

const buymax_container = document.getElementById("buymax-buttons-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Buy max (${disp(dilators[i - 1].bought)})</h2>`;
    div.className = "buymax-button hover";
    div.id = `dil${i}-buymax`;
    div.onclick = () => {
        pre_m_buymax(i - 1);
    };

    buymax_container.appendChild(div);
}



const cost_container = document.getElementById("dilator-costs-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Cost: ${dilators[i - 1].cost} Years</h2>`
    div.className = "dilator-cost-label";
    div.id = `dil${i}-cost-label`;

    cost_container.appendChild(div);
}



const dilator_container = document.getElementById("dilators-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Dilator #${i}: × ${disp(dilators[i - 1].mult)}</h2>`;
    div.className = "dilator-label";
    div.id = `dil${i}-label`;

    dilator_container.appendChild(div);
}

const dilator_amount_container = document.getElementById("dilator-amounts-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Amount: ${disp(Math.floor(dilators[i - 1].amount))} (${disp(dilators[i - 1].compressThreshold)} to compress)</h2>`;
    div.className = "dilator-amount-label";
    div.id = `dil${i}-amount-label`;

    dilator_amount_container.appendChild(div);
}



const compression_container = document.getElementById("compress-buttons-div");

for (let i = 1; i <= dilators.length; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<h2>Compress (${disp(dilators[i - 1].compressions)})</h2>`;
    div.className = "compress-button hover";
    div.id = `dil${i}-compress-button`;
    div.onclick = () => {
        compressDil(i - 1);
    };

    compression_container.appendChild(div);
}