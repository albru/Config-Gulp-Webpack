'use strict';

const sldrLeftArrow = document.querySelector("#slider-arrow-sldrLeftArrow");
const sldrRightArrow = document.querySelector("#slider-arrow-sldrRightArrow");
const sldrItems = document.querySelector("#slider-sldrItems");
const sldrObj = {
  minRight: -870,
  maxRight: 580,
  startPos: sldrItems.style.right = 0 + "px",
  step: 290
};

let currentRight = 0;
sldrRightArrow.addEventListener("click", function(e) {
  e.preventDefault();
  if (currentRight <= sldrObj.maxRight) {
    currentRight += sldrObj.step;
    sldrItems.style.right = currentRight + "px";
  }
  if (currentRight === (sldrObj.maxRight + sldrObj.step) && currentRight !== 0) {
    currentRight = sldrObj.minRight;
    sldrItems.style.right = currentRight + "px";
  }
});

sldrLeftArrow.addEventListener("click", function(e) {
  e.preventDefault();
  if (currentRight >= sldrObj.minRight) {
    currentRight -= sldrObj.step;
    sldrItems.style.right = currentRight + "px";
  }
  if (currentRight < sldrObj.minRight) {
    currentRight = sldrObj.maxRight;
    sldrItems.style.right = currentRight + "px";
  }
});

