'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const randomSentences = ['I’ll be there', 'Holy Molly', 'Thats Cool Man',
    'Really?', 'thats stupid', 'Maybe you’re right.', 'nah...',
    'Nah mate', 'Ok thats funny', 'SMORT', 'Yea, but why?',
    'Sheesh', 'C\'mon man', 'Really?', 'Yes!', 'Nah', 'Thats right', 'Thats not good',
    'Its cool', 'Pineapple-Pen!', 'Is that you', 'Donald Trump !!', 'Toilet paper', 'Im Happy', 'Oh no!', 'Flikamora', 'Are you ready ?', 'Yheayyyy']
let gElCanvas
let gCtx
let gIsDrag
let gClickedLine

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
    meme.lines.forEach((line) => {
        drawText(line)
    })
}

function hideGallery(clickedImg) {
    const elEditor = document.querySelector('.editor-container')
    const elGallery = document.querySelector('.gallery-container')
    const elH2Canvas = document.querySelector('.canvas-h2')
    const elH2Gallery = document.querySelector('.gallery-h2')
        const elRandomBtn = document.querySelector('.flexible-div')

    let img = gImgs.find(img => {
        if (img.id === clickedImg) return img
    })
    elEditor.style.display = 'block';
    elH2Canvas.style.display = 'flex'

    elH2Gallery.style.display = 'none'
    elGallery.style.display = 'none';

    elRandomBtn.style.display = 'none'

    initImg(img.id)
}

function initImg(imgId) {
    console.log('imgId : ',imgId);
    let meme = getMeme()
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`
    img.onload = () => {
        gCurrImg = img
        renderMeme()
    };
    meme.selectedImgId = imgId
    gElCanvas.height = img.height
    gElCanvas.width = img.width
}

function drawText(line) {
    let canvas = getCanvas()
    let meme = getMeme();
    let fontSize = line.fontSize
    console.log(meme.selectedLineIdx)
    gCtx.beginPath();
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.lineWidth = 2;
    gCtx.font = fontSize + 'px impact';
    gCtx.fillStyle = line.txtColor;
    gCtx.strokeStyle = line.borderColor;
    gCtx.fillText(line.txt, line.posX, line.posY)
    gCtx.strokeText(line.txt, line.posX, line.posY)
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
    if ( !isTextClicked(meme, pos)) return
    console.log('down')
    setTextDrag(true)
    // meme.lines[meme.selectedLineIdx].posX = pos.x
    // meme.lines[meme.selectedLineIdx].posY = pos.y
    document.querySelector('.my-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme();
    if (!gIsDrag) return
    // if (!meme.lines[meme.selectedLineIdx].isDrag) return
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

function setTextDrag(isDrag) {
    gIsDrag = isDrag
    if(!isDrag) return

    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].isDrag = isDrag
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