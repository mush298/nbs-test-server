let buttons_count = 0
if (player.challenges.current == 1) {
  buttons_count = 1
} else {
  buttons_count = 12
}
   
function createGUI() {
    for (i in player.currencies) {
     let amount = ''
     amount += "You have " + format(player.currencies[i].value) + " " + player.currencies[i].name
     el(player.currencies[i].name).append(amount)
    }
    createButtons()
} 
function createButtons() {
    buttons = [[], [], [], []];
    let buttonContainer = el("multiplier-buttons");
     buttonContainer.innerHTML = ''; 
    for (let i = 0; i < buttons_count; i++) {
     let button = document.createElement("button");
     
 button.id = "multiplier-button";
 button.innerHTML = "Buy <text-style text=\"" + "multiplier" + "\">x" + format(basegains[0].pow(i+1)) + "</text-style> multiplier " + "for" + "<text-style text=\"" + "cash" + "\">" + format(basecosts[0].pow(i+1)) + "</text-style> cash"; 
 button.onclick = function(){
     buyCurrency(1, basegains[0].pow(i+1), basecosts[0].pow(i+1));
 }
 buttonContainer.appendChild(button);
 buttons[0].push(button);
    }
    let buttonContainer2 = el("rebirth-buttons");
    buttonContainer2.innerHTML = '';
    for (let i = 0; i < buttons_count; i++) {
     let button = document.createElement("button");
     
 button.id = "rebirth-button";
 button.innerHTML = "Buy <text-style text=\"" + "rebirth" + "\">" + format(basegains[0].pow(i+1)) + "</text-style> rebirths " + "for" + "<text-style text=\"" + "multiplier" + "\">x" + format(basecosts[0].pow(i+1)) + "</text-style>  multiplier"; 
 button.onclick = function(){
     buyCurrency(2, basegains[1].pow(i+1), basecosts[1].pow(i+1));
 }
 buttonContainer2.appendChild(button);
 buttons[1].push(button);
    }
    let buttonContainer3 = el("ultrarebirth-buttons");
    buttonContainer3.innerHTML = ''; 
    for (let i = 0; i < buttons_count; i++) {
     let button = document.createElement("button");
     
 button.id = "ultrarebirth-button";
 button.innerHTML = "Buy <text-style text=\"" + "ultrarebirth" + "\">" + format(basegains[0].pow(i+1)) + "</text-style> ultra rebirths " + "for" + "<text-style text=\"" + "rebirth" + "\">" + format(basecosts[0].pow(i+1)) + "</text-style>  rebirths"; 
 button.onclick = function(){
     buyCurrency(3, basegains[2].pow(i+1), basecosts[2].pow(i+1));
 }
 buttonContainer3.appendChild(button);
 buttons[2].push(button);
    }
    let buttonContainer4 = el("prestige-buttons");
    buttonContainer4.innerHTML = ''; 
    for (let i = 0; i < buttons_count; i++) {
     let button = document.createElement("button");
     
 button.id = "prestige-button";
 button.innerHTML = "Buy <text-style text=\"" + "prestige" + "\">" + format(basegains[0].pow(i+1)) + "</text-style> prestiges " + "for" + "<text-style text=\"" + "ultrarebirth" + "\">" + format(basecosts[0].pow(i+1)) + "</text-style>  ultra rebirths"; 
 button.onclick = function(){
     buyCurrency(4, basegains[3].pow(i+1), basecosts[3].pow(i+1));
 }
 buttonContainer4.appendChild(button);
 buttons[3].push(button);
    }
 }

 function updateGUI() {
     for (i in player.currencies) {
         if (player.currencies[i].name == 'multiplier') {
             el(player.currencies[i].name).innerHTML = "You have <text-style text=\"" + player.currencies[i].name + "\"> x" + format(player.currencies[i].value) + "</text-style> " + player.currencies[i].name;
        
         } else if (player.currencies[i].name == 'cash') {
             el(player.currencies[i].name).innerHTML = "You have <text-style text=\"" + player.currencies[i].name + "\">" + format(player.currencies[i].value) + "</text-style> " + player.currencies[i].name + " " + formatGain(player.currencies[i].value, player.currencies[0].gain);
         } else {
             el(player.currencies[i].name).innerHTML = "You have <text-style text=\"" + player.currencies[i].name + "\">" + format(player.currencies[i].value) + "</text-style> " + player.currencies[i].name + "s ";
     
         }
        } 
        for (let i = 0; i < buttons[0].length; i++) {
         buttons[0][i].innerHTML = "Buy <text-style text=\"" + "multiplier" + "\">x" + format(basegains[0].pow(i+1).mul(player.currencies[1].total)) + "</text-style> multiplier " + "for " + "<text-style text=\"" + "cash" + "\">" + format(basecosts[0].pow(i+1)) + "</text-style> cash"; 
 if (player.currencies[0].value.gte(basecosts[0].pow(i+1))) {
     buttons[0][i].id = "multiplier-button"
 } else {
     buttons[0][i].id = "multiplier-button-cant"  
 }
        }
        for (let i = 0; i < buttons[1].length; i++) {
         buttons[1][i].innerHTML = "Buy <text-style text=\"" + "rebirth" + "\">" + format(basegains[1].pow(i+1).mul(player.currencies[2].total)) + "</text-style> rebirths " + "for" + "<text-style text=\"" + "multiplier" + "\">x" + format(basecosts[1].pow(i+1)) + "</text-style>  multiplier"; 
         if (player.currencies[1].value.gte(basecosts[1].pow(i+1))) {
             buttons[1][i].id = "rebirth-button"
         } else {
             buttons[1][i].id = "rebirth-button-cant"  
         }
        }
        for (let i = 0; i < buttons[2].length; i++) {
         buttons[2][i].innerHTML = "Buy <text-style text=\"" + "ultrarebirth" + "\">" + format(basegains[2].pow(i+1).mul(player.currencies[3].total)) + "</text-style> ultra rebirths " + "for" + "<text-style text=\"" + "rebirth" + "\">" + format(basecosts[2].pow(i+1)) + "</text-style>  rebirths"; 
         if (player.currencies[2].value.gte(basecosts[2].pow(i+1))) {
             buttons[2][i].id = "ultrarebirth-button"
         } else {
             buttons[2][i].id = "ultrarebirth-button-cant"  
         }
        }
        for (let i = 0; i < buttons[3].length; i++) {
            buttons[3][i].innerHTML = "Buy <text-style text=\"" + "prestige" + "\">" + format(basegains[3].pow(i+1).mul(player.currencies[4].total)) + "</text-style> prestige " + "for" + "<text-style text=\"" + "ultrarebirth" + "\">" + format(basecosts[3].pow(i+1)) + "</text-style> ultra rebirths"; 
            if (player.currencies[3].value.gte(basecosts[3].pow(i+1))) {
                buttons[3][i].id = "prestige-button"
            } else {
                buttons[3][i].id = "prestige-button-cant"  
            }
           }
 
        updateRankHTML()
        updateInfinityHTML()
 }
 function updateButtonsCount(i) {
    buttons_count = i
    createButtons()
 }
 createGUI()
 setInterval(updateGUI, 20)