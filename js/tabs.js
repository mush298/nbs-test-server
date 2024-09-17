const el = i => document.getElementById(i);
function el_display(bool) { return bool ? "" : "none" }
function el_classes(data) { return Object.keys(data).filter(x => data[x]).join(" ") }
var tab = 0, stab = [0,0,0,0,0], tab_name = 'stats'

const TAB_IDS = {
    'stats': {
        html: updateStatsHTML,

        notify() {
            return false
        },
    },
    'options': {
       html: false
    },
    'ascension': {
       html: updateAscensionHTML
    },
    'infinity-upgrades': {
        html: false
     },
     'infinity-power': {
        html: false
     },
     'infinity-stats': {
        html: false
     },
     'eternity-upgrades': {
        html: false
     },
     'eternity-tree': {
        html: false
     },
     'dilation': {
        html: false
     },
}

const TABS = [
    {
        id: 'main',
        unl: ()=>true,
        stab: [
            ["stats"],
            ['ascension',()=>true]
        ],
    },{
        stab: "options",
    },{
        id: 'infinity',
        unl: ()=>true,
        stab: [
            ["infinity-upgrades"],
            ["infinity-power"],
            ["infinity-stats"]
        ],
    },{
        id: 'eternity',
        unl: ()=>true,
        stab: [
            ["eternity-upgrades"],
            ["eternity-tree"],
            ["dilation"],
        ],
        style: {
            "background": `black url('textures/cosmic-pattern.png')`,
            "color": "white",
            "animation": `20s linear infinite`,
        },
    },
]

const DEFAULT_TAB_STYLE = {
    "background": "#121212",
    "color": "#121212",
    "animation": "none",
}

function switchTab(t,st) {
    tab = t
    if (st !== undefined) stab[t] = st

    let s = TABS[t].stab

    if (Array.isArray(s)) tab_name = s[stab[t]??0][0]
    else tab_name = s
}

 function getTabNotification(id) {
   // return TAB_IDS[id].notify?.() || id in SU_TABS && SU_TABS[id].filter(x => !tmp.su_automated.includes(x) && canAffordSharkUpgrade(x)).length > 0
   return false
 }

function updateTabs() {
    var tab_unlocked = {}

    for (let [i,v] of Object.entries(TABS)) {
        let unl = !v.unl || v.unl(), elem, selected = parseInt(i) == tab, array = Array.isArray(v.stab)
        tab_unlocked[i] = []

        if (array) {
            if (player && unl) {
                tab_unlocked[i] = v.stab.filter(x => (!x[1] || x[1]()) && getTabNotification(x[0])).map(x => x[0])
            }

            elem = el('stab'+i+'-div')

            elem.style.display = el_display(selected)

            if (selected) v.stab.forEach(([x,u],j) => {
                var s_elem = el('stab'+i+'-'+j+'-button')

                s_elem.style.display = el_display(!u || u())
                s_elem.className = el_classes({"tab-button": true, subtab: true, selected: x == tab_name, notify: false}) // "tab-button stab"+(x == tab_name ? " selected" : "")
            })
        }

        elem = el('tab'+i+'-button')

        elem.style.display = el_display(unl)
        if (unl) elem.className = el_classes({"tab-button": true, selected, notify: false}) // "tab-button"+(selected ? " selected" : "")
    }

    for (let [i,v] of Object.entries(TAB_IDS)) {
        let unl = tab_name == i, elem = el(i+"-tab")

        if (!elem) continue;

        elem.style.display = el_display(unl)

        if (unl) v.html?.()
    }

    for (let [k,v] of Object.entries(TABS[tab]?.style ?? DEFAULT_TAB_STYLE)) document.body.style[k] = v
}


function setupTabs() {
    // Setting Tab as Language

    for (let [i,v] of Object.entries(TAB_IDS)) v.name = lang_text('tab-'+i)
    TABS.forEach(v => { if (!Array.isArray(v.stab)) v.name = TAB_IDS[v.stab].name; else v.name = lang_text('tab-'+v.id) })

    // Setup HTML

    let h = "", h2 = ""

    for (let [i,v] of Object.entries(TABS)) {
        h += `<button class="tab-button" id="tab${i}-button" onclick="switchTab(${i})">${v.name}</button>`

        if (Array.isArray(v.stab)) {
            h2 += `<div id="stab${i}-div" id="${v.stab[stab[i]]}-tab">
            ${v.stab.map(([x],j) => `<button class="subtab" id="stab${i}-${j}-button" onclick="switchTab(${i},${j})">${TAB_IDS[x].name}</button>`).join("")}
            </div>`
        }
    }

    const tabsElement = document.getElementById('tabs');
    if (tabsElement) {
        tabsElement.innerHTML = h + h2;
    } else {
        console.error("Element with id 'tabs' not found");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setInterval(updateTabs, 1000 / FPS);
    setInterval(updateRanksHTML, 1000 / FPS);
});