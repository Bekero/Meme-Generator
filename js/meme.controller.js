'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const randomSentences = ['I’ll be there', 'Holy Molly', 'Thats Cool Man',
    'Really?', 'thats stupid', 'Maybe you’re right.', 'nah...',
    'Nah mate', 'Ok thats funny', 'SMORT', 'Yea, but why?',
    'Sheeeeeeesh', 'C\'mon man', 'Really?', 'Yes!', 'Nah', 'Thats right', 'Thats not good',
    'Its cool', 'Pineapple-Pen!', 'Is that you', 'Donald Trump !!', 'Toilet paper', 'Im Happy', 'Oh no!', 'Flikamora', 'Are you ready ?', 'Yheayyyy']
let gElCanvas
let gCtx
let gIsDrag

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    showGallery()
    // doTrans()
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    createMeme()
    // renderMeme()
}

function renderMeme() {
    let meme = getMeme()

    gCtx.drawImage(gCurrImg, 0, 0)
    meme.lines.forEach((line, idx) => {
        // gCtx.drawImage(meme.selectedImgId, 0, 0)
        drawText(line.txt, idx)
    })
    // gCtx.drawImage(meme.selectedImgId, 0, 0, gElCanvas.width, gElCanvas.height)
    // meme.lines.map((line, idx) => {
    //     return drawText(line.txt, idx)
    // })
}

function hideGallery(clickedImg) {
    const elEditor = document.querySelector('.editor-container')
    const elGallery = document.querySelector('.gallery-container')
    const elH2Canvas = document.querySelector('.canvas-h2')
    const elH2Gallery = document.querySelector('.gallery-h2')

    let img = gImgs.find(img => {
        if (img.id === clickedImg) return img
    })
    elEditor.style.display = 'block';
    elH2Canvas.style.display = 'flex'

    elH2Gallery.style.display = 'none'
    elGallery.style.display = 'none';
    initImg(img.id)
}

