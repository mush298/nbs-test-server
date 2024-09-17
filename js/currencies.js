const FPS = 20
let CURRENCIES = {
    cash: {
        get amount() { return player.currencies[0].value},
        set amount(v) { player.currencies[0].value = v.max(0) },

        get total() { return player.currencies[0].total },
        set total(v) { player.currencies[0].total = v.max(0) },
    
        get gain() {
            let x = E(1)
            x = x.mul(CURRENCIES.multiplier.amount.add(1))
            x = x.mul(rankReward(0))
            x = x.pow(tierReward(0))

            x = x.pow(ascensionEffect(0))

            if (player.rank.gte(15)) x = x.mul(CURRENCIES.ultra_rebirth.amount.pow(2).add(1))

            x = x.overflow('e10000', 0.75)

            x = x.overflow('e9e15', 0.25)

             
                
            return x
        },
    },
    multiplier: {
        get amount() { return player.currencies[1].value},
        set amount(v) { player.currencies[1].value = v.max(0) },

        get total() { return player.currencies[1].total },
        set total(v) { player.currencies[1].total = v.max(0) },
    
        get gain() {
            let x = E(3).mul(ascensionEffect(3))
            return x
        },

        get multiplier() {
            let x = E(1)
            x = x.mul(CURRENCIES.rebirth.amount.mul(5).add(1))
            x = x.mul(rankReward(1))
            x = x.pow(tierReward(1))
            return x
        }
    },
    rebirth: {
        get amount() { return player.currencies[2].value},
        set amount(v) { player.currencies[2].value = v.max(0) },

        get total() { return player.currencies[2].total },
        set total(v) { player.currencies[2].total = v.max(0) },
    
        get gain() {
            let x = E(5).mul(ascensionEffect(3))
            return x
        },

        get multiplier() {
            let x = E(1)
            x = x.mul(CURRENCIES.ultra_rebirth.amount.mul(25).add(1))
            x = x.mul(rankReward(2))
            x = x.pow(tierReward(2))
            return x
        }
    },
    ultra_rebirth: {
        get amount() { return player.currencies[3].value},
        set amount(v) { player.currencies[3].value = v.max(0) },

        get total() { return player.currencies[3].total },
        set total(v) { player.currencies[3].total = v.max(0) },
    
        get gain() {
            let x = E(25).mul(ascensionEffect(3))
            return x
        },
        get multiplier() {
            let x = E(1)
            x = x.mul(CURRENCIES.prestige.amount.pow(3).add(1))
            x = x.mul(rankReward(3))
            x = x.pow(tierReward(3))
            return x
        }
    },
    prestige: {
        get amount() { return player.currencies[4].value},
        set amount(v) { player.currencies[4].value = v.max(0) },

        get total() { return player.currencies[4].total },
        set total(v) { player.currencies[4].total = v.max(0) },
    
        get gain() {
            let x = E(625).mul(ascensionEffect(3))
            return x
        },
        
        get multiplier() {
            let x = E(1)
            x = x.mul(rankReward(4))
            
            return x
        }
    },
    ultra_prestige: {
        get amount() { return player.currencies[5].value},
        set amount(v) { player.currencies[5].value = v.max(0) },

        get total() { return player.currencies[5].total },
        set total(v) { player.currencies[5].total = v.max(0) },
    
        get gain() {
            let x = E(390625)
            return x
        },
    },
    ascension_power: {
        get amount() { return player.ascension_power},
        set amount(v) { player.ascension_power = v.max(0) },
    
        get gain() {
            let x = player.ascension.pow(2)
            x = x.add(CURRENCIES.cash.amount.log10())
            if (player.ascension.gte(3)) x = x.mul(player.ascension.pow10())
            if (player.ascension.gte(4)) x = x.pow(1.25)
            if (player.ascension.gte(4)) x = x.pow(1.1)
            if (player.ascension.gte(11)) x = x.pow(1.5)
                x = x.mul(ascensionEffect(4))
            return x
        },
    },
    infinity: {
        get amount() { return player.infinity.points},
        set amount(v) { player.infinity.points = v.max(0) },

        get total() { return player.infinity.total_points },
        set total(v) { player.infinity.total_points = v.max(0) },
    
        get gain() {
            let x = player.currencies[0].value.log10().div(9e15)
            return x
        },
    },
    eternity: {
        get amount() { return player.eternity.points},
        set amount(v) { player.eternity.points = v.max(0) },

        get total() { return player.eternity.total_points },
        set total(v) { player.eternity.total_points = v.max(0) },
    
        get gain() {
            let x = player.infinity.points.log10().div(308).pow(2.5)
            return x
        },
    },
}

function gainCurrency(id,amt) {
    var curr = CURRENCIES[id]
    curr.amount = curr.amount.add(amt)
    if ('total' in curr) curr.total = curr.total.add(amt)
}

setInterval(function() {
    gainCurrency('cash', CURRENCIES.cash.gain.div(FPS))
    gainCurrency('ascension_power', CURRENCIES.ascension_power.gain.div(FPS))
}, 1000/FPS )