var E = x => new Decimal(x);
const storageKey = 'NBSplayerdata_TEST'; // You can change this name as needed

function saveGame(player) {
    const saveData = {
        currencies: player.currencies.map(currency => ({
            value: currency.value.toString(),
            total: currency.total.toString(),
        })),
        rank: player.rank.toString(),
        tier: player.tier.toString(),
        ascension: player.ascension.toString(),
        ascension_power: player.ascension_power.toString(),
        infinity: {
            times: player.infinity.times.toString(),
            points: player.infinity.points.toString(),
            total_points: player.infinity.total_points.toString(),
        },
        eternity: {
            times: player.infinity.times.toString(),
            points: player.infinity.points.toString(),
            total_points: player.infinity.total_points.toString(),
        },
    };
    
    localStorage.setItem(storageKey, JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem(storageKey);
    const defaultPlayer = getDefaultPlayer();

    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Merge the saved data with the default player data
        const player = mergePlayerData(defaultPlayer, parsedData);

        player.currencies = player.currencies.map(currency => ({
            ...currency,
            value: E(currency.value),
            total: E(currency.total),
        }));
        player.rank = E(player.rank);

        player.tier = E(player.tier);

        player.ascension = E(player.ascension),
        player.ascension_power = E(player.ascension_power),

        player.infinity.times = E(player.infinity.times);
        player.infinity.points = E(player.infinity.points);
        player.infinity.total_points = E(player.infinity.total_points);

        player.eternity.times = E(player.eternity.times);
        player.eternity.points = E(player.eternity.points);
        player.eternity.total_points = E(player.eternity.total_points);

        return player;
    }
    
    // If no saved data, return the default player object
    return defaultPlayer;
}
function mergePlayerData(defaultPlayer, savedData) {
    function mergeObjects(target, source) {
        for (const key in source) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                if (!target[key] || typeof target[key] !== 'object') {
                    target[key] = Array.isArray(source[key]) ? [] : {};
                }
                mergeObjects(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    // Start merging from the default player
    return mergeObjects(defaultPlayer, savedData);
}
function getDefaultPlayer() {
    return {
        currencies: [
            {
                value: E(0),
                total: E(0)
            },
            {
                value: E(0),
                total: E(0)
            },
            {
                value: E(0),
                total: E(0)
            },
            {
                value: E(0),
                total: E(0)
            },
            {
                value: E(0),
                total: E(0)
            },
            {
                value: E(0),
                total: E(0)
            },
        ],
        rank: E(0),
        tier: E(0),
        ascension: E(0),
        ascension_power: E(0),
        infinity: {
         points: E(0),
         total_points: E(0),

         times: E(0)
        },

        eternity: {
        points: E(0),
         total_points: E(0),

         times: E(0)
        },
        
        language: "EN"
    };
}

function wipeSave() {
    if (confirm("DO YOU WANT TO REALLY PUT YOUR SAVE TO SLEEP FOREVER!?")) {
        if (confirm("wait actually!?")) {
            localStorage.removeItem(storageKey);
            player = loadGame(); // Reset to default player object
            console.log('Save data wiped. Game reset to default state.');
        }
    }
}

function exportSave() {
    const saveData = localStorage.getItem(storageKey);
    if (saveData) {
        const encodedSaveData = btoa(saveData); // Encode the save data to base64
        navigator.clipboard.writeText(encodedSaveData)
            .then(() => {
                console.log('Save data exported to clipboard successfully.');
                alert('Save data has been copied to your clipboard.');
            })
            .catch(err => {
                console.error('Failed to copy save data to clipboard:', err);
                alert('Failed to copy save data to clipboard. See console for details.');
            });
    } else {
        console.log('No save data found to export.');
        alert('No save data found to export.');
    }
}

function importSave() {
    const encodedSaveData = prompt("Please enter your save data:");
    if (!encodedSaveData) {
        console.log('Import cancelled.');
        return;
    }
    
    try {
        const decodedSaveData = atob(encodedSaveData); // Decode the base64 save data
        let parsedSaveData = JSON.parse(decodedSaveData);
        
        // Validate the save data structure
        if (!parsedSaveData.currencies || !Array.isArray(parsedSaveData.currencies)) {
            throw new Error('Invalid save data structure');
        }
        
        // Merge the imported data with the default player data
        const defaultPlayer = getDefaultPlayer();
        parsedSaveData = mergePlayerData(defaultPlayer, parsedSaveData);
        
        // Save the updated data
        localStorage.setItem(storageKey, JSON.stringify(parsedSaveData));
        
        player = loadGame(); // Reload the game with the new save data
        console.log('Save data imported successfully.');
        alert('Save data imported successfully. The game will now reload.');
        location.reload(); // Reload the page to apply the imported save
    } catch (error) {
        console.error('Failed to import save data:', error);
        alert('Failed to import save data. Please ensure you\'ve entered the correct save string.');
    }
}

let player = loadGame();

setInterval(function() {
    saveGame(player)
}, 100)
