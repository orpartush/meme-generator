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
  lines: [{
    //from the user, this is the default
    txt: 'I never eat Falafel', 
    size: 20,
    align: 'left',
    color: 'red'
  }]
}

function getImgUrl(imgId) {
  let desiredImg = gImgs.find(img => img.id === imgId);
  return desiredImg.url;
}

function getMemeTxt() {
  return gMeme.lines[0].txt;
}

function updateMemeTxt(txt) {
  let lineIdx = gMeme.lines.length - 1;
  gMeme.lines[lineIdx].txt = txt;
  console.log(gMeme.lines)
}
