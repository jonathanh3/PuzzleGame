var rows = 5;
var columns = 5;

var currentTile; // The tile that is clicked
var otherTile; // The tile that will be swapped with the currentTile

var turns = 0;

function dragStart() {
  currentTile = this; // this refers to the image that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
  otherTile = this; // This refers to the image being dropped on
}

function dragEnd() {
  if (currentTile.src.includes('blank')) return;

  if (currentTile && otherTile) {
    let currentImg = currentTile.src;
    let otherImg = otherTile.src;

    currentTile.src = otherImg;
    otherTile.src = currentImg;

    turns += 1;
    document.getElementById('turns').innerText = turns;

    // Resets tiles
    currentTile = null;
    otherTile = null;
  }
}

function addDrag(tile) {
  tile.addEventListener("dragstart", dragStart);  // click on an image to drag
  tile.addEventListener("dragover", dragOver);    // drag an image
  tile.addEventListener("dragenter", dragEnter);  // dragging an image into another one
  tile.addEventListener("dragLeave", dragLeave);  // dragging an image away from another one
  tile.addEventListener("drop", dragDrop);        // drop an image onto another one
  tile.addEventListener("dragend", dragEnd);      // after you complete drag and drop 

  return tile;
}

window.onload = function () {
  // init board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.src = "./images/blank.jpg";

      tile = addDrag(tile);

      document.getElementById("board").append(tile);
    }
  }

  let pieces = [];

  for (let i = 1; i <= rows * columns; i++) {
    pieces.push((i).toString());
  }

  const nrOfshuffles = 100;
  // Shuffle the order
  for (let i = 0; i < nrOfshuffles; i++) {
    let randomIndex = Math.floor(Math.random() * pieces.length) % pieces.length;
    let randomIndex2 = Math.floor(Math.random() * pieces.length) % pieces.length;

    let temp = pieces[randomIndex];
    pieces[randomIndex] = pieces[randomIndex2];
    pieces[randomIndex2] = temp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement('img');
    tile.src = `./images/${pieces[i]}.jpg`;

    // Drag functionality
    tile = addDrag(tile);

    document.getElementById('pieces').append(tile);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let divBoard = document.getElementById('board');
  const children = Array.from(divBoard.children);
  console.log(children.length);
});
