'use strict';


var gImgs;

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{
    txt: 'I never eat Falafel',
    size: 50,
    align: 'left',
    coords: {
      x: 250,
      y: 50
    },
    color: 'white',
    strokeColor: 'black',
  }]
}

var gKeywords = {
  'happy': 12,
  'funny puk': 1
}

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
  console.log(memeLines)
  return memeLines.join('\n')
}

function createLine() {
  let newLine = {
    txt: 'Enter your text',
    size: 50,
    align: 'left',
    coords: {
      x: 250,
      y: 50
    },
    color: 'white',
    strokeColor: 'black',
  };
  gMeme.lines.push(newLine);
}

function updateMemeTxt(txt) {
  gCurrLine.txt = txt;
}

function getCurrLine() {
  gMemeLines = getMemeLines();
  (gCurrLineIdx + 1 === gMemeLines.length) ? gCurrLine = gMemeLines[0]
    : gCurrLine = gMemeLines[++gCurrLineIdx];;
}