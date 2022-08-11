'use strict'

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
    // elH2Canvas.style.display= 'flex'

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
            return drawUpperText(line.txt, idx)
        })
        // drawLowerText(gElCanvas.width / 2, gElCanvas.height - 70)
    };
    meme.selectedImgId = imgId
    gElCanvas.height = img.height
    gElCanvas.width = img.width
}

function drawUpperText(txt, lineIdx) {
    var txt = document.querySelector('.upper-text').value
    var canvas = getCanvas()
    var meme = getMeme();
    gCtx.beginPath();
    var fontSize = meme.lines[lineIdx].fontSize
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = meme.lines[lineIdx].align;
    gCtx.lineWidth = 2;
    gCtx.font = fontSize + 'px impact';
    gCtx.fillStyle = meme.lines[lineIdx].color;

    if (lineIdx === 0) {
        gCtx.fillText(txt, canvas.width / 2, 40);
        console.log('0')
    }
    else if (lineIdx === 1) {
        gCtx.fillText(txt, canvas.width / 2, canvas.height - 40);
        console.log('1')
    }
    else gCtx.fillText(txt, canvas.width / 2, canvas.height / 2);
    console.log('0')

    // if(lineIdx === 0) {
    //     gCtx.fillText(txt, meme.lines[0].posX, meme.lines[lineIdx].posY);
    // }
    // else if(lineIdx === 1) {
    //     gCtx.fillText(txt, meme.lines[1].posX, meme.lines[lineIdx].posY);
    //     // gCtx.fillText(txt, x, y);
    // }
    // else {
    //     gCtx.fillText(txt, meme.lines[1].posX, meme.lines[lineIdx].posY);
        
    // }
    // gCtx.fillText(txt, x, y);
    // gCtx.strokeStyle = meme.lines[lineIdx].borderTxtColor;
    // gCtx.strokeText(txt, x, y);
    // meme.lines[lineIdx].txt = txt;
    gCtx.closePath();
}

// function drawLowerText(x, y) {
//     var txt = document.querySelector('.lower-text').value
//     var meme = getMeme();
//     gCtx.beginPath();
//     gCtx.textBaseline = 'middle';
//     gCtx.textAlign = 'center';
//     gCtx.lineWidth = 2;
//     gCtx.font = '80px impact';
//     gCtx.fillStyle = meme.txtColor;
//     gCtx.fillText(txt, x, y);
//     gCtx.strokeStyle = meme.borderTxtColor;
//     gCtx.strokeText(txt, x, y);
//     meme.lines[0].lowerTxt = txt;
//     gCtx.closePath();
// }

function increaseFont(elFontUp) {
    var meme = getMeme()
    meme.lines[0].fontSize += 5
    displayFontOnPage()
}

function decreaseFont(elFontDown) {
    var meme = getMeme()
    meme.lines[0].fontSize -= 5
    displayFontOnPage()
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

function addLine() {
    var meme = getMeme()
    var canvas = getCanvas()
    meme.lines[meme.lines.length] =
    {
        txt: 'Type Here',
        size: 20,
        align: 'center',
        fontSize: 70,
        color: 'red',
        posX: canvas.width / 2,
        posY: canvas.height /2
    }
    meme.selectedLineIdx = meme.lines.length - 1
    meme.lines[meme.selectedLineIdx].txt = ''
    renderMeme()
}

function setText() {
    var meme = getMeme()
    if(!meme.lines.length) return
    var text = document.querySelector('.upper-text').value
    meme.lines[meme.selectedLineIdx].txt = text
    renderMeme()
}

function changeLine() {
    setChangeLine()
    document.querySelector('.upper-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function displayFontOnPage() {
    var meme = getMeme()
    document.querySelector('.font-number').innerText = meme.lines[0].fontSize
}