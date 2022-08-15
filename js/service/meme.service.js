'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMeme
let gCurrImg
let gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['animals', 'dog'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['computer', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'person'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['politics', 'person'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['fight', 'funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['tv', 'person'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['tv', 'known'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['tv', 'person'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['tv', 'person'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['tv'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cartoon'] }
];

function createMeme(id) {
    let canvas = getCanvas()
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Place',
                size: 20,
                align: 'center',
                fontSize: 50,
                txtColor: 'white',
                borderColor: 'black',
                posX: canvas.width / 2,
                posY: 80,
                isDrag: false
            },
            {
                txt: 'Holder',
                size: 20,
                align: 'center',
                fontSize: 70,
                txtColor: 'white',
                borderColor: 'black',
                posX: canvas.width / 2,
                posY: canvas.height - 80,
                isDrag: false
            }
        ]
    }
}

function setTextColor(color) {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].txtColor = color
}

function setBorderColor(color) {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].borderColor = color
}

function setIncreaseFont() {
    return gMeme.lines[gMeme.selectedLineIdx].fontSize += 5
}

function setDecreaseFont() {
    return gMeme.lines[gMeme.selectedLineIdx].fontSize -= 5
}

function setAlignLeft() {
    return gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function setAlignMiddle() {
    return gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function setAlignRight() {
    return gMeme.lines[gMeme.selectedLineIdx].align = 'right'

}

function setClearCanvas() {
    gMeme.lines.forEach(line => {
        line.txt = 'Type Here',
            line.size = 20,
            line.align = 'center',
            line.fontSize = 70,
            line.txtColor = 'white',
            line.borderColor = 'black',
            line.posX = gElCanvas.width / 2,
            line.posY = 80
    })
}

function removeLine() {
    var meme = getMeme();
    document.querySelector('.main-text').value = '';
    if (meme.selectedLineIdx === 0) {
        renderMeme();
        return;
    }
    meme.selectedLineIdx--;
    renderMeme();
}

function setChangeLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0
}

function isTextClicked(meme, clickedPos) {
    return meme.lines.find((line, idx) => {
        console.log(Math.sqrt((line.posX - clickedPos.x) ** 2 + (line.posY - clickedPos.y) ** 2), gCtx.measureText(line.txt).width)
        if (Math.sqrt((line.posX - clickedPos.x) ** 2 + (line.posY - clickedPos.y) ** 2) <= gCtx.measureText(line.txt).width) {
            meme.selectedLineIdx = idx
            return true
        }
    })
}

function setRandomMeme() {
    let shuffleMemes = shuffle(gImgs)
    let randMeme = shuffleMemes.splice(gImgs.length - 1, 1)
    return randMeme
}

function getRandomWords() {
    let shuffledWords = shuffle(gTexts)
    let wordsForDisplay = ''
    for (var i = 0; i < 3; i++) {
        wordsForDisplay += shuffledWords.splice(shuffledWords.length - 1, 1) + ' '
    }
    console.log('wordsForDisplay : ', wordsForDisplay);
    return wordsForDisplay
}

function getMeme() {
    return gMeme
}
