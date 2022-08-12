// 'use strict'

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
// var gMeme
// var gImgs = [
//     { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
//     { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
//     { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
//     { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
//     { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
//     { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
//     { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
//     { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
//     { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
//     { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
//     { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
//     { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] },
//     { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] },
//     { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] },
//     { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] },
//     { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
//     { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'cat'] },
//     { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cat'] }
// ];

// function createMeme(id) {
//     var canvas = getCanvas()
//     gMeme = {
//         selectedImgId: id,
//         selectedLineIdx: 0,
//         lines: [
//             {
//                 txt: 'Type Here',
//                 size: 20,
//                 align: 'center',
//                 fontSize: 70,
//                 txtColor: 'white',
//                 borderColor: 'black',
//                 posX: canvas.width / 2,
//                 posY: 80
//             },
//             {
//                 txt: 'Type Here',
//                 size: 20,
//                 align: 'center',
//                 fontSize: 70,
//                 txtColor: 'white',
//                 borderColor: 'black',
//                 posX: canvas.width / 2,
//                 posY: canvas.height - 80
//             }
//         ]
//     }
// }

// function setTextColor(color) {
//     var meme = getMeme()
//     meme.lines[meme.selectedLineIdx].txtColor = color
// }

// function setBorderColor(color) {
//     var meme = getMeme()
//     meme.lines[meme.selectedLineIdx].borderColor = color
// }

// function setIncreaseFont() {
//     return gMeme.lines[gMeme.selectedLineIdx].fontSize += 5
// }

// function setDecreaseFont() {
//     return gMeme.lines[gMeme.selectedLineIdx].fontSize -= 5
// }

// function setAlignLeft() {
//     return gMeme.lines[gMeme.selectedLineIdx].align = 'left'
// }
// function setAlignMiddle() {
//     return gMeme.lines[gMeme.selectedLineIdx].align = 'center'
// }
// function setAlignRight() {
//     return gMeme.lines[gMeme.selectedLineIdx].align = 'right'

// }

// function setClearCanvas() {
//     gMeme.lines.forEach(line => {
//         line.txt = 'Type Here',
//             line.size = 20,
//             line.align = 'center',
//             line.fontSize = 70,
//             line.txtColor = 'white',
//             line.borderColor = 'black',
//             line.posX = gElCanvas.width / 2,
//             line.posY = 80
//     })
// }

// function removeLine() {
//     var meme = getMeme()
//     if (meme.selectedLineIdx >= 1) {
        
//     }
//         meme.selectedLineIdx = meme.lines.length - 1
//     meme.lines[meme.lines.length] =
//     {
//         txt: '',
//     }
//     meme.lines[meme.selectedLineIdx].txt = ''

// }

// function setChangeLine() {
//     if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
//     else gMeme.selectedLineIdx = 0
//     // var lineIdx = gMeme.selectedLineIdx
//     // if(lineIdx >= gMeme.lines.length - 1 || lineIdx < 0) gMeme.selectedLineIdx = 0
//     // else gMeme.selectedLineIdx++
// }


// function getMeme() {
//     return gMeme
// }