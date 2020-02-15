'use strict';

function onInit() {
  getSavedMemes();
  renderMemes();
}

function renderMemes() {
  let elContainer = document.querySelector('.memes-container');
  if (gSavedMemes.length === 0) {
      elContainer.innerHTML = `<h1>You didn't save any memes yet</h1>`;
      return;
  }
  gSavedMemes.forEach(meme => {
    let img = new Image();
    img.src = `${meme}`;
    elContainer.appendChild(img);
  });
}