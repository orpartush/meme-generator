'use strict';

var gCanvas;
var gCtx;
var gCurrLine;
var gCurrLineIdx = 0;
var gSearchfield;

function onInit() {
  createImgs();
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  gCurrLine = gMeme.lines[gCurrLineIdx];
  renderImgs();
  getCurrLine();
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

function renderImgs() {
  let elGallery = document.querySelector('.gallery-container');
  let strHtml = '';
  gImgs.map(img => {
    strHtml += `<img src="${img.url}" data-id="${img.id}" onclick="onImgClick(this)"></img>`
  });
  elGallery.innerHTML = strHtml;
}

function drawText(line) {
  const { 
    font, strokeColor, color, size, align, txt, coords, shadowBlur 
  } = line;
  gCtx.shadowColor = 0;
  gCtx.shadowOffsetX = 0;
  gCtx.shadowOffsetY = 0;
  gCtx.shadowBlur = 0;
  if (shadowBlur) {
    gCtx.shadowColor = 'rgba(255,255, 255, 0.7)';
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowBlur = shadowBlur;
  }
  gCtx.lineWidth = '2';
  gCtx.strokeStyle = strokeColor;
  gCtx.fillStyle = color;
  gCtx.font =  size + 'px ' + font;
  gCtx.textAlign = align;
  gCtx.fillText(txt, coords.x, coords.y);
  gCtx.strokeText(txt, coords.x, coords.y);
}

function onTxtChange(elTxt) {
  let userTxt = elTxt.value;
  updateMemeTxt(userTxt);
  renderCanvas();
}

function onImgClick(elImg) {
  let elHomepage = document.querySelector('.homepage');
  elHomepage.hidden = true;
  let elGenContainer = document.querySelector('.generator-container');
  elGenContainer.hidden = false;
  gMeme.selectedImgId = +elImg.dataset.id;
  renderCanvas();
}

function onAddLine() {
  const { length } = gMeme.lines;
  if (length > 1) createLine(150, 150);
  gCurrLine = gMeme.lines[length];
  getCurrLine();
  renderCanvas();
}

function onDeleteLine() {
  deleteLine();
  renderCanvas();
}

function onIncreaseFont() {
  gCurrLine.size += 2.5;
  renderCanvas();
}

function onDecreaseFont() {
  gCurrLine.size -= 2.5;
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
  if (gMeme.lines.length === 1) return;
  getCurrLine();
  renderCanvas();
}

function onChangeColor(elColor) {
  gCurrLine.color = elColor.value;
  renderCanvas();
}

function onTxtAlign(direction) {
  gCurrLine.align = direction;
  renderCanvas();
}

function onFontChange(userFont) {
  gCurrLine.font = userFont;
  renderCanvas();
}

function downloadImg(elLink) {
  let img = gCanvas.toDataURL("image/jpg");
  elLink.href = img
}

function onMenuToggle() {
  document.body.classList.toggle('menu-open');
}

function onGalleryClick() {
  let elHomepage = document.querySelector('.homepage');
  elHomepage.hidden = false;
  let elGenContainer = document.querySelector('.generator-container');
  elGenContainer.hidden = true;
  if (window.innerWidth < 700) document.body.classList.toggle('menu-open');
}

function onLogoClick() {
  let elHomepage = document.querySelector('.homepage');
  elHomepage.hidden = false;
  let elGenContainer = document.querySelector('.generator-container');
  elGenContainer.hidden = true;
}

function onSaveMeme() {
  let img = gCanvas.toDataURL("image/jpg");
  saveMeme(img);
}
