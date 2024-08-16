const SAVE_ID = "nbs_save"
let player = ""

function getPlayerData() {
    let s = {
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
            completed: [E(0), E(0)],
            current: -1
        }
    }
    return s
}

function wipe() {
    player = getPlayerData()
}

function save(p) {
    let data = JSON.stringify(p)
    localStorage.setItem(SAVE_ID, data)
}

setInterval(function() {
    save(player)
}, 100)

function load() {
    let savedData = localStorage.getItem(SAVE_ID)
    if (savedData) {
        let loadedPlayer = JSON.parse(savedData)
        let defaultPlayer = getPlayerData()
        
        // Merge loaded data with default data
        player = mergeDeep(defaultPlayer, loadedPlayer)
        
        // Convert numeric strings to E objects
        convertToE(player)
    } else {
        player = getPlayerData()
    }
}

function mergeDeep(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj)
    
    if (!isObject(target) || !isObject(source)) {
        return source
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key]
        const sourceValue = source[key]

        if (Array.isArray(sourceValue)) {
            target[key] = sourceValue
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
        } else {
            target[key] = sourceValue
        }
    })

    return target
}

function convertToE(obj) {
    if (typeof obj === 'string' && !isNaN(obj)) {
        return E(obj);
    }
    
    if (Array.isArray(obj)) {
        return obj.map(convertToE);
    }
    
    if (typeof obj === 'object' && obj !== null) {
        const convertedObj = {};
        for (const [key, value] of Object.entries(obj)) {
            convertedObj[key] = convertToE(value);
        }
        return convertedObj;
    }
    
    return obj;
}
function exportSave() {
    const saveData = JSON.stringify(player)
    const encodedSaveData = btoa(saveData)
    prompt("Here's your save data. Copy it to a safe place:", encodedSaveData)
}

function importSave() {
    const encodedSaveData = prompt("Paste your save data here:")
    if (encodedSaveData) {
        try {
            const saveData = atob(encodedSaveData)
            const loadedPlayer = JSON.parse(saveData)
            const defaultPlayer = getPlayerData()
            
            // Merge loaded data with default data, prioritizing loaded data
            player = mergeDeep(defaultPlayer, loadedPlayer)
            
            // Convert numeric strings to E objects, including currencies
            player = convertToE(player)
            
            save(player)
            alert("Save data imported successfully!")
        } catch (error) {
            console.error("Error importing save:", error)
            alert("Error importing save. Please check your save data and try again.")
        }
    }
}

// Initialize player
load()
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
