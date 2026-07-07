function saveGame() {
    const data = {
        years: player.years === Infinity ? Number.MAX_VALUE : player.years,
        dilation: player.dilation,

        dilators: structuredClone(dilators)
    };

    const encoded = btoa(JSON.stringify(data));

    localStorage.setItem("temporality_save_file", encoded);
}

function tob64() {
    const data = {
        years: player.years,
        dilation: player.dilation,

        dilators: structuredClone(dilators)
    };

    const encoded = btoa(JSON.stringify(data));

    return encoded;
}

function loadSave(data=null) {
    if (data === null) {
        const data_string = localStorage.getItem("temporality_save_file");
        const decoded = JSON.parse(atob(data_string));

        if (decoded !== null) {
            player.years = Number(decoded.years);
            player.dilation = Number(decoded.dilation);

            for (let i = 0; i < dilators.length; i++) {
                dilators[i] = structuredClone(decoded.dilators[i]);
            };
        };
    } else {
        const decoded = JSON.parse(atob(data));

        if (decoded !== null) {
            player.years = Number(decoded.years);
            player.dilation = Number(decoded.dilation);

            for (let i = 0; i < dilators.length; i++) {
                dilators[i] = structuredClone(decoded.dilators[i]);
            };
        };
    };

    updateBuyButtons();
}

function save_btn_pressed() {
    saveGame();

    document.getElementById("save-btn").innerHTML = `<h2>Saved!</h2>`;
    
    setTimeout(() => {document.getElementById("save-btn").innerHTML = `<h2>Save</h2>`}, 2000);
}

function clearSave() {
    localStorage.setItem("temporality_save_file", null);

    player.years = 1;
    player.dilation = 0;

    dilators = JSON.parse(JSON.stringify(BASE_DILATORS));

    updateBuyButtons();
}

function clearSave_btn_pressed() {
    let button = document.getElementById("clear-save-btn");

    button.innerHTML = `<h2>Confirm?</h2>`;
    button.classList.toggle("disabled", true);
    button.classList.toggle("enabled", false);
    button.onclick = null;
    
    let confirmed = false;

    setTimeout(() => {
        button.onclick = () => {
            clearSave();
            button.innerHTML = `<h2>Cleared.</h2>`;
            confirmed = true;
            
            setTimeout(() => {
                document.getElementById("clear-save-btn").innerHTML = `<h2>Clear save</h2>`;
                button.onclick = () => {clearSave_btn_pressed()};
            }, 2000);
        }
        button.classList.toggle("disabled", false);
        button.classList.toggle("enabled", true);
    }, 2000);
    
    setTimeout(() => {
        if (!confirmed) {
            button.onclick = () => {clearSave_btn_pressed()};
            button.innerHTML = `<h2>Clear save</h2>`;
        };
    }, 5000);
}

function copySave() {
    let button = document.getElementById("copy-save-btn");

    navigator.clipboard.writeText(tob64());

    button.innerHTML = `<h2>Copied!</h2>`;

    setTimeout(() => {button.innerHTML = `<h2>Copy save</h2>`}, 2000);
}

async function loadFromString() {
    const data = await navigator.clipboard.readText();
    const button = document.getElementById("load-save-btn");

    if (!button.classList.contains("disabled")) {
        try {
            loadSave(data);

            button.innerHTML = `<h2>Loaded!</h2>`;

            setTimeout(() => {button.innerHTML = `<h2>Load from clipboard</h2>`;}, 2000);
        } catch (error) {
            console.log(`Failed to load save from copied string. Error: ${error}`);

            button.classList.toggle("disabled", true);
            button.classList.toggle("enabled", false);

            button.innerHTML = `<h2>Invalid string.</h2>`;
            
            setTimeout(() => {
                button.classList.toggle("disabled", false);
                button.classList.toggle("enabled", true);
                button.innerHTML = `<h2>Load from clipboard</h2>`;
            }, 2000);
        };
    };
}