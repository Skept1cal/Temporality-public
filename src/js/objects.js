let player = {
    years: 1,
    dilation: 0,
};

let dilators = [];
let BASE_DILATORS = []; // This is here so the base properties of each dilator, such as cost, can be fetched after the game starts

// A dilator object follows the schematic: {bought, amount, mult, compressions, cost}
function createDilator(ind) {
    const dilator = {bought: 0, amount: 0, mult: 1, compressions: 0, cost: 10 ** (ind ** 2), lastCompressMult: 1, compressThreshold: 1e12 ** ind};
    dilators.push(dilator);
    BASE_DILATORS.push(structuredClone(dilator));
}

for (let i = 0; i < 10; i++) {
    createDilator(i);
}