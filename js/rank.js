
let ranktexts = {
    "0": ", At Rank 1, unlock the Multiplier stat",
     "2": ", At Rank 3, unlock the Rebirth stat",
      "4": ", At Rank 5, multiply the multiplier and rebirth gains by x, where x is Rank amount",
        "6": ", At Rank 7, multiply Cash gain by Ultra Rebirths^0.5",
        "12": ", At Rank 13, multiply Ultra Rebirths by 25x",
        "13": ", At Rank 14, unlock the Prestige stat",
}
let tiertexts = {
    "0": ", At Tier 1, boost Cash gain by ^(1 + .1 * y), where y is Tier amount (+10x cash too!)", 
    "1": ", At Tier 2, Rank 5's effect is raised by ^(1 + .25 * y) where y is Tier amount", 
    "2": ", At Tier 3, boost Multiplier gain by ^(1 + .1 * y), where y is Tier amount, but remove Multiplier buttons and automatically gain it", 
    "3": ", At Tier 4, gain max challenge completions each tier!", 
    "4": ", At Tier 5, boost Rebirth gain by ^(1 + .1 * y), where y is Tier amount, but remove Rebirth buttons and automatically gain it + challenge completions are multiplied every tier~!", 
}
let tetrtexts = {
    "0": ", At Tetr 1, boost Ultra Rebirth gain by ^(1 + .1 * y), where y is Tier amount but remove Ultra Rebirth buttons and automatically gain it",
    "1": ", At Tetr 2, boost Prestige gain by ^(1 + .1 * y), where y is Tier amount but remove Prestige buttons and automatically gain it + weaken the softcap",    
}
function getRankCost(i) {
let j = E(i)
if (j.gte(100)) {
    j = j.pow(2.25).add(1)
    return E(10).pow(j)
}
else if (j.lt(5)) {
    j = j.pow(1.5).add(1)
    return E(10).pow(j)
} else {
    j = j.pow(2).add(1)
    return E(10).pow(j)   
}

}
function getRankBulk(i) {
    let r = E(i)
   
    if (E(r.log10().sub(1).root(2.25).floor()).gte(100)) {
     return r.log10().sub(1).root(2.25).floor()
    }
    else if (E(r.log10().sub(1).root(1.5).floor()).lt(5)) {
      
        return r.log10().sub(1).root(1.5).floor()
    } else {
        
        return r.log10().sub(1).root(2).floor()
    }
}

function getTierCost(i) {
    let j = E(i)
  return j.add(2).pow(2)
    
    }
    function getTetrCost(i) {
        let j = E(i)
        if (j.eq(0)) {
            return E(9)
        } else if (j.eq(1)) {
            return E(13)
        }
        else {
            return j.add(2).pow(3)
        }
    
        
        }
    function getRankText(rank) {
        if (ranktexts.hasOwnProperty(rank)) {
            return ranktexts[rank];
        } else {
            return "";
        }
    }
    function getTierText(rank) {
        if (tiertexts.hasOwnProperty(rank)) {
            return tiertexts[rank];
        } else {
            return "";
        }
    }
    function getTetrText(rank) {
        if (tetrtexts.hasOwnProperty(rank)) {
            return tetrtexts[rank];
        } else {
            return "";
        }
    }
function updateRankHTML() {
    let r = player.rank.add(1);
    let t = player.tier.add(1);
    let te = player.tetr.add(1);
    el("rank-amount").innerHTML = "Rank " + format(player.rank);
    el("rank-button").innerHTML = "Upgrade to rank " + format(r) + " for <text-style text=\"" + "cash" + "\">" + format(getRankCost(player.rank)) + "</text-style> " + "cash" + getRankText(player.rank);
    el("tier-amount").innerHTML = "Tier " + format(player.tier);
    el("tier-button").innerHTML = "Upgrade to tier " + format(t) + " at Rank " + format(getTierCost(player.tier)) + getTierText(player.tier);
    el("tetr-amount").innerHTML = "Tetr " + format(player.tetr);
    el("tetr-button").innerHTML = "Upgrade to tetr " + format(te) + " at Tier " + format(getTetrCost(player.tetr)) + getTetrText(player.tetr);
    if (E(player.challenges.completed[1]).gte(1)) {
        ranktexts['13'] = ', At Rank 14, unlock the Prestige stat'
    } else {
         ranktexts['13'] = ''
    }
   
}
function upgradeRank() {
    if (player.options.confirmations.rank) {
    if (confirm("Would you like to upgrade to rank " + (player.rank.add(1)) + "?"))
         {
            if (player.currencies[0].value.gte(getRankCost(player.rank))) {
    player.rank =  player.rank.add(1);
    reset()
    } else {
        
    }
}
} else {
    if (player.currencies[0].value.gte(getRankCost(player.rank))) {
        player.rank =  player.rank.add(1);
    reset()
    } else {
    
    }
}
}
function upgradeTier() {
    if (player.options.confirmations.tier) {
    if (confirm("Would you like to upgrade to tier " + (player.tier + 1) + "?"))
         { 
            if (player.rank.gte(getTierCost(player.tier))) {
    player.tier =  player.tier.add(1);
    player.rank = E(0);
    reset()
    } else {
     
    }
}
} else {
    if (player.rank.gte(getTierCost(player.tier))) {
        player.tier =  player.tier.add(1);
    player.rank = E(0);
        reset()
        } else {
        
        }
}
}
function upgradeTetr() {
    
    if (player.tier.gte(getTierCost(player.tetr))) {
        player.tetr =  player.tetr.add(1);
        player.tier = E(0);
    player.rank = E(0);
    player.challenges.completed[0] = E(0)
    player.challenges.completed[1] = E(0)
        reset()
        } else {
        
        }
}

function autoRankUp() {
    if (player.tier.lt(8)) {
        if (E(player.challenges.completed[1]).gte(1)) {
            if (player.currencies[0].value.gte(getRankCost(player.rank))) {
                player.rank =  player.rank.add(1);
                }
        }
    } else {
        if (player.currencies[0].value.gte(getRankCost(player.rank))) {
            player.rank =  getRankBulk(player.currencies[0].value);
            }
    }
   

}
function autoTierUp() {
    if (player.tetr.gte(2)) {
        if (player.rank.gte(getTierCost(player.tier))) {
            player.tier =  player.tier.add(1);
            } 
}
}
setInterval(autoRankUp, 100)
setInterval(autoTierUp, 100)