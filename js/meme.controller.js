'use strict'

function renderMeme() {
    var meme = getMeme()
    console.log('Meme Object : ', meme);
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
    elH2Canvas.style.display= 'flex'

    elH2Gallery.style.display= 'none'
    elGallery.style.display = 'none';
    drawImg(img.id)
}

function drawImg(imgId) {
    var meme = getMeme()
    const img = new Image();
    img.src = `imgs/${imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawUpperText(gElCanvas.width / 2, gElCanvas.height - 410)
        drawLowerText(gElCanvas.width / 2, gElCanvas.height - 70)
    };
    meme.selectedImgId = imgId
    gElCanvas.height = img.height
    gElCanvas.width = img.width
}

function drawUpperText(x, y) {
    var txt = document.querySelector('.upper-text').value
    var meme = getMeme();
    var fontSize = meme.lines[0].fontSize
    gCtx.beginPath();
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 2;
    gCtx.font = fontSize + 'px impact';
    gCtx.fillStyle = meme.txtColor;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = meme.borderTxtColor;
    gCtx.strokeText(txt, x, y);
    meme.lines[0].upperTxt = txt;
    gCtx.closePath();
}

function drawLowerText(x, y) {
    var txt = document.querySelector('.lower-text').value
    var meme = getMeme();
    gCtx.beginPath();
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 2;
    gCtx.font = '80px impact';
    gCtx.fillStyle = meme.txtColor;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = meme.borderTxtColor;
    gCtx.strokeText(txt, x, y);
    meme.lines[0].lowerTxt = txt;
    gCtx.closePath();
}

function increaseFont(elFontUp) {
    var meme = getMeme()
    meme.lines[0].fontSize += 5
    displayFontOnPage()
    console.log('meme.lines[0].fontSize : ',meme.lines[0].fontSize);
}

function decreaseFont(elFontDown) {
    var meme = getMeme()
    meme.lines[0].fontSize -= 5
    displayFontOnPage()
    console.log('meme.fontSize : ',meme.fontSize);
}

function displayFontOnPage() {
    var meme = getMeme()
document.querySelector('.font-number').innerText = meme.lines[0].fontSize
}