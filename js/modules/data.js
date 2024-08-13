function saveGame(player) {
    const saveData = {
        currencies: player.currencies.map(currency => ({
            name: currency.name,
            value: currency.value.toString(),
            gain: currency.gain ? currency.gain.toString() : undefined,
            multipliers: currency.multipliers.map(m => m.toString()),
            total: currency.total.toString()
        })),
        rank: player.rank.toString(),
        tier: player.tier.toString(),
        tetr: player.tetr.toString(),
        achievements: player.achievements,
        infinity: {
            times: player.infinity.times.toString(),
            points: player.infinity.points.toString(),
            point_multi: player.infinity.point_multi.map(m => m.toString()),
            point_total: player.infinity.point_total.toString(),
            limit: player.infinity.limit.toString(),
            limit_level: player.infinity.limit_level.toString(),
            upgrades: player.infinity.upgrades
        },
        
        options: {
            notation: player.options.notation,
            max_range: player.options.max_range,
            confirmations: player.options.confirmations
        },
        challenges: {
            completed: player.challenges.completed,
            current: player.challenges.current
        }
    };
    
    localStorage.setItem('playerData', JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem('playerData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        const player = {
            currencies: parsedData.currencies.map(currency => ({
                name: currency.name,
                value: E(currency.value),
                gain: currency.gain ? E(currency.gain) : undefined,
                multipliers: currency.multipliers.map(m => E(m)),
                total: E(currency.total)
            })),
            rank: E(parsedData.rank),
            tier: E(parsedData.tier),
            tetr: E(parsedData.tetr),
            achievements: parsedData.achievements,
            infinity: {
                times: E(parsedData.infinity.times),
                points: E(parsedData.infinity.points),
                point_multi: parsedData.infinity.point_multi.map(m => E(m)),
                point_total: E(parsedData.infinity.point_total),
                limit: E(parsedData.infinity.limit),
                limit_level: E(parsedData.infinity.limit_level),
                upgrades: parsedData.infinity.upgrades
            },
        
            options: {
                notation: parsedData.options.notation,
                max_range: parsedData.options.max_range,
                confirmations: parsedData.options.confirmations
            },
            challenges: {
                completed: parsedData.challenges.completed,
                current: parsedData.challenges.current
            }
        };
        
        return addMissingDefaults(player);
    }
    
    // If no saved data, return the default player object
    return getDefaultPlayer();
}

function addMissingDefaults(currentPlayer) {
    const defaultPlayer = getDefaultPlayer();
    
    // Recursive function to add missing properties
    function addMissingProps(current, defaultObj) {
        if (typeof current !== 'object' || current === null || Array.isArray(current)) {
            return defaultObj;
        }

        for (const key in defaultObj) {
            if (!(key in current)) {
                current[key] = defaultObj[key];
            } else if (typeof defaultObj[key] === 'object' && !Array.isArray(defaultObj[key])) {
                current[key] = addMissingProps(current[key], defaultObj[key]);
            }
        }

        return current;
    }
    
    return addMissingProps(currentPlayer, defaultPlayer);
}



function getDefaultPlayer() {
    return {
        currencies: [
            {
                name: "cash",
                value: E(0),
                gain: E(1),
                multipliers: [E(1), E(1)],
                total: E(1)
            },
            {
                name: "multiplier",
                value: E(0),
                gain: E(1),
                multipliers: [E(1)],
                total: E(1)
            },
            {
                name: "rebirth",
                value: E(0),
                gain: E(1),
                multipliers: [E(1)],
                total: E(1)
            },
            {
                name: "ultrarebirth",
                value: E(0),
                gain: E(1),
                multipliers: [E(1)],
                total: E(1)
            },
            {
                name: "prestige",
                value: E(0),
                gain: E(1),
                multipliers: [E(1)],
                total: E(1)
            },
        ],
        rank: E(0),
        tier: E(0),
        tetr: E(0),
        achievements: [],
        infinity: {
            times: E(0),
            points: E(0),
            point_multi: [E(1)],
            point_total: E(0),
            limit: E('e9e15'),
            limit_level: E(0),
            upgrades: []
        },
     
        options: {
            notation: "sc",
            max_range: 6,
            confirmations: {
                rank: true,
                tier: true,
                infinity: true,
                ticker: true
            }
        },
        challenges: {
            completed: [E(0)],
            current: -1
        }
    };
}
function wipeSave() {
    if (confirm("DO YOU WANT TO REALLY PUT YOUR SAVE TO SLEEP FOREVER!?")) {
        if (confirm("wait actually!?")) {
    localStorage.removeItem('playerData');
    player = loadGame(); // Reset to default player object
    console.log('Save data wiped. Game reset to default state.');
    }
}
}

