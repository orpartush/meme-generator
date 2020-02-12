'use strict';

var gKeywords = {
  'happy': 12,
  'funny puk': 1
}

var gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['happy']
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['animals']
  },
];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
      {
      txt: 'I never eat Falafel', 
      size: 50,
      align: 'left',
      coords: { x: 250, y: 50 },
      color: 'white',
      strokeColor: 'black',
    },
    {
      txt: 'Falafel is Awesome', 
      size: 60,
      align: 'left',
      coords: { x: 250, y: 110 },
      color: 'red',
      strokeColor: 'black',
    }
  ]
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
  console.log(memeLines)
  return memeLines.join('\n')
}

function updateMemeTxt(txt) {
  gCurrLine.txt = txt;
}
