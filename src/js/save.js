function saveGame() {
    player.lastSavedTime = Date.now();
    
    const data = {
        years: player.years === Infinity ? Number.MAX_VALUE : player.years,
        dilation: player.dilation,

        dilators: structuredClone(dilators),
        lastSavedTime: player.lastSavedTime
    };

    const encoded = btoa(JSON.stringify(data));

    localStorage.setItem("temporality_save_file", encoded);
}



function tob64() {
    const data = {
        years: player.years === Infinity ? Number.MAX_VALUE : player.years,
        dilation: player.dilation,

        dilators: structuredClone(dilators),
        lastSavedTime: player.lastSavedTime
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

            player.lastSavedTime = decoded.lastSavedTime ?? 0;
        };

    } else {
        const decoded = JSON.parse(atob(data));

        if (decoded !== null) {
            player.years = Number(decoded.years);
            player.dilation = Number(decoded.dilation);

            for (let i = 0; i < dilators.length; i++) {
                dilators[i] = structuredClone(decoded.dilators[i]);
            };

            player.lastSavedTime = decoded.lastSavedTime ?? 0;
        };
    };

    updateBuyButtons();
}



function save_btn_pressed() {
    saveGame();

    const button = document.getElementById("save-btn");

    button.innerHTML = `<h2>Saved!</h2>`;
    button.onclick = null;
    
    setTimeout(() => {
        button.innerHTML = `<h2>Save</h2>`;
        button.onclick = save_btn_pressed;
    }, 2000);
}



function clearSave() {
    localStorage.setItem("temporality_save_file", null);

    player.years = 1;
    player.dilation = 0;

    dilators = JSON.parse(JSON.stringify(BASE_DILATORS));

    are_years_infinite = 1;

    updateBuyButtons();
}



function clearSave_btn_pressed() {
    const button = document.getElementById("clear-save-btn");

    button.onclick = null;
    button.innerHTML = `<h2>Are you sure?</h2>`;
    button.classList.toggle("disabled", true);
    button.classList.toggle("enabledGray", false);
    
    let confirmed = false;

    setTimeout(() => {
        button.onclick = () => {
            clearSave();
            button.innerHTML = `<h2>Cleared.</h2>`;
            button.onclick = null
            confirmed = true;
            
            setTimeout(() => {
                document.getElementById("clear-save-btn").innerHTML = `<h2>Clear save</h2>`;
                button.onclick = clearSave_btn_pressed;
            }, 2000);
        };
        button.classList.toggle("disabled", false);
        button.classList.toggle("enabledGray", true);
    }, 2000);
    
    setTimeout(() => {
        if (!confirmed) {
            button.onclick = clearSave_btn_pressed;
            button.innerHTML = `<h2>Clear save</h2>`;
        };
    }, 5000);
}



async function copySave() {
    const button = document.getElementById("copy-save-btn");

    button.onclick = null;

    try {
        await navigator.clipboard.writeText(tob64());

        button.innerHTML = `<h2>Copied!</h2>`;

        setTimeout(() => {
            button.innerHTML = `<h2>Copy save</h2>`;
            button.onclick = copySave;
        }, 2000);
    } catch (error) {
        console.log(`DEBUG: Failed to copy save string to clipboard. Error: ${error}`);

        button.classList.toggle("disabled", true);
        button.classList.toggle("enabledGray", false);

        button.innerHTML = `<h2>Copy failed.</h2>`;

        setTimeout(() => {
                button.classList.toggle("disabled", false);
                button.classList.toggle("enabledGray", true);
                button.innerHTML = `<h2>Copy save</h2>`;
                button.onclick = copySave;
        }, 2000);
    }
}



async function loadFromString() {
    const button = document.getElementById("load-save-btn");

    button.onclick = null;
    button.classList.toggle("disabled", true);
    button.classList.toggle("enabledGray", false);
    button.innerHTML = `<h2>Are you sure?</h2>`;

    let confirmed = false;

    setTimeout(() => {
        confirmed = true;
        button.onclick = async () => {
            try {
                button.onclick = null;

                const data = await navigator.clipboard.readText();

                loadSave(data);
                saveGame();

                button.innerHTML = `<h2>Loaded!</h2>`;

                setTimeout(() => {
                    button.innerHTML = `<h2>Load from clipboard</h2>`;
                    button.onclick = loadFromString;
                }, 2000);
            } catch (error) {
                console.log(`DEBUG: Failed to load save from copied string. Error: ${error}`);

                button.classList.toggle("disabled", true);
                button.classList.toggle("enabledGray", false);

                button.innerHTML = `<h2>Failed to load save.</h2>`;
                
                setTimeout(() => {
                    button.classList.toggle("disabled", false);
                    button.classList.toggle("enabledGray", true);
                    button.innerHTML = `<h2>Load from clipboard</h2>`;
                    button.onclick = loadFromString;
                }, 2000);
            }
        };
        button.classList.toggle("disabled", false);
        button.classList.toggle("enabledGray", true);
    }, 2000);

    setTimeout(() => {
        if (!confirmed) {
            button.onclick = loadFromString;
            button.innerHTML = `<h2>Load from clipboard</h2>`;
        };
    }, 5000);
}

window.addEventListener("beforeunload", saveGame);