let challenges = [
    {
        name: "Cash Decay",
        desc: "Cash is square-rooted in this challenge",
        unlock: "8",
        reward: "Boost cash gain by ^1.00 + (0.05 each challenge completion)",
         completion(x) {
            let y = E(x)
            return y.add(2).pow(9)
        },
        rewardeffect(x) {
            let y = E(x)
            return E(1).add(y.mul(0.05))
        },
        type: "^",
        other: "On first completion, improve Ultra Rebirth's gain to Cash to ^1.25",
        get maxcompletions() {
            let x = E(3)
            if (player.tier.gte(4)) {
                x = x.add(player.tier)
            }
            if (player.tier.gte(5)) {
                x = x.mul(player.tier.sub(3))
            }

            if (x.gte(challenges[0].limit)) {
                x = challenges[0].limit
            }
        return x
        },
        get limit() {
            let x = E(50)
            x = x.mul(E(1).add(player.tetr.mul(0.1)))
            return x.floor()
        }
    },
    {
        name: "1 Button",
        desc: "There is only 1 button of each stat in this challenge",
        unlock: "14",
        reward: "Improves the multiplier to Prestige by ^1.00 + (0.01 each challenge completion)",
         completion(x) {
            let y = E(x)
            return y.add(2).mul(3).pow10()
        },
        rewardeffect(x) {
            let y = E(x)
            return E(1).add(y.mul(0.05))
        },
        type: "^",
        other: "On first completion, unlock the Prestige Stat, oh, and auto Rank up!",
        get maxcompletions() {
            let x = E(1)
            if (player.tier.gte(4)) {
                x = x.add(player.tier)
            }
            if (player.tier.gte(5)) {
                x = x.mul(player.tier.sub(3))
            }
            if (x.gte(challenges[1].limit)) {
                x = challenges[1].limit
            }
            return x
            },
            
        get limit() {
            let x = E(50)
          
            return x.floor()
        }
    },
]
for (let i = 0; i < challenges.length; i++) {
    const element = document.querySelector('#c' + i);
element.addEventListener('mouseover', () => {
    getChallenge(i)
});
element.addEventListener('mouseout', () => {
    getChallenge(-1)
});
}
function getChallenge(n) {
    if (n == -1) {
        el('challenge-title').innerHTML = "Hover over a challenge to see it's description!"
        el('challenge-desc').innerHTML = ""
        el('challenge-reward').innerHTML = ""
        el('challenge-other').innerHTML = ""
    } else {
        el('challenge-title').innerHTML = challenges[n].name
        el('challenge-desc').innerHTML = "Desc: " + challenges[n].desc
        el('challenge-reward').innerHTML = "Reward: " + challenges[n].reward + " Currently: " + challenges[n].type + format(challenges[n].rewardeffect(player.challenges.completed[n]))
        el('challenge-other').innerHTML = challenges[n].other
    }
}
function enterChallenge(i) {
    if (i == 1) {
        updateButtonsCount(1)
    }
    if (i == player.challenges.current) {
        player.rank = E(0);
        reset()
        reset()
        updateButtonsCount(12)
        player.challenges.current = -1
    } else {
        player.rank = E(0);
        reset()
        reset()
        player.challenges.current = i 
    }
   
    
}

function inChallenge(i) {
   if (i == player.challenges.current) {
    return true
   } else {
    return false
   }
}
function updateChallenges() {
    if (player.challenges.current !== -1) {
        el('current-challenge').innerHTML = "You are currently in the " + challenges[player.challenges.current].name + " challenge";
        el('current-challenge-completions').innerHTML =  format(player.challenges.completed[player.challenges.current]) + " completions (Next at " + format(challenges[player.challenges.current].completion(player.challenges.completed[player.challenges.current])) + " cash)"
        if (player.currencies[0].value.gte(challenges[player.challenges.current].completion(player.challenges.completed[player.challenges.current])) && E(player.challenges.completed[player.challenges.current]).lt(challenges[player.challenges.current].maxcompletions))  {
            player.challenges.completed[player.challenges.current] = E(player.challenges.completed[player.challenges.current]).add(1)
        }
    } else {
        el('current-challenge').innerHTML = ""
        el('current-challenge-completions').innerHTML = ""
    }
    for (let i = 0; i < challenges.length; i++) {
        el(`c${i}max`).innerHTML = format(player.challenges.completed[i]) + "/" + format(challenges[i].maxcompletions)
    }

if (hasInfinityUpgrade(0)) {
    player.challenges.completed[0] = challenges[0].maxcompletions
    player.challenges.completed[1] = challenges[1].maxcompletions
}
}

setInterval(updateChallenges, 100)