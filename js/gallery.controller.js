'use strict'

function renderGallery() {
    var strHtmls = ''
    var elGallery = document.querySelector('.photos')
    gImgs.forEach(img => {
        strHtmls += `<img onclick="imgClicked(${img.id})" src="${img.url}">`
    })
    elGallery.innerHTML = strHtmls
}