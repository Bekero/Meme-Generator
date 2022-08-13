'use strict'

function renderGallery() {
    var strHtmls = ''
    var elGallery = document.querySelector('.photos')
    gImgs.forEach(img => {
        strHtmls += `<img onclick="hideGallery(${img.id})" src="${img.url}">`
    })
    elGallery.innerHTML = strHtmls
}

function showGallery() {
    var elEditor = document.querySelector('.editor-container')
    var elGallery = document.querySelector('.gallery-container')
    var elH2Canvas = document.querySelector('.canvas-h2')
    var elH2Gallery = document.querySelector('.gallery-h2')

    elEditor.style.display = 'none';
    elH2Canvas.style.display= 'none'

    elGallery.style.display = 'flex';
    elH2Gallery.style.display= 'flex'
}