function exportSave() {
    const saveData = localStorage.getItem('playerData');
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
        
        // Add missing default values
        const defaultPlayer = getDefaultPlayer();
        parsedSaveData = addMissingDefaults(parsedSaveData);
        
        // Save the updated data
        localStorage.setItem('playerData', JSON.stringify(parsedSaveData));
        
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
const FPS = 25;
let buttons = [[], [], [], []];

let basegains = [E(2.5), E(3), E(10), E(250)];
let basecosts =[E(10), E(1000), E(1e6), E(1e12)];
function buyCurrency(i, a, c) {
    if (player.currencies[i - 1].value.gte(c)) {
        player.currencies[i].value = player.currencies[i].value.add(a.mul(player.currencies[i].total));
        if (i-1 == 0) {
        player.currencies[i-1].value = player.currencies[i-1].value.sub(c);
        } else {
            player.currencies[i-1].value = E(0)
        }
    }
}
function getTotalMultiplier(i) {
    let t = E(1)
for (let j = 0; j < player.currencies[i].multipliers.length; j++) {
t = t.mul(player.currencies[i].multipliers[j])
}

if (i == 0 && inChallenge(0)) {
    t = t.pow(0.5)
}
player.currencies[i].total = t
if (t.gte('e1000')) {
    player.currencies[i].total = softcap(t)
}
if (softcap(t).gte(player.infinity.limit)) {
    player.currencies[i].total = player.infinity.limit
}

return t;
}
setInterval(function() {
saveGame(player)
    getTotalMultiplier(0)
    getTotalMultiplier(1)
    getTotalMultiplier(2)
    getTotalMultiplier(3)
    getTotalMultiplier(4)
 
    player.currencies[0].multipliers[0] = player.currencies[1].value.add(1)
    player.currencies[0].multipliers[1] = E(1)
    player.currencies[1].multipliers[0] = player.currencies[2].value.mul(3).add(1)
    player.currencies[2].multipliers[0] = player.currencies[3].value.mul(27).add(1)
    player.currencies[3].multipliers[0] = player.currencies[4].value.pow(1.5).add(1)
    
    for (let i = 0; i < player.currencies.length; i++) {
        if (i == 0) {
        player.currencies[i].gain = player.currencies[i].total
        } else {
            if (!player.challenges.current == -1) {
                player.currencies[i].gain = basegains[i - 1].pow(1).mul( player.currencies[i].total)
            } else {
                player.currencies[i].gain = basegains[i - 1].pow(15).mul( player.currencies[i].total)
            }
            
        }
    }


if (player.tier.gte(3)) {
player.currencies[1].value = player.currencies[1].value.add(player.currencies[1].gain.div(FPS))
}
player.currencies[0].value = player.currencies[0].value.add(player.currencies[0].gain.div(FPS))

if (player.tier.gte(5)) {
    player.currencies[2].value = player.currencies[2].value.add(player.currencies[2].gain.div(FPS))
}
if (player.tetr.gte(1)) {
    player.currencies[3].value = player.currencies[3].value.add(player.currencies[3].gain.div(FPS))
}
if (player.tetr.gte(2)) {
    player.currencies[4].value = player.currencies[4].value.add(player.currencies[4].gain.div(FPS))
}
if (hasInfinityUpgrade(4)) {
    player.currencies[0].multipliers[2] = E(player.currencies[0].value.pow(player.currencies[0].value.add(1).log10().log10().add(1).div(2)))
} else {
    player.currencies[0].multipliers[2] = E(1)
}

   

if (player.infinity.times.gte(1)) {
    player.currencies[0].multipliers[3] = E(100000)
} else {
   player.currencies[0].multipliers[3] = E(1) 
}



if (player.rank.gte(5)) {
    if (player.tier.gte(2)) {
        let t2effect = E(1).add(player.tier.mul(0.25))
        basegains = [E(2.5).mul(player.rank).pow(t2effect), E(3).mul(player.rank).pow(t2effect), E(10).mul(player.rank).pow(t2effect), E(250).mul(player.rank).pow(t2effect)];
    } else {
    basegains = [E(2.5).mul(player.rank), E(3).mul(player.rank), E(10).mul(player.rank), E(250).mul(player.rank)];
    }
} else {
    basegains = [E(2.5), E(3), E(10), E(250)];
}
if (E(player.challenges.completed[1]).gte(1)) {
    player.currencies[4].multipliers[0] = player.currencies[4].value.pow(challenges[1].rewardeffect(player.challenges.completed[1]).sub(1)).add(1)
} else {
    player.currencies[4].multipliers[0] = E(1)
}
if (player.rank.gte(7)) {
    if (E(player.challenges.completed[0]).lt(1)) {
        player.currencies[0].multipliers[2] = player.currencies[3].value.pow(0.5).add(1)
    } else {
        player.currencies[0].multipliers[2] = player.currencies[3].value.pow(1.25).add(1)
    }
    
}
if (player.rank.gte(13)) {
    player.currencies[3].multipliers[1] = E(25) 
} else {
    player.currencies[3].multipliers[1] = E(1) 
}
if (player.tier.gte(1)) {
    player.currencies[0].multipliers[1] = player.currencies[0].value.pow(E(0.05).mul(player.tier)).add(10)
}
if (player.tier.gte(3)) {
    player.currencies[1].multipliers[1] = player.currencies[1].value.pow(E(0.05).mul(player.tier)).add(10)
}
if (player.tier.gte(5)) {
    player.currencies[2].multipliers[1] = player.currencies[2].value.pow(E(0.05).mul(player.tier)).add(10)
}
if (player.tetr.gte(1)) {
    player.currencies[3].multipliers[1] = player.currencies[2].value.pow(E(0.05).mul(player.tier)).add(10)
    player.currencies[0].multipliers[5] = E(1000)
}
if (player.challenges.current == -1) {
    player.currencies[0].multipliers[4] = player.currencies[0].value.pow(challenges[0].rewardeffect(player.challenges.completed[0]).sub(1))  
} else {
    player.currencies[0].multipliers[4] = E(1)  
}

}, 1000/FPS)
function reset() {
    [...player.currencies].reverse().forEach(currency => {
        currency.value = E(0);
        currency.gain = currency.gain ? E(0) : undefined;
        currency.total = E(1);
        currency.multipliers = currency.multipliers.map(() => E(1));
    });
}

function softcap(gain) {
        let g = E(gain)
        if (player.tetr.gte(2)) {
            if (g.gte('e1000')) {
                let log = g.log10();
                let soft = log.sub(1000).pow(E(0.9175))
    
                return E(1000).add(soft).pow10()
     } else {
        return g
    }
        } 
        if (player.tetr.gte(1)) {
            if (g.gte('e1000')) {
                let log = g.log10();
                let soft = log.sub(1000).pow(E(0.91))
    
                return E(1000).add(soft).pow10()
     } else {
        return g
    }
     
        } else {
            if (g.gte('e1000')) {
                let log = g.log10();
                let soft = log.sub(1000).pow(E(0.9))
    
                return E(1000).add(soft).pow10()
        } else {
            return g
        }
    }

         
 } 
