'use strict';

var gCanvas;
var gCtx;
var gMemeLines;
var gCurrLine;
var gCurrLineIdx = 0;

function onInit() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  gMemeLines = getMemeLines();
  gCurrLine = gMemeLines[gCurrLineIdx];
  renderCanvas();
}

function renderCanvas() {
  let img = new Image();
  img.src = getImgUrl(gMeme.selectedImgId);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    let memeLines = getMemeLines();
    memeLines.forEach(line => drawText(line));
  }
}

function drawText(line) {
  const { strokeColor, color, size, txt, coords } = line;
  gCtx.lineWidth = '2';
  gCtx.strokeStyle = strokeColor;
  gCtx.fillStyle = color;
  gCtx.font =  size + 'px Impact';
  gCtx.textAlign = 'center';
  gCtx.fillText(txt, coords.x, coords.y);
  gCtx.strokeText(txt, coords.x, coords.y);
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

function onIncreaseFont() {
  gCurrLine.size += 10;
  renderCanvas();
}

function onDecreaseFont() {
  gCurrLine.size -= 10;
  renderCanvas();
}

function onMoveLineUp() {
  gCurrLine.coords.y -= 10;
  renderCanvas();
}

function onMoveLineDown() {
  gCurrLine.coords.y += 10;
  renderCanvas();
}

function onChangeLine() {
  let linesCount = getMemeLines().length;
  (gCurrLineIdx === linesCount - 1) ? gCurrLineIdx = 0 : gCurrLineIdx++;
  gCurrLine = gMemeLines[gCurrLineIdx];
}