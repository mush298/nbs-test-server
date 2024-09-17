let basegains = [E(2), E(5), E(25), E(625)]
let basecosts = [E(10), E(100), E(1e6), E(1e15)]
let buttons_count = 12

function updateStatsHTML() {
el('cash').innerHTML = lang_text('cash-amount', CURRENCIES.cash.amount)
el('multiplier').innerHTML = lang_text('multiplier-amount', CURRENCIES.multiplier.amount)
el('rebirth').innerHTML = lang_text('rebirth-amount', CURRENCIES.rebirth.amount)
el('ultra-rebirth').innerHTML = lang_text('ultra-rebirth-amount', CURRENCIES.ultra_rebirth.amount)
el('prestige').innerHTML = lang_text('prestige-amount', CURRENCIES.prestige.amount)

for (let i = 0; i < buttons[0].length; i++) {
    buttons[0][i].innerHTML = lang_text('multiplier-button', basegains[0].pow(i+1).mul(CURRENCIES.multiplier.multiplier), basecosts[0].pow(i+1))
    buttons[1][i].innerHTML = lang_text('rebirth-button', basegains[1].pow(i+1).mul(CURRENCIES.rebirth.multiplier), basecosts[1].pow(i+1))
    buttons[2][i].innerHTML = lang_text('ultra-rebirth-button', basegains[2].pow(i+1).mul(CURRENCIES.ultra_rebirth.multiplier), basecosts[2].pow(i+1))
    buttons[3][i].innerHTML = lang_text('prestige-button', basegains[3].pow(i+1).mul(CURRENCIES.prestige.multiplier), basecosts[3].pow(i+1))
}






// hiding things

if (player.rank.gte(3)) {
    el('rebirth').style.visibility = 'visible';
    el('rebirth-buttons').style.visibility = 'visible';
} else {
    el('rebirth').style.visibility = 'hidden';
    el('rebirth-buttons').style.visibility = 'hidden';
}

if (player.rank.gte(6)) {
    el('ultra-rebirth').style.visibility = 'visible';
    el('ultra-rebirth-buttons').style.visibility = 'visible';
} else {
    el('ultra-rebirth').style.visibility = 'hidden';
    el('ultra-rebirth-buttons').style.visibility = 'hidden';
}

}


function createButtons() {
    buttons = [[], [], [], []];
    let buttonContainer = document.getElementById("multiplier-buttons");
     buttonContainer.innerHTML = ''; 
    for (let i = 0; i < buttons_count; i++) {
     let button = document.createElement("button");
     
 button.id = "multiplier-button";
 button.innerHTML = lang_text('multiplier-button', basegains[0].pow(i+1).mul(CURRENCIES.multiplier.multiplier), basecosts[0].pow(i+1))
  button.onclick = function(){
     buyCurrency(1, basegains[0].pow(i+1).mul(CURRENCIES.multiplier.multiplier), basecosts[0].pow(i+1));
 }
 buttonContainer.appendChild(button);
 buttons[0].push(button);
    }



    let buttonContainer2 = document.getElementById("rebirth-buttons");
    buttonContainer2.innerHTML = ''; 
   for (let i = 0; i < buttons_count; i++) {
    let button = document.createElement("button");
    
button.id = "rebirth-button";
button.innerHTML = lang_text('rebirth-button', basegains[1].pow(i+1).mul(CURRENCIES.rebirth.multiplier), basecosts[1].pow(i+1))
 button.onclick = function(){
    buyCurrency(2, basegains[1].pow(i+1).mul(CURRENCIES.rebirth.multiplier), basecosts[1].pow(i+1));
}
buttonContainer2.appendChild(button);
buttons[1].push(button);
   }


   let buttonContainer3 = document.getElementById("ultra-rebirth-buttons");
    buttonContainer3.innerHTML = ''; 
   for (let i = 0; i < buttons_count; i++) {
    let button = document.createElement("button");
    
button.id = "ultrarebirth-button";
button.innerHTML = lang_text('ultra-rebirth-button', basegains[2].pow(i+1).mul(CURRENCIES.ultra_rebirth.multiplier), basecosts[2].pow(i+1))
 button.onclick = function(){
    buyCurrency(3, basegains[2].pow(i+1).mul(CURRENCIES.ultra_rebirth.multiplier), basecosts[2].pow(i+1));
}
buttonContainer3.appendChild(button);
buttons[2].push(button);
   }

   let buttonContainer4 = document.getElementById("prestige-buttons");
   buttonContainer4.innerHTML = ''; 
  for (let i = 0; i < buttons_count; i++) {
   let button = document.createElement("button");
   
button.id = "prestige-button";
button.innerHTML = lang_text('prestige-button', basegains[3].pow(i+1).mul(CURRENCIES.prestige.multiplier), basecosts[3].pow(i+1))
button.onclick = function(){
   buyCurrency(4, basegains[3].pow(i+1).mul(CURRENCIES.prestige.multiplier), basecosts[3].pow(i+1));
}
buttonContainer4.appendChild(button);
buttons[3].push(button);
  }
}
document.addEventListener('DOMContentLoaded', function() {
    createButtons()
});

function buyCurrency(i, a, c) {
    if (player.currencies[i - 1].value.gte(c)) {
        player.currencies[i].value = player.currencies[i].value.add(a);
        if (i-1 == 0) {
        player.currencies[i-1].value = player.currencies[i-1].value.sub(c);
        } else {
            player.currencies[i-1].value = E(0)
        }
    }
}

function updateGains() {

    basegains[0] = E(3).mul(ascensionEffect(3))
    basegains[1] = E(5).mul(ascensionEffect(3))
    basegains[2] = E(25).mul(ascensionEffect(3))
    basegains[3] = E(625).mul(ascensionEffect(3))

    if (player.tier.gte(2) || player.ascension.gte(2)) player.currencies[1].value = player.currencies[1].value.add(basegains[0].pow(15).mul(CURRENCIES.multiplier.multiplier))
    if (player.tier.gte(5) || player.ascension.gte(2)) player.currencies[2].value = player.currencies[2].value.add(basegains[1].pow(15).mul(CURRENCIES.rebirth.multiplier))
    if (player.tier.gte(8) || player.ascension.gte(2)) player.currencies[3].value = player.currencies[3].value.add(basegains[2].pow(15).mul(CURRENCIES.ultra_rebirth.multiplier))
    if (player.tier.gte(14)) player.currencies[4].value = player.currencies[4].value.add(basegains[3].pow(25).mul(CURRENCIES.prestige.multiplier))
}

setInterval(updateGains, 1000 / FPS)

// Example usage- SHUT UP!!!!! *PUTS YOU IN A HOLE*


