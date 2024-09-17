// This is main language file! It's English!
function toTextStyle(text,style="",id) { return `<text-style text="${style}" ${id ? `id="${id}"` : ""}>${text}</text-style>` }
LANGUAGES.EN = {
    name: "English",
    inter_name: "English",
    icon: "lang-en",

    text: {
        // Currencies

        'cash-name': "Cash",
        'cash-costName': toTextStyle('Cash','cash'),

        'cash-amount': x => `You have <b>${format(x)}<b> ${toTextStyle('cash','cash')}`,

        'multiplier-name': "Multiplier",
        'multiplier-costName': toTextStyle('Multiplier','Multiplier'),

        'multiplier-amount': x => `You have <b>x${format(x)}<b> ${toTextStyle('multiplier','multiplier')}`,


       'multiplier-button': (x, y) => `Buy ${toTextStyle('x' + format(x),'multiplier')} multiplier for ${toTextStyle(format(y),'cash')} cash`,

        'rebirth-name': "Rebirths",
        'rebirth-costName': toTextStyle('rebirths','rebirth'),

        'rebirth-amount': x => `You have <b>${format(x)}<b> ${toTextStyle('rebirths','rebirth')}`,


       'rebirth-button': (x, y) => `Buy ${toTextStyle(format(x),'rebirth')} rebirths for ${toTextStyle('x' + format(y),'multiplier')} multiplier`,

       'ultra-rebirth-name': "Ultra Rebirths",
        'ultra-rebirth-costName': toTextStyle('Ultra Rebirths','ultrarebirth'),

        'ultra-rebirth-amount': x => `You have <b>${format(x, 1)}<b> ${toTextStyle('ultra rebirths','ultrarebirth')}`,


       'ultra-rebirth-button': (x, y) => `Buy ${toTextStyle(format(x),'ultrarebirth')} ultra rebirths for ${toTextStyle(format(y),'rebirth')} rebirths`,

       'prestige-name': "Prestige",
       'prestige-costName': toTextStyle('Prestiges','prestige'),

       'prestige-amount': x => `You have <b>${format(x, 1)}<b> ${toTextStyle('prestiges','prestige')}`,


      'prestige-button': (x, y) => `Buy ${toTextStyle(format(x),'prestige')} prestiges for ${toTextStyle(format(y),'ultrarebirth')} ultra rebirths`,



        'tab-main': 'Main',
        'tab-options': "Options",
        'tab-infinity': 'Infinity',
        'tab-eternity': "Eternity",

        'tab-stats': 'Stats',

        'tab-ascension': 'Ascension',
        'tab-infinity-upgrades': "Infinity Upgrades",
        'tab-infinity-power': 'Infinity Power',
        'tab-infinity-stats': "Infinity Stats",
        'tab-eternity-upgrades': 'Eternity Upgrades',
        'tab-eternity-tree': "Eternity Tree",
        'tab-dilation': "Dilation",

        //rank stuff

        'rank-upgrade':  (x, y) => `Upgrade to Rank <b>${x}</b> for ${toTextStyle(format(y),'cash')} cash`,
        'rank-amount': x => `Rank <b>${x}</b>`,
        'rank-reward1': x => `<b>x${format(x)}</b> ${toTextStyle('cash','cash')}`,
        'rank-reward2': x => `<b>x${format(x)}</b> ${toTextStyle('multiplier','multiplier')}`,
        'rank-reward3': x => `<b>x${format(x)}</b> ${toTextStyle('rebirths','rebirth')}`,
        'rank-reward4': x => `<b>x${format(x)}</b> ${toTextStyle('ultra rebirths','ultrarebirth')}`,
        'rank-reward5': x => `<b>x${format(x)}</b> ${toTextStyle('prestiges','prestige')}`,



        'tier-upgrade':  (x, y) => `Upgrade to Tier <b>${x}</b> at Rank <b>${y}</b>`,
        'tier-amount': x => `Tier <b>${x}</b>`,
        'tier-reward1': x => `<b>^${format(x)}</b> ${toTextStyle('cash','cash')}`,
        'tier-reward2': x => `<b>^${format(x)}</b> ${toTextStyle('multiplier','multiplier')}`,
        'tier-reward3': x => `<b>^${format(x)}</b> ${toTextStyle('rebirths','rebirth')}`,
        'tier-reward4': x => `<b>^${format(x)}</b> ${toTextStyle('ultra rebirths','ultrarebirth')}`,

        // ascension stuff

        'ascension-count': x=>`You currently have <b>${format(x)}</b> ${toTextStyle('ascensions','ascension')}`,
        'ascension-upgrade': x=>`Ascend for ${toTextStyle(format(x),'cash')} cash`,

        'ascension-power': x=>`You have <b>${format(x)}</b> ascension power`,

        'ascension-effect1': x => `<b>^${format(x)}</b> ${toTextStyle('cash','cash')}`,
        'ascension-effect2': x => `<b>${format(E(x).mul(100))}%</b> weaker Rank scaling`,
        'ascension-effect3': x => `<b>^${format(x)}</b> to the first 5 Rank effects`,
        'ascension-effect4': x => `<b>x${format(x)}</b> to the stat bases`,
        'ascension-effect5': x => `<b>x${format(x)}</b> ascension power`,
        'ascension-effect6': x => `<b>^${format(x)}</b> to the previous effect`,
        
      
    },
}
