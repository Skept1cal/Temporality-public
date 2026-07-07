const GAIN_REDUCTION = 10;

let years_are_infinite = 1;

function updateYears(diff) {

    if ([Infinity, null, NaN, undefined].includes(player.years)) {
        years_are_infinite = 0;
        return;
    };

    let increase = player.dilation * diff;
    
    player.years += (increase / GAIN_REDUCTION) * years_are_infinite;
}

function updateDils(diff) {
    for (let i = dilators.length - 1; i > 0; i--) {
        dilators[i - 1].amount += (((Math.floor(dilators[i].amount) * dilators[i].mult) * diff) / GAIN_REDUCTION) * years_are_infinite;
    };
    
    for (let i = 0; i < dilators.length; i++) {
        dilators[i].mult = dilators[i].lastCompressMult * (1 + Math.sqrt(dilators[i].amount)) * Math.floor(1 + dilators[i].bought ** 2 / 10);
    };
    
    player.dilation += (((dilators[0].amount * dilators[0].mult) * diff) / GAIN_REDUCTION) * years_are_infinite;
}

function buyDil_single(ind) {
    let dilator = dilators[ind];
    
    if (player.years - dilator.cost >= 0) {
        player.years -= dilator.cost;
        
        dilator.bought++;
        dilator.amount++;
        dilator.cost = BASE_DILATORS[ind].cost * 2 ** dilator.bought;
    };

    updateBuyButtons();
}

function compressDil(ind) {
    let dilator = dilators[ind];

    if (dilator.amount >= dilator.compressThreshold) {
        dilator.lastCompressMult *= dilator.mult ** 1/15;
        dilator.amount = 1;
        dilator.compressions++;

        dilator.compressThreshold = BASE_DILATORS[ind].compressThreshold ** (10 ** dilator.compressions);
    };
}