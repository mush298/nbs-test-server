let tab = 0;

function updateTabs() {
    if (tab == 0) {
        el("main").style.display = "block";
    } else {
        el("main").style.display = "none";
    }
    if (tab == 1) {
        el("options").style.display = "block";
    } else {
        el("options").style.display = "none";
    }
    if (tab == 2) {
        el("achievements").style.display = "block";
    } else {
        el("achievements").style.display = "none";
    }
    if (tab == 3) {
        el("infinity").style.display = "block";
    } else {
        el("infinity").style.display = "none";
    }
    if (tab == 4) {
        el("challenges").style.display = "block";
    } else {
        el("challenges").style.display = "none";
    }
    if (player.rank.gte(3)) {
        el("rebirth").style.display = "block";
     
    } else {
        el("rebirth").style.display = "none";
       
    } if (!player.rank.gte(3) || player.tier.gte(5)) {
      
        el("rebirth-buttons").style.display = "none";
    } else {
        
        el("rebirth-buttons").style.display = "block";
    }
    if (player.rank.gte(6)) {
        el("ultrarebirth").style.display = "block";
       
    } else {
        el("ultrarebirth").style.display = "none";
   
    }
    if (!player.rank.gte(1) || player.tier.gte(3)) {
        el("multiplier-buttons").style.display = "none";
    } else {
        el("multiplier-buttons").style.display = "block";
    }
 if (!player.rank.gte(6) || player.tetr.gte(1)) {
      
    el("ultrarebirth-buttons").style.display = "none";
} else {
    
    el("ultrarebirth-buttons").style.display = "block";
}
if (player.currencies[0].value.gte('e9e15') || player.infinity.times.gte(1)) {
el('prestige-infinity').style.display = "block"
} else {
    el('prestige-infinity').style.display = "none"
}
if (player.infinity.times.gte(1)) {
    el('infinity-tab-button').style.display = "block"
    el("infinityconfirm").style.display = "block"
    } else {
        el('infinity-tab-button').style.display = "none"
         el("infinityconfirm").style.display = "none"
    }
    if (player.options.confirmations.ticker) {
el('ticker-container').style.display = "block"
    } else {
el('ticker-container').style.display = "none"
    }
    if (player.rank.gte(14) && E(player.challenges.completed[1]).gte(1)) {
        el('prestige').style.display = 'block'
       
    } else {
        el('prestige').style.display = 'none'
    
    }
    if (!(player.rank.gte(14) && E(player.challenges.completed[1]).gte(1)) || player.tetr.gte(2)) {
        el('prestige-buttons').style.display = 'none'
    } else {
        el('prestige-buttons').style.display = 'block' 
    }
}
setInterval(updateTabs, 50);