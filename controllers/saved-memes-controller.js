'use strict';

function onInit() {
  getSavedMemes();
  renderMemes();
}

function renderMemes() {
  let elContainer = document.querySelector('.memes-container');
  gSavedMemes.forEach(meme => {
    let img = new Image();
    img.src = `${meme}`;
    elContainer.appendChild(img);
  });
}