'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    console.log('gElCanvas : ',gElCanvas);
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
    createMeme()
    renderMeme()
}

function getCanvas() {
    return gElCanvas
}

function nothing() {
    
}