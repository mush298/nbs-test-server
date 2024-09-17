function updateAscensionHTML() {
    el('ascension-count').innerHTML = lang_text('ascension-count', player.ascension)
    el('ascension-button').innerHTML = lang_text('ascension-upgrade', getAscensionCost(player.ascension))
    el('ascension-power').innerHTML = lang_text('ascension-power', player.ascension_power)

    for (let i = 0; i < ascension_effects.length; i++) {
        el(`ascensioneffect${i+1}`).innerHTML = lang_text(`ascension-effect${i+1}`, ascensionEffect(i))
    }
}

function getAscensionCost(x) {
    x = E(x)
    return x.add(1).scale(12, 50, 'P').mul(1e4).pow(E(1).add(x.div(10))).pow10()
}

function ascend() {
    if (player.currencies[0].value.gte(getAscensionCost(player.ascension))) {
        player.ascension = player.ascension.add(1)
        player.tier = E(0)
        player.rank = E(0)
        player.currencies[0].value = E(0)
        player.currencies[1].value = E(0)
        player.currencies[2].value = E(0)
        player.currencies[3].value = E(0)
    }
}

let ascension_effects = [
    {
        start: E(1),
        effect: x => {
            if (player.ascension.gte(10)) x = x.pow(3)
            if (player.ascension.gte(11)) x = x.pow(3.5)
        return x.log10().pow(0.25)
        }
    },{
        start: E(1),
        effect: x => {
            let e = x.log10().div(75)
            let min = E(player.ascension.pow(0.75).div(100)).add(0.6)
        if (player.rank.gte(175)) e = e.mul(1.5)
        return e.min(min)
        }
    },{
        start: E(2),
        effect: x => {
            let p = E(0.1)
            if (player.rank.gte(146)) p = p.add(0.15)
        return x.log10().pow(p)
        }
    },{
        start: E(3),
        effect: x => {
        return x.log10().pow(2.5)
        }
    },{
        start: E(4),
        effect: x => {
            let pow = E(1)
            if (player.ascension.gte(7)) pow = player.ascension.pow(0.5)
        return x.log10().pow(2).pow(pow)
        }
    },
]

function ascensionEffect(x) {
    if (player.ascension.gte(ascension_effects[x].start)) {
        return ascension_effects[x].effect(player.ascension_power)
    } else {
        return E(1)
    }
} 