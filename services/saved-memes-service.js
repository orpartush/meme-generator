'use strict';

var gSavedMemes = [];
var gSavedMemesCount = getFromStorage('savedMemesCount');

function getSavedMemes() {
  for (let i = 1; i <= gSavedMemesCount; i++) {
    let savedMeme = getFromStorage(`meme ${i}`);
    gSavedMemes.push(savedMeme);
  }
}