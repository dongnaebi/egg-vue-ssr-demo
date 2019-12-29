/**
 * Created by ebi on 2019/1/30.
 */
/* eslint-disable no-undef */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}
