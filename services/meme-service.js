'use strict';

var gSavedMemesCount = getFromStorage('savedMemesCount') || 0;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{
      txt: 'Enter your text',
      font: 'impact',
      size: 40,
      align: 'center',
      coords: {
        x: 150,
        y: 40
      },
      color: 'white',
      isFocused: true,
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
      isFocused: false,
    }
  ]
};

var gImgs = [];

function createImgs() {
  gImgs = [
    createImg(1, 'img/1.jpg', ['politic', 'funny']),
    createImg(2, 'img/2.jpg', ['dogs', 'cute']),
    createImg(3, 'img/3.jpg', ['cute', 'funny', 'dogs', 'baby']),
    createImg(4, 'img/4.jpg', ['cats', 'cute']),
    createImg(5, 'img/5.jpg', ['baby', 'funny', 'cute']),
    createImg(6, 'img/6.jpg', ['funny']),
    createImg(7, 'img/7.jpg', ['baby', 'cute', 'funny']),
    createImg(8, 'img/8.jpg', ['funny']),
    createImg(9, 'img/9.jpg', ['baby', 'funny', 'cute']),
    createImg(10, 'img/10.jpg', ['politic', 'funny']),
    createImg(11, 'img/11.jpg', ['funny']),
    createImg(12, 'img/12.jpg', ['funny']),
    createImg(13, 'img/13.jpg', ['drinks', 'movies']),
    createImg(14, 'img/14.jpg', ['movies', 'funny']),
    createImg(15, 'img/15.jpg', ['movies', 'funny']),
    createImg(16, 'img/16.jpg', ['movies', 'funny']),
    createImg(17, 'img/17.jpg', ['politic', 'funny']),
    createImg(18, 'img/18.jpg', ['movies', 'funny']),
    createImg(19, 'img/19.jpg', ['dogs', 'cute']),
    createImg(20, 'img/20.jpg', ['dogs', 'cute']),
  ];
};

var gKeywords = {
  'happy': 12,
  'funny puk': 1
};

function checkSearchfield(txt) {
  let correctImgs = gImgs.filter(img => {
    return img.keywords.some(keyword => keyword === txt);
  });
  return correctImgs;
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
    isFocused: 0
  };
  gMeme.lines.push(newLine);
}

function deleteLine() {
  let {
    lines
  } = gMeme;
  lines.splice(gCurrLineIdx, 1);
  if (lines.length === 0) {
    gCurrLine = null;
    gCurrLineIdx = null;
  } else if (lines.length > 0) {
    gCurrLine = lines[0];
    gCurrLineIdx = 0;
    lines[gCurrLineIdx].isFocused = true;
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
    lines[gCurrLineIdx].isFocused = false;
    gCurrLineIdx = 0;
    gCurrLine = lines[gCurrLineIdx]
    lines[gCurrLineIdx].isFocused = true;
  } else if (!gCurrLine) {
    gCurrLineIdx = 0;
    gCurrLine = lines[gCurrLineIdx];
    lines[gCurrLineIdx].isFocused = true;
  } else {
    gCurrLineIdx += 1;
    gCurrLine = lines[gCurrLineIdx];
    lines[gCurrLineIdx].isFocused = true;
    lines[gCurrLineIdx - 1].isFocused = false;
  }
}

function saveMeme(img) {
  gSavedMemesCount++;
  saveToStorage('savedMemesCount', gSavedMemesCount)
  saveToStorage('meme ' + gSavedMemesCount, img);
}

function updateKeywords(userTxt) {
  let keywords = ['politic', 'funny', 'dogs', 'cute', 'baby', 'movies'];
  let isExist = keywords.some(keyword => keyword === userTxt);
  if (!isExist) return false;
  return keywords.find(keyword => keyword === userTxt);
}