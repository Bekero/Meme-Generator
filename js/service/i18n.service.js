'use strict'

var gTrans = {
gallery: {
        en: 'Gallery',
        he: 'גלריה!'
    },
    about: {
        en: 'About',
        he: 'אודות'
    },
    'meme-generator': {
        en: 'Meme-Generator',
        he: 'ייצור מימים'
    },
    flexible: {
        en: 'Random meme',
        he: 'מימ רנדומלי'
    },
    canvas: {
        en: 'Canvas',
        he: 'קנבס'
    },
    'text-color': {
        en: 'text-color',
        he: 'צבע טקסט'
    },
    'border-text-color': {
        en: 'Border text color',
        he: 'צבע גבול'
    },
    'input-text': {
        en: 'Enter Text Here..',
        he: 'כתוב את הטקסט כאן'
    },
    'download': {
        en: 'download',
        he: 'הורד'
    },
    'about-me-h1': {
        en: 'About Me',
        he: 'קצת עליי'
    },
    'find-more-in': {
        en: 'Find more about me in my Socials!',
        he: '!מצא עליי יותר ברשתות החברתיות'
    },
    'about-me-p': {
        en: `My name is Or Beker I'm 22 years old , Love Beer, Music & Friends,
        And now at the middle of Coding Academy course!`,
        he: `שמי אור בקר אני בן 22, אוהב בירה מוזיקה וחברים, 
        !ועכשיו באמצע הקורס של קודינג אקדמי`
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    const key = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!key) return 'UNKNOWN'
    //  get from gTrans
    let translateVal = key[gCurrLang]
    // If translation not found - use english
    if (!translateVal) translateVal = key['en']
    return translateVal
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    // for each el:
    els.forEach(el => {
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function kmToMiles(km) {
    return km / 1.609
}