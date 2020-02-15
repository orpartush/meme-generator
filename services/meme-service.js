'use strict';

var gSavedMemesCount = getFromStorage('savedMemesCount') || 0;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
    txt: 'Enter your text',
    font: 'impact',
    size: 40,
    align: 'center',
    coords: {
        x: 150,
        y: 40
      },
    color: 'white',
    strokeColor: 'black',
    },
    {
    txt: 'Enter your text',
    font: 'impact',
    size: 40,
    align: 'center',
    coords: {
        x: 150,
        y: 290
      },
    color: 'white',
    strokeColor: 'black',
    }
  ]
};
var gImgs = [];

function createImgs() {
  for (let i = 1; i <= 20; i++) {
    gImgs.push(createImg(i, `img/${i}.jpg`));
  }
}

function createImg(id, url, keywords = ['politic', 'funny']) {
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
  return gMeme.lines.map(line => line);
}

function getMemeTxt() {
  let memeLines = gMeme.lines.map(line => line.txt);
  return memeLines.join('\n')
}

function createLine(posX, posY) {
  let newLine = {
    txt: 'Enter your text',
    size: 40,
    align: 'center',
    font: 'impact',
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
  let { lines } = gMeme;
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
  let { lines } = gMeme;
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
    lines[gCurrLineIdx].shadowBlur = 3;
    lines[gCurrLineIdx - 1].shadowBlur = 0;
  }
}

function saveMeme(img) {
  gSavedMemesCount++;
  saveToStorage('savedMemesCount', gSavedMemesCount)
  saveToStorage('meme ' + gSavedMemesCount, img);
}
