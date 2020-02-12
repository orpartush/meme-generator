'use strict';

var gCanvas;
var gCtx;

function onInit() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawImgWithTxt();
}

function renderCanvas() {
  drawImgWithTxt();
}

function drawImgWithTxt() {
  let img = new Image();
  img.src = getImgUrl(gMeme.selectedImgId);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    let memeTxt = getMemeTxt();
    drawText(memeTxt, 250, 50);
  }
}

function drawText(text, x, y) {
  gCtx.lineWidth = '2'
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'white'
  gCtx.font = '50px Impact'
  gCtx.textAlign = 'center'
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function onTxtChange(elTxt) {
  let userTxt = elTxt.value;
  updateMemeTxt(userTxt);
  renderCanvas();
}

function onChooseImg(elImg) {
  gMeme.selectedImgId = +elImg.dataset.id;
  renderCanvas()
}