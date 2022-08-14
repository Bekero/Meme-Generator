'use strict'

function renderGallery() {
    // var strHtmls = ''
    const elGallery = document.querySelector('.photos-container')
    const strHtmls = gImgs.map(img => {
        return `<img onclick="hideGallery(${img.id})" src="${img.url}">`
    })
    elGallery.innerHTML = strHtmls.join('')
}

function showGallery() {
    const elEditor = document.querySelector('.editor-container')
    const elGallery = document.querySelector('.gallery-container')
    const elH2Canvas = document.querySelector('.canvas-h2')
    const elH2Gallery = document.querySelector('.gallery-h2')
    const elRandomBtn = document.querySelector('.flexible-div')

    elEditor.style.display = 'none';
    elH2Canvas.style.display = 'none'

    elGallery.style.display = 'block';
    elH2Gallery.style.display = 'flex'

    elRandomBtn.style.display = 'flex'
}