'use strict';

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{
    txt: 'Enter your text',
    font: 'Impact',
    size: 50,
    align: 'center',
    coords: {
      x: 200,
      y: 50
    },
    color: 'white',
    strokeColor: 'black',
  }]
};
var gImgs;

function createImgs() {
  gImgs = [
    createImg(1, 'img/1.jpg', ['politic', 'funny']),
    createImg(2, 'img/2.jpg', ['dogs', 'cute']),
    createImg(3, 'img/3.jpg', ['cute', 'funny']),
    createImg(4, 'img/4.jpg', ['politic', 'funny']),
    createImg(5, 'img/5.jpg', ['politic', 'funny']),
    createImg(6, 'img/6.jpg', ['politic', 'funny']),
    createImg(7, 'img/7.jpg', ['politic', 'funny']),
    createImg(8, 'img/8.jpg', ['politic', 'funny']),
    createImg(9, 'img/9.jpg', ['politic', 'funny']),
    createImg(10, 'img/10.jpg', ['politic', 'funny']),
    createImg(11, 'img/11.jpg', ['politic', 'funny']),
    createImg(12, 'img/12.jpg', ['politic', 'funny']),
    createImg(13, 'img/13.jpg', ['politic', 'funny']),
    createImg(14, 'img/14.jpg', ['politic', 'funny']),
    createImg(15, 'img/15.jpg', ['politic', 'funny']),
    createImg(16, 'img/16.jpg', ['politic', 'funny']),
    createImg(17, 'img/17.jpg', ['politic', 'funny']),
    createImg(18, 'img/18.jpg', ['politic', 'funny']),
  ];
}

function createImg(id, url, keywords) {
  return {
    id,
    url,
    keywords
  }
}

function getImgUrl(imgId) {
  let desiredImg = gImgs.find(img => img.id === imgId);
  return desiredImg.url;
}

function getMemeLines() {
  return gMeme.lines.map(line => {
    return line
  });
}

function getMemeTxt() {
  let memeLines = gMeme.lines.map(line => line.txt);
  return memeLines.join('\n')
}

function createLine(posX, posY) {
  let newLine = {
    txt: 'Enter your text',
    size: 50,
    align: 'center',
    font: 'Impact',
    coords: {
      x: posX,
      y: posY
    },
    color: 'white',
    strokeColor: 'black',
    shadowBlur: 0
  };
  gMeme.lines.push(newLine);
}

function deleteLine() {
  let {
    lines
  } = gMeme;
  lines.splice(gCurrLineIdx, 1);
  if (lines.length === 0) gCurrLine = null;
  if (lines.length > 0) {
    gCurrLine = lines[0];
    gCurrLineIdx = 0;
    lines[gCurrLineIdx].shadowBlur = 4;
  }
}

function updateMemeTxt(txt) {
  if (!gCurrLine) return;
  gMeme.lines[gCurrLineIdx].txt = txt;
}

function getCurrLine() {
  let {
    lines
  } = gMeme;
  if (gCurrLineIdx + 1 === lines.length) {
    lines[gCurrLineIdx].shadowBlur = 0;
    gCurrLineIdx = 0;
    gCurrLine = lines[gCurrLineIdx]
    lines[gCurrLineIdx].shadowBlur = 4;
  } else if (!gCurrLine) {
    gCurrLineIdx = 0;
    gCurrLine = lines[gCurrLineIdx]
  } else {
    gCurrLineIdx += 1;
    gCurrLine = lines[gCurrLineIdx];
    lines[gCurrLineIdx].shadowBlur = 4;
    lines[gCurrLineIdx - 1].shadowBlur = 0;
  }
}