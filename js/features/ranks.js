function getRankCost(x) {
    let strength1 = E(1.5)
    strength1 = strength1.sub(ascensionEffect(1))
    return x.add(1).scale(10, strength1, 'P').scale(250, 5, 'P').pow(1.5).pow10()
}
function getRankBulk(x) {
    let strength1 = E(1.5)
    strength1 = strength1.sub(ascensionEffect(1))
   return x.log10().root(1.5).scale(250, 5, 'P', true).scale(10, strength1, 'P', true).floor()
}

function getTierCost(x) {
    if (x == 1) {
        return E(12)
    }
    return E(9).add(x.add(1).pow(2)).floor()
}
function getTierBulk(x) {
    if (x == 0) {
        return E(0)
    }
   return x.sub(9).root(2).add(1).floor().max(1)
}

function updateRanksHTML() {
    el('rank-button').innerHTML = lang_text('rank-upgrade', player.rank.add(1), getRankCost(player.rank))
    el('rank-amount').innerHTML = lang_text('rank-amount', player.rank)

    for (let i = 0; i < rank_rewards.length; i++) {
        el(`rankreward${i+1}`).innerHTML = lang_text(`rank-reward${i+1}`, rankReward(i))
    }

    el('tier-button').innerHTML = lang_text('tier-upgrade', player.tier.add(1), getTierCost(player.tier))
    el('tier-amount').innerHTML = lang_text('tier-amount', player.tier)

    for (let i = 0; i < tier_rewards.length; i++) {
        el(`tierreward${i+1}`).innerHTML = lang_text(`tier-reward${i+1}`, tierReward(i))
    }



}
function upgradeRank() {
    if (player.currencies[0].value.gte(getRankCost(player.rank))) {
        player.rank = player.rank.add(1)
        if (!player.tier.gte(3)) {
        player.currencies[0].value = E(0)
        player.currencies[1].value = E(0)
        player.currencies[2].value = E(0)
        player.currencies[3].value = E(0)
        }
    }
}

function upgradeTier() {
    if (player.rank.gte(getTierCost(player.tier))) {
        player.tier = player.tier.add(1)
        player.rank = E(0)
        player.currencies[0].value = E(0)
        player.currencies[1].value = E(0)
        player.currencies[2].value = E(0)
        player.currencies[3].value = E(0)
    }
}

let rank_rewards = [
    {
        start: E(1),
        effect: x => {
        let p = E(1.5)
        let r = E(2)
        if (player.rank.gte(7)) p = p.mul(2)

        if (player.rank.gte(14)) r = r.sub(0.5)

        if (player.rank.gte(8)) p = p.add(player.rank.root(r))

         return x.add(1).pow(p).pow(ascensionEffect(2))
        }
    },
    {
        start: E(1),
        effect: x => {
            let p = E(1.25)
            let r = E(2)
            if (player.rank.gte(8)) p = p.add(0.75)

            if (player.rank.gte(11)) p = p.add(1)

            if (player.rank.gte(14)) p = p.add(2)

            if (player.rank.gte(16)) p = p.add(player.rank.root(r))
            return x.add(1).pow(p).pow(ascensionEffect(2))
        }
    },
    {
        start: E(11),
        effect: x => {
            let p = E(1.5)

            if (player.rank.gte(14)) p = p.add(1.5)

            if (player.rank.gte(17)) p = p.add(2)

            return x.add(1).pow(p).pow(ascensionEffect(2))
        }
    },
    {
        start: E(15),
        effect: x => {
            let p = E(1.5)
            if (player.rank.gte(24)) p = p.add(1.5)
            if (player.rank.gte(127)) p = p.add(1.5)
            return x.add(1).pow(p).pow(ascensionEffect(2))
        }
    },
    {
        start: E(121),
        effect: x => {
            let p = E(3)
            return x.add(1).pow(p).pow(ascensionEffect(2).mul(1.25))
        }
    }
]


function rankReward(x) {
    if (player.rank.gte(rank_rewards[x].start)) {
        return rank_rewards[x].effect(player.rank)
    } else {
        return E(1)
    }
} 

let tier_rewards = [
    {
        start: E(1),
        effect: x => {
            let p = E(0.5)

            let a = E(1)

            if (player.tier.gte(3)) p = p.add(0.1)

            if (player.tier.gte(4)) p = p.add(player.tier.div(10).min(1))

            if (player.tier.gte(11)) p = p.add(player.tier.div(100))

                if (player.tier.gte(21)) p = p.mul(1.25)
            
         return x.add(a).pow(p)
        }
    }, {
        start: E(3),
        effect: x => {
            let p = E(0.4)

            let a = E(1)

            if (player.tier.gte(10)) p = p.add(0.35)

            if (player.rank.gte(125)) a = a.add(player.rank.div(50))

            if (player.rank.gte(777)) p = p.mul(1.25)

         return x.add(a).pow(p)
        }
    },{
        start: E(11),
        effect: x => {
            let p = E(0.5)

            if (player.tier.gte(18)) p = p.add(0.25)

         return x.add(1).pow(p)
        }
    },{
        start: E(81),
        effect: x => {
            let p = E(0.5)

         return x.add(1).pow(p)
        }
    },
]


function tierReward(x) {
    if (player.tier.gte(tier_rewards[x].start)) {
        return tier_rewards[x].effect(player.tier)
    } else {
        return E(1)
    }
} 

function autoRankUp() {
    if (player.tier.gte(3) || player.ascension.gte(2)) {
    player.rank = getRankBulk(player.currencies[0].value.add(1))
    }   
    if (player.ascension.gte(6)) {
        player.tier = getTierBulk(player.rank)
     }
}

setInterval(autoRankUp, 1000 / FPS)

