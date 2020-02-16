'use strict';

var gCanvas;
var gCtx;
var gCurrLine = null;
var gCurrLineIdx = null;
var gSearchfield;

function onInit() {
  createImgs();
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  getCurrLine();
  renderImgs();
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

function renderImgs(imgs = gImgs) {
  let elGallery = document.querySelector('.gallery-container');
  let strHtml = '';
  imgs.map(img => {
    strHtml += `<img src='${img.url}' data-id='${img.id}' onclick='onImgClick(this)'></img>`
  });
  elGallery.innerHTML = strHtml;
}

function drawText(line) {
  const { 
    font, strokeColor, color, size, align, txt, coords, isFocused 
  } = line;
  if (isFocused) drawRect(coords.y, size);

  gCtx.fillStyle = color;
  gCtx.font =  size + 'px ' + font;
  gCtx.strokeStyle = strokeColor;
  gCtx.textAlign = align;
  gCtx.lineWidth = '4';
  gCtx.strokeStyle = strokeColor;
  gCtx.strokeText(txt, coords.x, coords.y);
  gCtx.fillText(txt,coords.x,coords.y);
  
}

function drawRect(y, size) {
  gCtx.beginPath();
  gCtx.lineWidth = '1';
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'rgb(255, 255, 255, 0.7)';
  gCtx.stroke();
  gCtx.strokeRect(0, y - size, 300, size+10);
  gCtx.fillRect(0, y - size, 300, size+10);
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
  if (gMeme.lines.length === 0) {
    createLine(150, 150);
    renderCanvas();
    gCurrLine = gMeme.lines[gMeme.lines.length - 1];
    gCurrLineIdx = gMeme.lines.length - 1;
    gCurrLine.isFocused = true;
    return;
  }
  gCurrLine.isFocused = false;
  createLine(150, 150);
  gCurrLine = gMeme.lines[gMeme.lines.length - 1];
  gCurrLineIdx = gMeme.lines.length - 1;
  gCurrLine.isFocused = true;
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
  let img = gCanvas.toDataURL('image/jpg');
  elLink.href = img;
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

function onSaveMeme(elSaveBtn) {
  let img = gCanvas.toDataURL('image/jpg');
  saveMeme(img);
  elSaveBtn.classList.add('animated', 'fadeOutUp');
  setTimeout(() => {
    elSaveBtn.classList.remove('animated', 'fadeOutUp')
  }, 1000);
}

function onSearchfield(elTxt) {
  let correctImgs;
  if (!elTxt.value) {
    correctImgs = checkSearchfield(elTxt.innerText);
    renderImgs(correctImgs);
  } else {
    correctImgs = checkSearchfield(elTxt.value);
    if (correctImgs.length === 0) return;
    renderImgs(correctImgs);
  }
}
