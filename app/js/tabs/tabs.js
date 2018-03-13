;'use strict';

$("#tab-full-container").easytabs({
  animate: true,
  animationSpeed: 300,
  defaultTab: "span#tab-2",
  panelActiveClass: "active-content-div",
  tabActiveClass: "selected-tab",
  tabs: "> div > span",
  updateHash: false,
  cycle: false
});
