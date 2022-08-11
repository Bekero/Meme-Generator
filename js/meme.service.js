'use strict'

// ImageId , Text
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gMeme
var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cat'] }
];

function createMeme() {
    var canvas = getCanvas()
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Upper Text',
                size: 20,
                align: 'center',
                fontSize: 70,
                color: 'red',
                posX: canvas.width / 2,
                posY: 80
            },
            {
                txt: 'Lower Text',
                size: 20,
                align: 'center',
                fontSize: 70,
                color: 'red',
                posX: canvas.width / 2,
                posY: canvas.height - 80
            }
        ]
    }
}
// var gMeme = {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             upperTxt: '',
//             lowerTxt: '',
//             size: 20,
//             align: 'center',
//             fontSize: 70,
//             color: 'red'
//         }
//     ]
// }

function setChangeLine() {
    var lineIdx = gMeme.selectedLineIdx
    if(lineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    // if(lineIdx >= gMeme.lines.length - 1 || lineIdx < 0) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx = 0

    // else gMeme.selectedLineIdx++
}

function setAlignLeft() {
    gMeme.lines[0].align = 'left'
}
function setAlignMiddle() {
    gMeme.lines[0].align = 'center'
}
function setAlignRight() {
    gMeme.lines[0].align = 'right'

}

function getMeme() {
    return gMeme
}

function getProps(props = {}) {
    gMeme = {
        ...gMeme,
        ...props
    }
    // meme.lines[0].upperTxt = upperText
    // meme.lines[0].lowerTxt = lowerText
}