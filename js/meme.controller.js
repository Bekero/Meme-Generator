'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    createMeme()
    renderMeme()
}

function renderMeme() {
    var meme = getMeme()
    drawImg(meme.selectedImgId)
}

function imgClicked(clickedImg) {
    var elEditor = document.querySelector('.editor-container')
    var elGallery = document.querySelector('.gallery-container')
    var elH2Canvas = document.querySelector('.canvas-h2')
    var elH2Gallery = document.querySelector('.gallery-h2')

    var img = gImgs.find(img => {
        if (img.id === clickedImg) return img
    })
    elEditor.style.display = 'block';
    elH2Canvas.style.display = 'flex'

    elH2Gallery.style.display = 'none'
    elGallery.style.display = 'none';
    drawImg(img.id)
}

function drawImg(imgId) {
    var meme = getMeme()
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        // drawUpperText(gElCanvas.width / 2, gElCanvas.height - 410)
        meme.lines.map((line, idx) => {
            return drawText(line.txt, idx)
        })
    };
    meme.selectedImgId = imgId
    gElCanvas.height = img.height
    gElCanvas.width = img.width
}

function drawText(txt, lineIdx) {
    var canvas = getCanvas()
    var meme = getMeme();
    var fontSize = meme.lines[lineIdx].fontSize
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
    gCtx.closePath();
}

function setText() {
    var meme = getMeme()
    if (!meme.lines.length) return
    var text = document.querySelector('.main-text').value
    meme.lines[meme.selectedLineIdx].txt = text
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
    var meme = getMeme()
    document.querySelector('.font-number').innerText = meme.lines[meme.selectedLineIdx].fontSize
    renderMeme()
}

function decreaseFont() {
    var meme = getMeme()
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
    drawImg(gMeme.selectedImgId)
    renderMeme()
}

function addLine() {
    var meme = getMeme()
    var canvas = getCanvas()
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

function onDown() {
console.log('Finish This!!')
}

function onMove() {
console.log('Finish This!!')
}

function onUp() {
console.log('Finish This!!')
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
    console.log('elLink : ', elLink);
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function getCanvas() {
    return gElCanvas
}