function initImg(imgId) {
    let meme = getMeme()
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`
    img.onload = () => {
        gCurrImg = img
        renderMeme()
        // gCtx.drawImage(meme.selectedImgId, 0, 0)
        //    onInit()
        // meme.lines.map((line, idx) => {
        //     // gCtx.drawImage(meme.selectedImgId, 0, 0)
        //     return drawText(line.txt, idx)
        // })
    };
    meme.selectedImgId = imgId
    gElCanvas.height = img.height
    gElCanvas.width = img.width
}

function drawText(txt, lineIdx) {
    let canvas = getCanvas()
    let meme = getMeme();
    let fontSize = meme.lines[lineIdx].fontSize
    let pos = { x: meme.lines[meme.selectedLineIdx].posX, y: meme.lines[meme.selectedLineIdx].posY }
    gCtx.beginPath();
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = meme.lines[lineIdx].align;
    gCtx.lineWidth = 2;
    gCtx.font = fontSize + 'px impact';
    gCtx.fillStyle = meme.lines[lineIdx].txtColor;
    gCtx.strokeStyle = meme.lines[lineIdx].borderColor;

    if (lineIdx === 0) {
            gCtx.fillText(txt, canvas.width / 2, 40);
            gCtx.strokeText(txt, canvas.width / 2, 40);
    }
    else if (lineIdx === 1) {
            gCtx.fillText(txt, canvas.width / 2, canvas.height - 40);
            gCtx.strokeText(txt, canvas.width / 2, canvas.height - 40);

    }
    else {
            gCtx.fillText(txt, canvas.width / 2, canvas.height / 2);
            gCtx.strokeText(txt, canvas.width / 2, canvas.height / 2);

    }


    // if (lineIdx === 0) {
    //     if(!pos.x && !pos.y) {
    //         gCtx.fillText(txt, canvas.width / 2, 40);
    //         gCtx.strokeText(txt, canvas.width / 2, 40);
    //     } else {
    //         gCtx.fillText(txt, pos.x, pos.y)
    //         gCtx.strokeText(txt, pos.x, pos.y);
    //     }
    // }
    // else if (lineIdx === 1) {
    //     if(!pos.x && !pos.y) {
    //         gCtx.fillText(txt, canvas.width / 2, canvas.height - 40);
    //         gCtx.strokeText(txt, canvas.width / 2, canvas.height - 40);
    //     } else {
    //         gCtx.fillText(txt, pos.x, pos.y)
    //         gCtx.strokeText(txt, pos.x, pos.y);
    //     }
    // }
    // else {
    //     if(!pos.x && !pos.y) {
    //         gCtx.fillText(txt, canvas.width / 2, canvas.height / 2);
    //         gCtx.strokeText(txt, canvas.width / 2, canvas.height / 2);
    //     } else {
    //         gCtx.fillText(txt, pos.x, pos.y)
    //         gCtx.strokeText(txt, pos.x, pos.y);
    //     }
    // }
    gCtx.closePath();
}

function setText() {
    let meme = getMeme()
    if (!meme.lines.length) return
    let text = document.querySelector('.main-text').value
    meme.lines[meme.selectedLineIdx].txt = text
    gCtx.fillText(text, meme.lines[meme.selectedLineIdx].posX, meme.lines[meme.selectedLineIdx].posY)
    renderMeme()
}

function addTextColor(color) {
    setTextColor(color)
    renderMeme()
}

function addBorderColor(borderColor) {
    setBorderColor(borderColor)
    renderMeme()
}

function increaseFont() {
    setIncreaseFont()
    let meme = getMeme()
    document.querySelector('.font-number').innerText = meme.lines[meme.selectedLineIdx].fontSize
    renderMeme()
}

function decreaseFont() {
    let meme = getMeme()
    setDecreaseFont()
    document.querySelector('.font-number').innerText = meme.lines[meme.selectedLineIdx].fontSize
    renderMeme()
}

function alignToLeft() {
    setAlignLeft()
    renderMeme()
}

function alignToMiddle() {
    setAlignMiddle()
    renderMeme()
}

function alignToRight() {
    setAlignRight()
    renderMeme()
}

function clearCanvas() {
    setClearCanvas()
    removeLine()
    initImg(gMeme.selectedImgId)
    renderMeme()
}

function addLine() {
    let meme = getMeme()
    let canvas = getCanvas()
    meme.selectedLineIdx = meme.lines.length - 1
    meme.lines[meme.lines.length] =
    {
        txt: 'Type Here',
        size: 20,
        align: 'center',
        fontSize: 70,
        color: 'red',
        posX: canvas.width / 2,
        posY: canvas.height / 2
    }
    meme.lines[meme.selectedLineIdx].txt = ''
    renderMeme()
}

function changeLine() {
    setChangeLine()
    document.querySelector('.main-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function renderRandomMeme() {
    let randMeme = setRandomMeme()
    initImg(randMeme[0].id)
    randomTexts()
    hideGallery(randMeme[0].id)
    renderMeme()
}

function randomTexts() {
    const randomLines = getRandomInt(1, 3)
    if (randomLines === 1) {
        gMeme.lines[0].txt = randomSentences[getRandomInt(0, randomSentences.length)]
        gMeme.lines[0].txtColor = getRandomColor()
        gMeme.lines[0].borderColor = getRandomColor()
        gMeme.lines[0].fontSize = getRandomInt(15, 41)
    } else {
        gMeme.lines[0].txt = randomSentences[getRandomInt(0, randomSentences.length)]
        gMeme.lines[0].txtColor = getRandomColor()
        gMeme.lines[0].borderColor = getRandomColor()
        gMeme.lines[0].fontSize = getRandomInt(22, 55)
        gMeme.lines[1].txt = randomSentences[getRandomInt(0, randomSentences.length)]
        gMeme.lines[1].txtColor = getRandomColor()
        gMeme.lines[1].borderColor = getRandomColor()
        gMeme.lines[1].fontSize = getRandomInt(15, 41)
    }
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
    renderBooks()
}

function onDown(ev) {
    // Getting the clicked position
    let meme = getMeme()
    const pos = getEvPos(ev)
    // { x: 15, y : 15 }
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    // meme.lines[meme.selectedLineIdx].posX = pos.x
    // meme.lines[meme.selectedLineIdx].posY = pos.y
    document.querySelector('.my-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme();
    // if (!gIsDrag) return
    if (!meme.lines[meme.selectedLineIdx].isDrag) return
    const pos = getEvPos(ev)
    // const dx = pos.x - meme.lines[meme.selectedLineIdx].posX
    // const dy = pos.y - meme.lines[meme.selectedLineIdx].posY
    // moveText(dx, dy)
    meme.lines[meme.selectedLineIdx].posX = pos.x
    meme.lines[meme.selectedLineIdx].posY = pos.y
    renderMeme()
}

function onUp() {
    setTextDrag(false)
    document.querySelector('.my-canvas').style.cursor = 'grab'
}

function setTextDrag(diff) {
    // gIsDrag = boolean
    let meme = getMeme()
    console.log('gMeme.lines[gMeme.selectedLineIdx].isDrag : ', meme.lines[meme.selectedLineIdx].isDrag);
    meme.lines[meme.selectedLineIdx].isDrag = diff
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].posX += dx
    gMeme.lines[gMeme.selectedLineIdx].posY += dy
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)//Mouse Press Down
    gElCanvas.addEventListener('mousemove', onMove)//Mouse moves
    gElCanvas.addEventListener('mouseup', onUp)//Mouse Stops Pressing
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function getCanvas() {
    return gElCanvas
}